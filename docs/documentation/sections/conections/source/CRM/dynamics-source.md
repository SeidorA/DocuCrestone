---
sidebar_position: 10
iconName: "Dynamics"
useBrand: true
title: "Microsoft Dynamics 365 Source Connection"
description: "Create a node to extract data from a source and load it into a destination."
sidebar_label: "Microsoft Dynamics 365"
---

## Prerequisites

Before configuring the Dynamics 365 source connection in Crestone, make sure you have the following:

**Main Requirement:** An active **Microsoft Dynamics 365** environment (Sales, Customer Service, Field Service, or any model-driven app) with an **Azure AD app registration** that has API access. Crestone connects via the Dynamics 365 Web API (OData v4) using the OAuth 2.0 **client credentials** flow — no user login is required.

> **Note:** Crestone uses the Dynamics 365 Web API over HTTPS. No database driver, ODBC, or on-premises gateway is required.

---

### Azure AD App Registration

You need an Azure Active Directory app registration with a client secret. If you don't have one yet, follow these steps:

1. Go to [portal.azure.com](https://portal.azure.com) → **Azure Active Directory** → **App registrations** → **New registration**.
2. Give it a name (e.g. `Crestone Integration`) and click **Register**.
3. Under **Certificates & secrets** → **Client secrets**, click **New client secret**. Copy the value immediately — it won't be shown again.
4. Under **API permissions**, click **Add a permission** → **Dynamics CRM** → **Delegated permissions** → select `user_impersonation`. Then click **Grant admin consent**.
5. Copy the **Application (client) ID** and the **Directory (tenant) ID** from the app's **Overview** page.

**Required Information:**

| Field | Description |
|-------|-------------|
| **Organization URL** | Base URL of your Dynamics 365 environment (e.g. `https://orgXXXXXX.crm.dynamics.com`) |
| **Tenant ID** | Azure AD Directory (tenant) ID (GUID) |
| **Client ID** | Azure AD Application (client) ID (GUID) |
| **Client Secret** | Secret value generated in the app registration |

> **Tip:** The Organization URL can be found in the Dynamics 365 app under **Settings** → **Developer Resources** → **Web API**.

---

### Application User in Power Platform

The Azure app registration must also be added as an **Application User** in the Power Platform environment. Without this step, the connection will fail with `0x80072560 - The user is not a member of the organization`.

1. Go to [admin.powerplatform.microsoft.com](https://admin.powerplatform.microsoft.com).
2. Select your environment → **Settings** → **Users + permissions** → **Application users**.
3. Click **New app user** → select the app registration you created → assign the **System Administrator** (or a custom read-only) security role.
4. Click **Create**.

---

## Pre-Verification Step

Before configuring the connection in Crestone, we recommend verifying access directly against the Dynamics 365 Web API. You can use Postman or curl:

**1. Acquire a token:**
```
POST https://login.microsoftonline.com/{tenant_id}/oauth2/v2.0/token
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
&client_id={client_id}
&client_secret={client_secret}
&scope=https://{org}.crm.dynamics.com/.default
```

**2. Call the API:**
```
GET https://{org}.crm.dynamics.com/api/data/v9.2/accounts?$top=5
Authorization: Bearer {access_token}
OData-Version: 4.0
Accept: application/json
```

A `200 OK` response with a `value` array confirms the credentials are valid and the app user is correctly configured.

---

## Configuration Steps

Follow these steps to create a new Dynamics 365 source connection in Crestone:

1. Navigate to **Connections** in the top navigation bar.
2. Select the **Source** tab.
3. Click the **+** button to create a new connection.
4. Fill in the **Connection Name** field with a descriptive name (e.g. `Dynamics 365 Sales`).
5. In the **Source Type** dropdown, select **Microsoft Dynamics 365**.
6. Complete the credentials form:
   - **Organization URL** — e.g. `https://orgXXXXXX.crm.dynamics.com`
   - **Tenant ID** — Azure AD directory GUID
   - **Client ID** — Azure AD application GUID
   - **Client Secret** — value of the app secret
7. Click **Test Connection** to validate that Crestone can authenticate and reach the Dynamics API.
8. Once the test passes, click **Create Source** to save the connection.

---

## Editing an Existing Connection

To update the credentials of an existing Dynamics 365 source connection:

1. Navigate to **Connections** and find your Dynamics 365 source.
2. Click **Edit**.
3. Modify the desired fields in the credentials form.
4. Click **Test Connection** to verify the new credentials.
5. Click **Confirm** to save the changes.

---

## Using Dynamics 365 as a Source in an Extraction Node

Once the connection is created, you can use it as the source of an Extraction Node. Dynamics 365 uses an **entity-based** model — there are no schemas or tables. Each entity (e.g. `account`, `contact`, `opportunity`) maps to a set of records.

1. Open or create an **Extraction Node** and go to the **Source** tab.
2. In **Select Source**, choose your Dynamics 365 connection.
3. In **Select Entity**, choose the entity to extract (e.g. `Account`, `Contact`). The list shows all entities enabled for Advanced Find in your environment.
4. In **Select Fields**, choose the specific columns you want, or leave empty to extract all selectable fields.
5. Optionally add an **OData Filter** to restrict the records (e.g. `statecode eq 0` to get only active records).
6. The **Preview** panel shows a sample of the data that will be extracted.

> **Note:** Fields of type `Lookup`, `Owner`, `Customer`, `PartyList`, `Virtual`, and `CalendarRules` are automatically excluded from the field list. These are navigation/complex properties that cannot be used in `$select` queries and would cause API errors if included. If you need related entity data (e.g. the name of the owning user), use an OData `$expand` expression or a separate entity extraction.

---

## Data Type Handling

When Crestone reads data from Dynamics 365, attribute types are returned as OData primitives. The mapping to destination types is:

| Dynamics 365 Attribute Type | OData / Python type | Notes |
|----------------------------|---------------------|-------|
| `String`, `Memo` | `str` | Text and multiline text fields |
| `Integer`, `BigInt` | `int` | Whole numbers |
| `Decimal`, `Money`, `Double` | `float` | Numeric fields with decimals |
| `Boolean` | `bool` | Two-option fields |
| `DateTime` | `str` (ISO 8601) | Returned as `2026-06-13T18:54:11Z` |
| `Picklist`, `State`, `Status` | `int` | Option set values (numeric codes) |
| `UniqueIdentifier` | `str` | GUIDs (e.g. primary key fields) |
| `EntityName` | `str` | Entity logical name |
| `Lookup` *(excluded)* | — | Navigation property; not selectable |
| `Owner` *(excluded)* | — | Navigation property; not selectable |
| `Virtual` *(excluded)* | — | Computed; not selectable |

> **Note:** Picklist, State, and Status fields return the numeric option code, not the display label. To get the label, you would need a separate lookup against the entity's metadata.

---

## Common Issues

| Issue | Possible Cause | Solution |
|-------|---------------|----------|
| `Authorization header missing` | JWT not sent in the request | Ensure the `Authorization: Bearer <token>` header is included in every request |
| `0x80072560 - The user is not a member of the organization` | App registration not added as Application User in Power Platform | Create the Application User in Power Platform Admin Center and assign a security role (see Prerequisites) |
| `0x80060888 - Query parameter not supported` | Invalid OData query parameter used | Avoid `$top` on metadata endpoints; Crestone handles this automatically |
| `400 Bad Request` on entity query | Selected field is a navigation/complex type | The field has been automatically excluded in newer versions. Clear the field selection and re-select |
| `401 Unauthorized` | Token expired or wrong scope | Tokens expire after 1 hour. Crestone re-acquires automatically; if manually testing, request a new token with scope `{organization_url}/.default` |
| `403 Forbidden` | App user lacks security role | Assign at minimum **Basic User** + read access on target tables in the Power Platform security role |
| Entity list is empty | App user has no access to any entities | Verify the security role assigned to the Application User grants access to at least some entities |
| Preview returns empty data | No records in the entity or OData filter excludes all rows | Remove the OData filter or verify data exists in Dynamics |
| `ORA-00904` when loading to Oracle | Column name case mismatch between creation and insert | Fixed in current version — column names are normalized to uppercase before table creation |

---

## Required Permissions in Dynamics 365

Crestone only reads data from Dynamics 365 (source connector). The Application User needs:

- **Read** privilege on all entities you want to extract
- **Basic User** system security role as a minimum, plus read access on the specific tables

For a minimal read-only role, create a custom security role in Power Platform with **Read** set to **Organization** level on the entities Crestone will access.

> **Tip:** Assigning **System Administrator** to the Application User grants full access and is convenient for testing, but for production environments a least-privilege custom security role is recommended.
