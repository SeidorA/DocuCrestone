---
title: "MCP"
description: "Connect your AI client or development environment to a Crestone MCP server via the Model Context Protocol."
sidebar_position: 10
---

# Connect to Crestone MCP Self-Hosted (HTTPS)

Connect your AI client or development environment to a Crestone MCP server hosted by your organization.

This guide covers **client configuration only**. It assumes that the Crestone MCP server is already deployed and available through HTTPS.

You do **not** need to install Crestone MCP locally, clone its repository, install Node.js or Docker, or run a local MCP process.

---

## 1. Requirements

Before configuring an MCP client, you need:

| Requirement | Example | Description |
|---|---|---|
| **MCP URL** | `https://mcp.example.com/mcp` | Public HTTPS endpoint of the Crestone MCP server. The `/mcp` path is required. |
| **Personal Access Token (PAT)** | `cres_pat_<your-token>` | Secret credential used to authenticate with Crestone. |
| **Tenant ID** | `11111111-1111-4111-8111-111111111111` | UUID of your Crestone tenant. |
| **Compatible MCP client** | Codex, Claude Code, Cursor, VS Code, etc. | The client must support remote MCP over HTTP and Crestone's required headers. |

Crestone MCP requires the following headers on every request:

```http
Authorization: Bearer <PAT>
X-Crestone-Tenant-Id: <TENANT_ID>
```

> **Important:** The MCP URL must include `/mcp`.

---

# 2. Generate a Personal Access Token (PAT)

Before configuring a client, create a **Personal Access Token (PAT)** in Crestone.

## Create the PAT

1. In Crestone, go to **Settings → MCP → Personal access tokens**.
2. Select **Create PAT**.
3. Configure the token:
   - **Name** — Enter a descriptive name for the token, such as `Codex`, `Claude Code`, or `Development MCP`.
   - **Expiration** — Optionally define an expiration date.
   - **Capabilities** — Select the capabilities that the MCP client is allowed to use.
   - **Workspaces** — Select the Crestone workspaces that the token can access.
4. Select **Create PAT**.
5. Copy the generated token and store it securely.

The token will look similar to:

```text
cres_pat_<your-token>
```

> **Important:** The PAT is displayed **only once**. Copy and store it securely when it is created. If you lose the token, create a new PAT.

The PAT is sent to Crestone as:

```http
Authorization: Bearer cres_pat_<your-token>
```

## PAT security

Treat the PAT as a password.

Never include a real PAT in:

- Prompts
- Screenshots
- Support tickets
- Application logs
- Shell history
- Source control
- Shared configuration files

Whenever possible, use the MCP client's secure credential storage or secret-input mechanism.

---

# 3. Store Credentials Persistently

Crestone requires two values:

```text
PAT       → Secret
Tenant ID → Configuration value
```

The **PAT must be protected as a secret**.

The Tenant ID identifies the Crestone tenant and can normally be stored directly in the MCP client configuration.

## Avoid temporary environment variables

Commands such as:

```bash
export CRESTONE_PAT='cres_pat_<your-token>'
```

only configure the current shell session.

Depending on how the client is launched, the value may no longer be available after:

- Closing the terminal
- Restarting the computer
- Logging out
- Launching a desktop application from Finder, Dock, Start Menu, or another launcher

For this reason, temporary `export` commands are **not the recommended setup for persistent Crestone MCP connections**.

## Recommended credential priority

Use the following order when configuring a client:

1. **Client secure credential storage** — preferred.
2. **Client password/secret input** — preferred.
3. **OS credential or secret storage supported by the client**.
4. **Persistent user environment variable** — when required by the client.
5. **PAT directly in a configuration file** — only when no safer option is available.

> Never commit a configuration file containing a PAT to source control.

---

# 4. Client Compatibility

A client can connect directly to Crestone only when it can send:

```http
Authorization: Bearer <PAT>
X-Crestone-Tenant-Id: <TENANT_ID>
```

on the required MCP requests.

| Client | Direct connection | Recommended credential method |
|---|---|---|
| **Codex** | ✅ Supported | Persistent environment/credential mechanism |
| **Claude Code** | ✅ Supported | Persistent environment/credential mechanism |
| **OpenCode** | ✅ Supported | Persistent environment/secret mechanism |
| **Cursor** | ✅ Supported | Persistent environment/secret mechanism |
| **VS Code** | ✅ Supported | Secure MCP input |
| **Windsurf** | ⚠️ Version dependent | Client/environment mechanism |
| **ChatGPT** | ⚠️ Authentication limitation | Requires compatible authentication layer |
| **Claude Desktop / Web** | ⚠️ Authentication limitation | Requires compatible authentication layer |

