---
sidebar_position: 9
iconName: "Fabric"
useBrand: true
title: "Microsoft Fabric"
description: "Create a node to export data from a source and load it into a destination."
---

## Required Data

To connect to Microsoft Fabric via API you need 4 required pieces of information:

| Item | Description | Location |
|-------|---|---|
| Tenant ID | Unique identifier of the Azure AD tenant. | Microsoft Entra ID → Overview |
| Client ID | Unique identifier of the application registered in Azure AD. | App Registrations → Your application |
| Client Secret | Secret generated for the application registration in Azure AD. | App Registrations → Certificates & Secrets |
| Workspace ID | Unique identifier of the Microsoft Fabric workspace. | Workspace URL in Fabric |
| lakehouse_id | Identifies the specific Lakehouse | Lakehouse URL in Fabric |


---

## How to Get the Tenant ID
1. Sign in to the [Microsoft Entra ID portal](https://portal.azure.com).
2. In the left menu, search for and select **Microsoft Entra ID**

![Microsoft Entra ID](/img/Conections/fabric/tenenantid.png)

3. On the **Overview** panel you will see your Tenant ID

Example:

```text
Tenant ID: c25f1c67-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```
**Copy and save this value.**

---

## How to Create an App Registration
(Client ID + Client Secret)

### Create the Application
1. In the Azure portal, under **Microsoft Entra ID**, select **App registrations** in the left menu.
2. Click **New registration**.
3. Fill in the fields:
   - **Name**: Enter a descriptive name for the application.
   - **Supported account types**: Select "Accounts in this organizational directory only".
   - **Redirect URI**: Leave blank.
4. Click **Register**.

### Get the Client ID
Once the application is created:
1. You will see the Overview page for your application
2. Copy the value of Application (client) ID

Example:

```text
Application (client) ID: 59c4c6e3-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```
Copy and save this value.


### Create the Client Secret

1. In your application's left menu, go to Certificates & secrets
2. Click + New client secret
3. Configure:
    - Description: crestone-onelake-secret (or any description)
    - Expires: Select 1 year (or the desired period)
4. Click Add
5. IMPORTANT: Copy the Value of the secret immediately

Example:

```text
Value: abc123DEF456~xxxxxxxxxxxxxxxxxxxxxxxxx
```

:::warning
This value is shown ONLY ONCE. If you don't copy it now, you'll need to create a new secret.
Copy and store this value securely.
:::

---

## Configure Application Permissions
Without these permissions, the application will **receive 403** (Access Denied) errors.

1. In your application, go to API permissions (in the left menu)
2. Click + Add a permission
3. Search for and select Azure Storage
4. Select Delegated permissions
5. Check the permission: user_impersonation
6. Click Add permissions
7. IMPORTANT: Click Grant admin consent for [Your organization]
8. Confirm by clicking Yes

**Verification:**
Permissions should appear with a green check (✓) in the Status column.

---

## How to Get the Workspace ID
1. Go to Microsoft Fabric: [fabric.microsoft](https://fabric.microsoft.com)
2. Navigate to your workspace (e.g., "W1")

![Navigate Workspace ID](/img/Conections/fabric/work.png)

3. Check the browser URL

**The URL will have this format:**

```text
https://app.fabric.microsoft.com/groups/31cd18a4-xxxx-xxxx-xxxx-xxxxxxxxxxxx/...
```

![URL Fabric](/img/Conections/fabric/url.png)

**The Workspace ID is after /groups/:**

```text
Workspace ID: 31cd18a4-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```
**Copy and save this value.**

---

## How to Get the Lakehouse ID
1. Inside your workspace in Fabric, click your Lakehouse

![Lakehouse](/img/Conections/fabric/lake.png)

2. Check the browser URL

```text
https://app.fabric.microsoft.com/groups/[workspace-id]/lakehouses/a1b2c3d4-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```
![URL Lakehouse](/img/Conections/fabric/Imagen5.png)

**The Lakehouse ID is after /lakehouses/:**

```text
Lakehouse ID: a1b2c3d4-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```
:::warning
Do not confuse the Lakehouse with the Endpoint.
:::

**Difference between Lakehouse and Endpoint**
When you create a Lakehouse in Microsoft Fabric, TWO resources are automatically created:

![Fabric Resources](/img/Conections/fabric/punto.png)

**LAKEHOUSE (house-with-waves icon)**
- **Visual name:** DataflowsStagingLakehouse (Lakehouse)
- **Function:** Physical storage in OneLake
- **Contains:**

    - Files/ folder
    - Tables/ folder
    - Delta Lake (parquet files)
    - _delta_log
- URL like ```.../lakehouses/[lakehouse-id]```
- **Used for:** OneLake REST API, file read/write
- THIS IS THE ONE YOU NEED FOR THE API

![Fabric API](/img/Conections/fabric/api.png)

**ENDPOINT (house-with-6-windows icon)**

- **Visual name:** DataflowsStagingLakehouse (Endpoint)
- **Function:** SQL view of the Lakehouse
- **Allows:** SELECT queries on Delta tables
- **URL type:** .../mirroredwarehouses/[warehouse-id]
- **Used for:** Power BI, SQL Endpoints, Notebooks
- **NOT USED FOR THE ONELAKE API**

Verification: The URL must contain `/lakehouses/` (NOT `/mirroredwarehouses/` or `/sqlendpoints/`).
Copy and save this value.

---

## Configuration Summary

At the end you should have these 5 values:

| Item | Example |
|-------|---|
| Tenant ID | c25f1c67-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| Client ID | 59c4c6e3-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| Client Secret | abc123DEF456~xxxxxxxxxxxxxxxxxxxxxxxxx |
| Workspace ID | 31cd18a4-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| Lakehouse ID | a1b2c3d4-xxxx-xxxx-xxxx-xxxxxxxxxxxx |

:::tip
**Security** Never share these values publicly. Store them securely (such as a password manager or environment variables).
:::

---

## Workspace Permissions Required

**Important**: This configuration must be performed by someone with Admin or Member permissions in the workspace.

**Why is this necessary?**
Microsoft Fabric has TWO independent security layers:
1. Workspace permissions (who can view and manage resources)
2. OneLake permissions (who can read/write data in the Lakehouse)

Both must be configured separately.

### Add the App as a Workspace Member
1. Enter your Workspace (e.g., W1)
2. In the top-right corner, click Manage access

![Manage access](/img/Conections/fabric/workspace.png)

3. Click + Add people or groups

![Manage access add](/img/Conections/fabric/Imagen9.png)

4. In the search box, type the name of your Azure app: crestone-onelake

![Search App](/img/Conections/fabric/Imagen10.png)

- or you can search by the **client_id** if it doesn't appear by name

5. Select the appropriate role:
    - Contributor (recommended for read/write)
    - Admin (if it needs to manage the entire workspace)

    ![Assign role](/img/Conections/fabric/Imagen11.png)

6. Click Add
**Verification:** The application crestone-onelake should appear in the workspace members list with the assigned role.

![Workspace members](/img/Conections/fabric/Imagen12.png)

---

## Configure Lakehouse Permissions (OneLake Security)
(OneLake Security)

:::warning
Without these permissions, the API will return 403 errors even if the app has workspace access.
:::

**What are OneLake Permissions?**

They are specific permissions to read/write files in the physical storage of the Lakehouse. They are independent from workspace permissions.

### Access OneLake Security Settings
1. Inside your workspace, click the **Lakehouse**
    - Name: DataflowsStagingLakehouse (Lakehouse)
    - Do not confuse with the "Endpoint"
2. In the top-right corner click Manage OneLake security (preview)

### Create or Modify the Permission Role
The OneLake Roles screen will open:

![Permissions](/img/Conections/fabric/Imagen13.png)

**OneLake Roles**
- DefaultReader
- (you can create new roles here)

**Option A: Create a New Role**
1. Click + New role

![New role](/img/Conections/fabric/Imagen14.png)

1. Configure:
- Role name: crestoneConnector (or a name you prefer)
- Role type: Select Grant
- Data scope:
    - Select All data
    - Or specify specific folders if you want to limit access

**Option B:** Use an Existing Role
If an appropriate role already exists, you can modify it directly.

### Add Members to the Role
1. Inside the role (crestoneConnector or the one you created)
2. Click + Add members
3. Search for and add:
- crestone-onelake (your App Registration)
- Access type: ReadWrite 

4. Optionally add your personal user:
- Crestone (your account)
- Access type: Admin 

### Recommended Final Configuration
| Member | Role | Permissions | Scope |
|---------|-----|----------|---------------|
| crestone-onelake | crestoneConnector | ReadWrite | All data |

**Verification**
1. Click Save or Apply
2. Verify the role appears with the correct permissions

![Verification](/img/Conections/fabric/Imagen15.png)

3. Changes may take 1-2 minutes to apply

---

## Permissions Configuration Summary
At the end you should have:
- App Registration has API permissions in Azure (Azure Storage - user_impersonation)
- App Registration is Contributor in the Workspace
- App Registration has ReadWrite permissions in OneLake Security
- Your user has Admin permissions in OneLake Security (optional but recommended)

If any of these steps are missing, the API will fail with 403 (Forbidden) errors.
