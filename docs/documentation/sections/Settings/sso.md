---
title: "Single Sign-On (SSO)"
description: Configure your own Azure AD application so users sign in to Crestone with your company's SSO.
sidebar_position: 10
---

## What is it?

By default, users can sign in to Crestone with email and password (optionally with MFA — see
[Authentication](/docs/documentation/sections/Settings/authentication)). The **SSO** section lets
you replace the default sign-in flow with your own **Azure AD (Entra ID)** application, so your
users sign in to Crestone with their company Microsoft account instead.

This setting applies at the **tenant** level (your company), not per workspace: if your company
has several workspaces, they all share the same SSO configuration.

:::::info
This is the **administrator** side of SSO — where you register your company's own Azure app. For
what a user sees when signing in once SSO is enabled, see
[Sign in with Azure AD (SSO)](/docs/documentation/sections/Settings/authentication#sign-in-with-azure-ad-sso).
:::::

## Configure your own Azure AD application

### 1. Register an application in Azure

In the [Azure portal](https://portal.azure.com), register a new **App registration** for
Crestone and note down its **Application (client) ID**, **Directory (tenant) ID**, and create a
**client secret** for it. Set the redirect URI to Crestone's callback endpoint
(`/auth/callback`).

### 2. Go to Settings

Go to **Settings → Single Sign-On (SSO)**.

<!-- screenshot: Settings list showing the "Single Sign-On (SSO)" card -->

### 3. Enable and edit

Turn on the switch and click **Edit** to see the configuration form.

<!-- screenshot: SSO card expanded with Edit -->

### 4. Fill in your Azure app details

- **Client ID**: the Application (client) ID from your Azure app registration.
- **Client Secret**: the client secret you created for the app.
- **Tenant ID**: your Azure AD Directory (tenant) ID.
- **Allowed domains**: the email domain(s) allowed to sign in through this SSO connection (e.g.
  `yourcompany.com`). Users outside these domains won't be able to use the **"Sign in with
  Microsoft"** option.

<!-- screenshot: SSO configuration form with Client ID / Client Secret / Tenant ID / Allowed domains fields -->

### 5. Save and test

Save the configuration and confirm the **"Sign in with Microsoft"** option now appears on the
login page. Sign in with a test account in one of the allowed domains to confirm the connection
works end to end before rolling it out to your users.

:::warning
Keep the client secret safe — anyone with it, plus your tenant configuration, could impersonate
your Azure app. Rotate it periodically from the Azure portal and update it here when you do.
:::