---

# 5. Codex

Codex supports remote Streamable HTTP MCP servers.

For Crestone, Codex needs:

```text
MCP URL
PAT
Tenant ID
```

The recommended configuration keeps the PAT outside `config.toml`.

## Configure Codex

Open:

```text
~/.codex/config.toml
```

Add:

```toml
[mcp_servers.crestone]
url = "https://mcp.example.com/mcp"
bearer_token_env_var = "CRESTONE_PAT"

[mcp_servers.crestone.http_headers]
X-Crestone-Tenant-Id = "11111111-1111-4111-8111-111111111111"
```

Replace the Tenant ID with your actual Crestone Tenant ID.

The PAT is **not stored in this file**.

Codex reads it from:

```text
CRESTONE_PAT
```

and sends:

```http
Authorization: Bearer <value-of-CRESTONE_PAT>
```

## Store `CRESTONE_PAT` persistently on macOS

If Codex is launched from a shell and no dedicated secret-storage mechanism is being used, you can persist the variable for your shell.

For the default macOS Zsh shell, add the variable to:

```text
~/.zshrc
```

For example:

```bash
export CRESTONE_PAT='cres_pat_<your-token>'
```

Then reload the shell:

```bash
source ~/.zshrc
```

New terminal sessions will now receive `CRESTONE_PAT`.

> **Security note:** `.zshrc` stores the value as plaintext. Use a client or OS-backed secret mechanism instead when one is available.

Also note that GUI applications launched from Finder or Dock do not necessarily inherit shell configuration from `.zshrc`.

## Store `CRESTONE_PAT` persistently on Windows

Open PowerShell and run:

```powershell
[Environment]::SetEnvironmentVariable(
  "CRESTONE_PAT",
  "cres_pat_<your-token>",
  "User"
)
```

Close and reopen Codex after creating the variable.

The variable is stored for the current Windows user and survives restarts.

## Verify Codex

Restart Codex and run:

```bash
codex mcp list
```

You can also inspect the server:

```bash
codex mcp get crestone
```

Confirm that `crestone` connects and exposes its tools.

---

# 6. Claude Code

Claude Code supports remote HTTP MCP servers and custom request headers.

For Crestone you need:

```text
MCP URL
PAT
Tenant ID
```

The PAT should preferably come from persistent secure storage or an environment variable rather than being committed to project configuration.

## macOS

If your environment requires a persistent environment variable, add:

```bash
export CRESTONE_PAT='cres_pat_<your-token>'
```

to:

```text
~/.zshrc
```

Reload it:

```bash
source ~/.zshrc
```

Then configure Crestone:

```bash
claude mcp add --transport http crestone https://mcp.example.com/mcp \
  --header "Authorization: Bearer ${CRESTONE_PAT}" \
  --header "X-Crestone-Tenant-Id: 11111111-1111-4111-8111-111111111111"
```

Replace the Tenant ID with your actual value.

## Windows

Create a persistent user environment variable:

```powershell
[Environment]::SetEnvironmentVariable(
  "CRESTONE_PAT",
  "cres_pat_<your-token>",
  "User"
)
```

Open a new terminal after creating it.

Configure Crestone using the equivalent Claude Code command for your shell.

## Verify

Run:

```bash
claude mcp list
```

and:

```bash
claude mcp get crestone
```

Start a new Claude Code session and confirm that the Crestone tools are available.

> Avoid project-level configuration containing expanded PAT values.

---

# 7. OpenCode

OpenCode supports remote MCP servers, custom headers, and environment-variable interpolation.

Crestone uses PAT authentication rather than MCP OAuth discovery, so OAuth should be disabled for this server.

## Configure OpenCode

Store the PAT persistently using your operating system or preferred secret mechanism.

