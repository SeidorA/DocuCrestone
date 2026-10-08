---
title: "Create the application in Azure"
description: Which values to use when registering the Microsoft login application in Microsoft Entra ID, with links to Microsoft's official documentation.
sidebar_position: 6.5
---

## What is it for?

Crestone's [Microsoft login](./microsoft-login) uses **an application registered in your company's
Microsoft Entra ID (formerly Azure AD)**. Microsoft explains the steps to create it in the portal in
its official documentation; this page summarizes **which values to use for Crestone** and which data
to copy to enter in **Settings → Microsoft Login**.

The application is created once, by a person with permission to register applications in your
directory (for example, *Application Developer* or higher).

## Official Microsoft guides

| What to do | Official guide |
|---|---|
| Register the application | [Quickstart: Register an app in Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app) |
| Add the Redirect URI | [How to add a redirect URI to your application](https://learn.microsoft.com/en-us/entra/identity-platform/how-to-add-redirect-uri) |
| Create the Client Secret | [Add and manage app credentials](https://learn.microsoft.com/en-us/entra/identity-platform/how-to-add-credentials) (*Add a client secret* tab) |
| Turn on *Assignment required* | [Configure enterprise application properties](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/add-application-portal-configure) and [Properties of an enterprise application](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/application-properties) |
| Assign users and groups | [Manage users and groups assignment to an application](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/assign-user-or-group-access-portal) |

:::info
Menu names in the portal change with the language and the version. If something does not match,
follow Microsoft's documentation.
:::

## Values to use for Crestone

| Item | What to enter |
|---|---|
| **Name** | Whatever you like, for example `Crestone`. It is the name users see when they sign in. |
| **Supported account types** | **Single tenant only** (your directory only). This is the option Microsoft recommends. |
| **Redirect URI platform** | **Web** (not *Single-page application* or *Mobile and desktop*). |
| **Redirect URI** | `<Crestone backend URL>/auth/azure/callback/`. Example: `https://api.yourcompany.com/auth/azure/callback/` |
| **Credential** | A **Client Secret**. Crestone does not currently support certificates. |
| **API permissions** | **Microsoft Graph → User.Read** (delegated permission). It is added automatically when the application is registered. |

:::warning
The Redirect URI must be written **exactly** as shown, including the **trailing slash** (`/`). Azure
compares the address exactly: without the slash, or with a different path, the login fails.

Crestone shows you the exact address in **Settings → Microsoft Login**, **Redirect URI** field
(**Copy** button).
:::

- If you have **several environments** (for example production and testing), register one Redirect
  URI for each one, always under **Web**.
- To test on a local machine you can add `http://localhost:8000/auth/azure/callback/`. Azure accepts
  `http://` only for `localhost`.
- You do not need to enable implicit tokens or other options: Crestone uses the authorization code
  flow with a secret.

### About the Client Secret

- When you create it, **copy the Value** (not the *Secret ID*): Azure shows it **only once** and it
  cannot be viewed again.
- Secrets **expire**: after **24 months** at most, and Microsoft recommends **less than 12**. Note
  the date and, before it expires, create a new one and update it in **Settings → Microsoft Login**;
  otherwise, Microsoft login will stop working.

:::info
Microsoft recommends using **certificates** instead of secrets in production. Crestone currently
supports **Client Secret** only; if your security policy requires certificates, check with support.
:::

## What to copy and where to enter it

In the application's **Overview** and in **Certificates & secrets**:

| Azure item | Field in Crestone (Settings → Microsoft Login) |
|---|---|
| **Directory (tenant) ID** | **Directory (tenant) ID** |
| **Application (client) ID** | **Client ID** |
| **Value** of the Client Secret | **Client Secret** |

The **Redirect URI** works the other way around: Crestone shows it and you register it in Azure.
The details of that screen are in [Microsoft Login](./microsoft-login).

## Restrict who can sign in (optional)

By default, **any account in your directory** can authenticate with the application (including the
directory's external guests). To limit it to specific people or groups:

1. Go to **Enterprise applications** and open your application.
2. In **Properties**, set **Assignment required?** to **Yes** and save.
3. In **Users and groups**, add the people or groups that can sign in (official guide in the table
   above).

Accounts that are not assigned will see a Microsoft error when they try to sign in.

:::info
**Permissions required.** To change *Assignment required* and assign people, your account must be
**Cloud Application Administrator**, **Application Administrator** or **owner** of the enterprise
application. Having registered the application is not enough: if the toggle and the **Save** button
appear disabled, or the portal warns that you do not have the right permissions, ask an
administrator to configure it or to add you as an owner (**Enterprise applications → your
application → Owners**).
:::

:::warning
- **Assigning groups** to the application requires a **Microsoft Entra ID P1 or P2** license. With
  the free edition you can only assign **users one by one**.
- When **Assignment required** is on, an **administrator** must grant consent for the application:
  in **API permissions**, **Grant admin consent**.
- Users with the **Global Administrator** role can sign in even if they are not assigned. Keep this
  in mind when testing with an account of that type.
:::

To create a group in Entra: **Entra ID → Groups → New group** (type **Security**), add the members
and create it.

:::info
Crestone does not filter by email domain or by group: access is controlled in Azure. Also,
**deleting a user in Crestone does not remove their Microsoft access**: if Azure still authorizes
them, they are created again with the read-only role the next time they sign in. To prevent this,
remove their assignment in Azure.
:::

## Common Microsoft errors

| Code | What it means | How to fix it |
|---|---|---|
| `AADSTS900971` — *No reply address provided* | The application has **no Redirect URI** registered. | Add it in **Authentication** under **Web** and save. |
| `AADSTS50011` — *The reply URL specified in the request does not match…* | Crestone's address **does not match** the registered ones. | Compare it with the **Redirect URI** in Settings, including the trailing slash and the **Web** platform. |
| `AADSTS50020` — *User account … does not exist in tenant … and cannot access the application* (in Spanish: *La cuenta de usuario seleccionada no existe en el inquilino…*) | The account used to sign in **is not in your directory**, not even as a guest. This usually happens when the browser has other Microsoft accounts signed in (for example from another company) and the wrong one is selected. | Choose an account that belongs to your directory, or add the person as an **external user** (guest) in Entra ID: **Users → New user → Invite external user**. |
| `AADSTS50194` — *Application is not configured as a multi-tenant application* | The application is single-tenant but the sign-in used `common`, so the Directory ID saved in Crestone is empty or `common`. | Enter the correct **Directory (tenant) ID** in Crestone. |
| `AADSTS700016` — *Application with identifier … was not found in the directory* | The **Client ID** or the **Directory (tenant) ID** entered in Crestone does not match the application. | Copy both again from the application's **Overview** and save them in Crestone. |
| `AADSTS50105` — *The signed in user is not assigned to a role…* | **Assignment required** is on and the person is not assigned. | Assign them in **Enterprise applications → Users and groups**. |
| `AADSTS7000215` — *Invalid client secret provided* | The *Secret ID* was entered instead of the **Value**, or the secret is wrong. | Enter the secret's **Value** in Crestone. |
| `AADSTS7000222` — *The provided client secret keys are expired* | The secret has **expired**. | Create a new secret and update it in Crestone. |

:::tip
Every error comes with a **Request Id** and a **Correlation Id**. If you need help from IT or from
support, share them along with the code.
:::