Then configure:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "crestone": {
      "type": "remote",
      "url": "https://mcp.example.com/mcp",
      "enabled": true,
      "oauth": false,
      "headers": {
        "Authorization": "Bearer {env:CRESTONE_PAT}",
        "X-Crestone-Tenant-Id": "11111111-1111-4111-8111-111111111111"
      }
    }
  }
}
```

Replace the Tenant ID with your actual Crestone Tenant ID.

## macOS

If required, persist:

```bash
export CRESTONE_PAT='cres_pat_<your-token>'
```

in:

```text
~/.zshrc
```

## Windows

Create the user variable:

```powershell
[Environment]::SetEnvironmentVariable(
  "CRESTONE_PAT",
  "cres_pat_<your-token>",
  "User"
)
```

## Verify

Restart OpenCode and run:

```bash
opencode mcp list
```

Confirm that `crestone` connects and exposes its tools.

---

# 8. Cursor

Cursor supports remote MCP servers and custom HTTP headers.

For Crestone you need:

```text
MCP URL
PAT
Tenant ID
```

## Configure Cursor

Open Cursor's MCP settings.

The configuration can be global:

```text
~/.cursor/mcp.json
```

or project-specific:

```text
.cursor/mcp.json
```

Configure Crestone:

```json
{
  "mcpServers": {
    "crestone": {
      "url": "https://mcp.example.com/mcp",
      "headers": {
        "Authorization": "Bearer ${env:CRESTONE_PAT}",
        "X-Crestone-Tenant-Id": "11111111-1111-4111-8111-111111111111"
      }
    }
  }
}
```

Replace the Tenant ID with your actual Crestone Tenant ID.

The PAT remains outside `mcp.json`.

## Persistent PAT

If your Cursor installation obtains environment variables from the operating system, configure `CRESTONE_PAT` persistently rather than using a temporary `export`.

### macOS

For shell-launched Cursor:

```bash
export CRESTONE_PAT='cres_pat_<your-token>'
```

can be stored in:

```text
~/.zshrc
```

> Cursor launched directly as a macOS GUI application may not inherit variables from `.zshrc`. Use Cursor's supported credential/environment mechanism when available, or ensure the application is launched from an environment containing the variable.

### Windows

Create a persistent user environment variable:

```powershell
[Environment]::SetEnvironmentVariable(
  "CRESTONE_PAT",
  "cres_pat_<your-token>",
  "User"
)
```

Restart Cursor afterward.

## Verify

Open Cursor's MCP settings.

Confirm that:

```text
crestone
```

is enabled and that its tools are available to the Agent.

---

# 9. Visual Studio Code

VS Code provides the cleanest credential workflow for Crestone because MCP configuration supports secure prompted inputs.

This means you do **not** need a persistent `CRESTONE_PAT` environment variable.

## Requirements

You need:

```text
MCP URL
PAT
Tenant ID
VS Code with built-in MCP support
```

## Option A — Add from the UI

Open the Command Palette:

```text
Ctrl/Cmd + Shift + P
```

Run:

```text
MCP: Add Server
```

Select an HTTP server and enter:

```text
https://mcp.example.com/mcp
```

Name the server:

```text
crestone
```

Then configure the required authentication headers using secure inputs.

## Option B — Configure `mcp.json`

Use:

```json
{
  "inputs": [
    {
      "type": "promptString",
      "id": "crestone-pat",
      "description": "Crestone PAT",
      "password": true
    },
    {
      "type": "promptString",
      "id": "crestone-tenant-id",
      "description": "Crestone Tenant ID",
      "password": false
    }
  ],
  "servers": {
    "crestone": {
      "type": "http",
      "url": "https://mcp.example.com/mcp",
      "headers": {
        "Authorization": "Bearer ${input:crestone-pat}",
        "X-Crestone-Tenant-Id": "${input:crestone-tenant-id}"
      }
    }
  }
}
```

VS Code requests the values through its input mechanism instead of requiring the PAT to appear directly in `mcp.json`.

## Verify

Open the Command Palette and run:

```text
MCP: List Servers
```

Select:

```text
crestone
```

Restart the MCP server if necessary.

Use **Show Output** for MCP connection diagnostics.

---

# 10. Windsurf

Windsurf supports MCP integrations, although available remote-server and custom-header functionality can vary by version and organization policy.

## Requirements

Direct Crestone connectivity requires support for:

```text
Remote MCP
Streamable HTTP
HTTPS
Custom Authorization header
Custom X-Crestone-Tenant-Id header
```

You also need:

```text
MCP URL
PAT
Tenant ID
```

## Configure Crestone

Open the MCP configuration from Windsurf/Cascade.

Add a server named:

```text
crestone
```

using:

```text
https://mcp.example.com/mcp
```

The connection must send:

```http
Authorization: Bearer <PAT>
X-Crestone-Tenant-Id: <TENANT_ID>
```

Prefer Windsurf's credential or secret mechanism when available.

If the installed version uses environment-variable interpolation, configure the PAT as a persistent user environment variable rather than a temporary shell variable.

The Tenant ID can be stored directly in the MCP configuration.

## Verify

Open the **MCPs** view in Cascade.

Confirm that Crestone is enabled and that its tools are available.

If the server does not appear, check whether your organization requires the MCP server to be allowlisted.

> If your Windsurf version cannot send both required headers, do not place credentials in the URL.

---

# 11. ChatGPT

ChatGPT supports custom remote MCP apps through its Apps and Developer Mode capabilities.

However, Crestone currently requires:

```http
Authorization: Bearer <PAT>
X-Crestone-Tenant-Id: <TENANT_ID>
```

The standard ChatGPT remote MCP configuration does not provide a documented generic mechanism for configuring Crestone's arbitrary static `X-Crestone-Tenant-Id` header.

Therefore, the current Crestone **PAT + Tenant ID header authentication model is not directly compatible with the standard ChatGPT remote MCP configuration**.

## Requirements for direct integration

A ChatGPT-compatible Crestone deployment requires:

```text
Public HTTPS MCP endpoint
/mcp endpoint
Streamable HTTP
Authentication mechanism supported by ChatGPT
```

For the current Crestone authentication contract, an authentication layer or gateway would need to translate the authenticated identity into the headers required by Crestone.

## Configure ChatGPT

Once Crestone exposes a compatible authentication mechanism:

1. Open **Settings → Apps → Advanced Settings**.
2. Enable **Developer Mode**, when available for your account or workspace.
3. Go to **Settings → Apps → Create**, or the equivalent Workspace Apps configuration.
4. Create an app named **Crestone**.
5. Enter:

   ```text
   https://mcp.example.com/mcp
   ```

6. Select the supported authentication mechanism.
7. Select **Scan Tools**.
8. Verify the detected Crestone tools.
9. Create the app.
10. Enable Crestone in a ChatGPT conversation.

> Do not put the Crestone PAT or Tenant ID in the URL as a workaround.

---

# 12. Claude Desktop / Claude Web

Claude supports custom remote MCP connectors through its Connectors interface.

However, Crestone currently requires:

```http
Authorization: Bearer <PAT>
X-Crestone-Tenant-Id: <TENANT_ID>
```

The standard Claude remote connector configuration does not currently provide a documented generic mechanism for Crestone's arbitrary static request headers.

For direct Crestone connectivity using custom headers, use **Claude Code**.

## Requirements for a compatible remote connector

A compatible Crestone deployment requires:

```text
Public HTTPS MCP endpoint
/mcp endpoint
Streamable HTTP
Claude-compatible authentication mechanism
```

## Configure Claude

Once Crestone exposes a compatible authentication mechanism:

1. Open **Customize → Connectors**.
2. Select **+**.
3. Select **Add custom connector**.
4. Enter:

   ```text
   Crestone
   ```

5. Enter:

   ```text
   https://mcp.example.com/mcp
   ```

6. Configure the supported authentication mechanism.
7. Add the connector.
8. Enable it from **+ → Connectors** in a conversation.

> Claude remote connectors connect from Anthropic's infrastructure. The Crestone MCP endpoint must therefore be reachable from that infrastructure.

---

# 13. Other MCP Clients

Another MCP client can connect directly to Crestone when it supports all of the following:

- Remote MCP
- Streamable HTTP
- HTTPS
- Custom HTTP headers
- Bearer `Authorization`
- `X-Crestone-Tenant-Id`

Conceptually:

```json
{
  "transport": "streamable-http",
  "url": "https://mcp.example.com/mcp",
  "headers": {
    "Authorization": "Bearer <PAT>",
    "X-Crestone-Tenant-Id": "<TENANT_ID>"
  }
}
```

This is a conceptual example. Configuration keys and credential-storage mechanisms vary between clients.

Prefer a client's secure credential mechanism instead of storing the PAT directly in this type of configuration.

---

# 14. Validate the Connection

After configuring a supported client, confirm that:

- `crestone` reports as connected.
- MCP initialization succeeds.
- A live MCP tool list is available.
- Both required headers are being sent.
- The PAT is not exposed in logs or prompts.

Start with:

```text
List the Crestone workspaces available to this credential.
```

Select one of the returned workspaces and ask:

```text
List all source and destination connections in this workspace.
```

Then perform another bounded read-only operation, such as listing nodes in the selected workspace.

## Availability check

Crestone MCP does **not** expose a `/health` endpoint.

Successful MCP initialization followed by a live:

```text
tools/list
```

response is the connectivity and deployed-capability check.

---

# 15. Troubleshooting

| Symptom | Likely cause | Action |
|---|---|---|
| `404` before initialization | The URL does not include `/mcp`, or the proxy routes another path. | Use the exact hosted `/mcp` URL. |
| `404 Session not found` | The MCP session was lost, the server restarted, or the request reached another server process. | Reconnect the client. |
| `400` missing tenant | `X-Crestone-Tenant-Id` is missing, malformed, or stripped. | Verify the Tenant ID and client header configuration. |
| `400` protocol/session error | MCP protocol headers, request body, or session ID are invalid. | Reconnect using a current MCP client. |
| `401 Unauthorized` | PAT is missing, invalid, expired, or revoked. | Verify or rotate the PAT. |
| `403 Forbidden` | The PAT does not have access to the requested tenant, workspace, resource, or operation. | Review the PAT capabilities and assigned workspaces. |
| Works from Terminal but not from the desktop app | The GUI application did not inherit the shell environment variable. | Use the client's credential mechanism or a persistent OS-level configuration supported by the client. |
| Works until the computer restarts | The PAT was configured with a temporary `export` or session variable. | Configure persistent credential storage. |
| `5xx` or timeout | Proxy, MCP server, or backend is unavailable. | Contact the service administrator. |
| Tools do not appear | MCP initialization failed or configuration was not reloaded. | Restart/reconnect and inspect MCP diagnostics. |

---

# 16. Security and PAT Lifecycle

## Use least privilege

When creating the PAT, grant only the capabilities and workspaces required by that MCP client.

For example, a PAT created for a read-only assistant should not receive write capabilities unless they are actually required.

## Keep the PAT out of configuration files

Whenever possible, prefer:

```text
Client secure storage
Secure/password inputs
OS credential storage
Persistent environment variables
```

over:

```text
"Authorization": "Bearer cres_pat_REAL_TOKEN"
```

## Protect the PAT

Never expose the PAT in:

- Prompts
- Screenshots
- Support tickets
- Logs
- Shell history
- Git repositories
- Shared configuration files

## Rotate and revoke

Rotate PATs according to your organization's security policy.

Immediately revoke a PAT if you suspect it has been exposed.

Removing `crestone` from an MCP client does **not** revoke the PAT.

PAT lifecycle management must be performed from Crestone.

---

# 17. Quick Setup Reference

## Step 1 — Create the PAT

In Crestone:

```text
Settings
  → MCP
    → Personal access tokens
      → Create PAT
```

Configure:

```text
Name
Expiration (optional)
Capabilities
Workspaces
```

Select **Create PAT** and copy the token when it is displayed.

---

## Step 2 — Collect the connection information

You need:

```text
MCP URL:
https://<your-mcp-host>/mcp

PAT:
cres_pat_<your-token>

Tenant ID:
<your-tenant-uuid>
```

---

## Step 3 — Store the PAT securely

Prefer:

```text
1. Client secure credential storage
2. Client password/secret input
3. OS-supported credential mechanism
4. Persistent user environment variable
```

Avoid temporary shell-only configuration as the normal installation procedure.

---

## Step 4 — Configure the MCP client

The client must ultimately send:

```http
Authorization: Bearer <PAT>
X-Crestone-Tenant-Id: <TENANT_ID>
```

to:

```text
https://<your-mcp-host>/mcp
```

---

## Step 5 — Test the connection

Ask:

```text
List the Crestone workspaces available to this credential.
```

If the client returns the workspaces authorized for the PAT, the Crestone MCP connection is ready to use.

---

## Connection Summary

```text
Transport:
Streamable HTTP over HTTPS

Endpoint:
https://<your-mcp-host>/mcp

Authentication:
Authorization: Bearer <PAT>

Tenant:
X-Crestone-Tenant-Id: <TENANT_ID>

PAT storage:
Use secure persistent storage whenever supported by the client.
```