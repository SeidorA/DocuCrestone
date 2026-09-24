---
sidebar_position: 1
---

# Minimum Technical Requirements

This document describes the minimum technical requirements for the server where the CRESTONE platform will be installed.


---

## Supported Deployment Environments

### Cloud (Azure or AWS)
- **Azure VM Families:**  
  - Compute Optimized (F-series)  
  - Memory Optimized (E-series)  

- **AWS Instance Families:**  
  - Compute Optimized (C-series)  
  - Memory Optimized (R-series)  

- **Recommended Sizes:**  
  - Azure: F16 or higher (F-series), E16/E20/E32 or higher (E-series)  
  - AWS: t3.xlarge or higher  

### On-Premise
- **Processor:** Minimum 1 CPU with 4 cores 

---

## Operating System
- **Azure:** Ubuntu Server 22.04 LTS  
- **AWS:** Ubuntu 22.04 or higher  
- **On-Premise:** Ubuntu 22.04 or higher (best practice) 

---

## Storage and Memory
- **Disk:** 230 GB minimum *(if you've hit "no space left on device" during install/upgrade before, this is why — see breakdown below)*
- **RAM:** 16 GB
- **CPU:** 8 cores
- **Swap:** at least 4 GB

**Why these numbers:**
- The full stack (Supabase + Kafka + NGINX Proxy Manager + Portainer + front/back/SAP microservice), just as loaded Docker images, already uses close to 15 GB — before counting any client data.
- Every version upgrade (`upgrade.sh`) downloads and loads the new front/back/abap images *before* removing the old ones, so right after an upgrade two full versions coexist on disk (~6–9 GB extra) until `sudo bash housekeeping.sh` is run.
- Client data (the Postgres database, temporary extraction files in `shared_data` while they're uploaded to the destination) grows with real usage — it's on top of the fixed footprint above, and scales with extraction volume.
- The SAP microservice runs on the JVM (Spring Boot) with an embedded Apache Spark for processing large files — large extractions can spike memory usage. Swap is the safety net that avoids an OOM kill during those spikes; it's not meant to be relied on for sustained performance.

---

## Required Open Ports

Crestone communicates internally over its own Docker network (Kafka, the database, front↔back↔SAP microservice, etc.) — those ports never need firewall rules, inbound or outbound, because that traffic never leaves the host. Towards the outside, only these ports matter:

| Port | Service | Why it's needed | Direction |
|---|---|---|---|
| 80 | Nginx Proxy Manager (HTTP) | Main entry point for end users (front, api., supa. hosts). On installs without HTTPS yet, this is the only way in. | Inbound |
| 443 | Nginx Proxy Manager (HTTPS) | Entry point for end users over HTTPS. If the install doesn't have certificates yet, it's not mandatory to open it immediately, but the Proxy Host should still be created in NGINX so it's ready once HTTPS is enabled. | Inbound |
| 81 | Nginx Proxy Manager (Admin) | NGINX's own admin panel, used to create/edit the Proxy Hosts that publish the other services. Can stay closed except when someone needs to change a host. | Inbound, admins only |
| 7000 | Kong / Supabase Auth API (direct, bypasses NGINX) | Account confirmation, invite, and email-change links point straight at this port (`http://<host>:7000/auth/v1/verify`), not through NGINX. If it's closed, the user clicks the email link and it fails to load. | Inbound — same audience as 80/443 |
| 22 | SSH | Server administration: maintenance, updates, restarts, support. | Inbound, support/admins only |

All of the above are **inbound only** — Crestone never initiates outbound connections into the client's network through any of these ports (the one separate case is outbound *email delivery*, covered below; SAP/source/destination connectivity for extraction nodes is a different topic entirely, not a "server port").

If the installation starts out with just an IP or `nip.io` and doesn't have a TLS certificate yet, access is over **plain HTTP** (port 80), not HTTPS. Some corporate security policies or proxies block unencrypted HTTP traffic by default — if the UI "won't load" but port 80 is confirmed open, check this with the client's security team before assuming it's a Crestone problem.

### Email delivery

Crestone's emails (account confirmation, invite, password reset) are sent from **`noreply@notifications.crestone.io`**. If the client's firewall/spam filter blocks unknown senders, these emails never arrive — even if port 7000 is open and everything else is correct. Before creating new users, ask the client to allowlist **`noreply@notifications.crestone.io`** at two levels: the company's mail gateway/firewall (once, for everyone), **and** each invited user's own mailbox rules (M365/Google Workspace can apply different filtering per person or group, independent of the company-wide policy) — a user can end up blocked individually even when the company's network is already allowlisted correctly.

**Outbound port 587** to `email-smtp.us-east-1.amazonaws.com` (AWS SES) — this is the other side of the same flow, and the only *outbound* port in this whole section. The installer's self-hosted Supabase Auth service is preconfigured to send these emails through AWS SES on port 587; it's not optional or swappable per install. If this outbound port is blocked, the email is never sent in the first place — there's no error on the Crestone side, the request to SES just times out, which makes it look like a Crestone bug rather than an outbound firewall rule.

---

## Default hostname and DNS

By default, Crestone is reachable through a temporary hostname based on `nip.io` (a service that
maps `<ip>.nip.io` to that same IP, so the platform works out of the box without a real DNS record
yet). Some corporate web/content filters (for example FortiGuard) classify `nip.io` under
**"Dynamic DNS"** and block it outright — even though the underlying IP is reachable. If that
happens, the Crestone UI won't load from the client's normal network, even though everything else
is configured correctly.

If you hit this, or want a permanent setup from the start, replace `nip.io` with the client's own
DNS name — see [Custom DNS Name](./custom_dns.md).

---

## Supported Architectures

CRESTONE only supports installation on **x86_64 (amd64) architecture** servers.  
ARM-based architectures (such as Apple Silicon M1/M2 or ARM servers) are **not supported**.

---

## User Permissions
- A user account with **root** permissions on the OS.

  This isn't optional: `install.sh`, `upgrade.sh`, and `housekeeping.sh` all refuse to run without `sudo`. They need to install OS packages (Docker, `jq`, etc.) and manage the Docker daemon socket (`/var/run/docker.sock`) — access to that socket is equivalent to root on the host, so there's no way to do this with a restricted user.

---

## Allowed Domains
CRESTONE ships as a self-contained offline bundle — the installer and every upgrade only ever use `docker load` on images that are already downloaded, **never `docker pull`**. So Docker Hub itself does not need to be reachable. What actually needs to be allowed:

- `seidor-analytics-products.s3.amazonaws.com` (or `*.s3.amazonaws.com`) — **always required.** This is where the installer package and every `upgrade.sh` bundle are downloaded from.
- `archive.ubuntu.com`, `security.ubuntu.com`, `*.ubuntu.com`, `*.canonical.com` — only needed if the server doesn't already have `jq`/`curl`/other basic packages pre-installed; the scripts install anything missing via `apt-get`.
- `download.docker.com`, `get.docker.com` — only needed if Docker Engine isn't already installed on the server; the installer sets it up automatically if it's missing.

If the client pre-provisions the server with Docker + Docker Compose plugin already installed, only the S3 domain above is strictly required.

---

## Connector domains (source/destination)

These are separate from the "Allowed Domains" above (those are for the *installer itself*). Once
Crestone is running, individual source/destination connectors may need their own outbound domains
allowed, depending on which ones the client actually uses:

| Connector | Domain(s) | Notes |
|---|---|---|
| Azure Storage / Azure SQL Server / Databricks (via Azure staging) | `<account>.blob.core.windows.net`, `<account>.dfs.core.windows.net` | The exact account name is whatever the client configured in the connection. |
| Microsoft Dynamics 365 / Fabric OneLake | `login.microsoftonline.com` (OAuth token endpoint), `onelake.dfs.fabric.microsoft.com` (Fabric OneLake only) | Fixed endpoints, independent of the client's tenant. |
| Salesforce | `*.salesforce.com`, `*.salesforce.com.au` | Exact host depends on the client's Salesforce instance. |
| AWS S3 | `s3.amazonaws.com` or the bucket's regional endpoint (`s3.<region>.amazonaws.com`) | Depends on the bucket's region. |
| Snowflake | `<account>.snowflakecomputing.com` | Exact host is the account identifier configured in the connection. |
| Databricks | The workspace URL configured in the connection (e.g. `<workspace>.azuredatabricks.net` or `<workspace>.cloud.databricks.com`) | |
| Google Cloud Storage / BigQuery | `*.googleapis.com` | Standard Google API endpoints. |

> Ask the client which sources/destinations they plan to use *before* the network team locks down
> egress — this was one of the recurring blockers in past implementations (connections that work
> fine from SAP, on the private network, but fail from cloud connectors going out to the internet).

---

## Ports and connectivity towards SAP

> This section comes from the [SAP RFC Troubleshooting](../sap_rfc_troubleshooting/index.md)
> doc — it was moved here because these are ports that need to be enabled **before** reaching the
> step of creating the RFC connection (Step 5), not something to verify only at that point.

### Ports to enable

| Port | Direction | SAP service | What Crestone uses it for |
|---|---|---|---|
| 32NN (3200 if sysnr 00) | Crestone → SAP | Application server dispatcher | Connection test, listing tables, reading metadata |
| 33NN (3300 if sysnr 00) | Crestone → SAP | Gateway (sapgwNN) | Program ID registration (includes preview, which also registers `CRESTONE_SERVER`). Stays open, and data comes back through it |
| 3299 | Crestone → SAP | SAProuter | Only if the connection goes through a SAProuter — replaces direct access |

### Direct connection to an application server

Crestone always connects to one specific application server (`ashost` + `sysnr`). It doesn't use
a message server or load balancing, so there's no need to enable port 36NN. If the client has
several application servers, pick one and use its host in the connection configuration.

### Depending on how you reach the client's network

#### Scenario A — Direct access

Crestone and SAP see each other on the same network, or there's direct routing between both.

- **Enable:** outbound 32NN and 33NN, from Crestone's IP towards the SAP host.
- **In Crestone:** Host, instance number, client, user, and password. No SAProuter.

#### Scenario B — Site-to-site VPN

A permanent tunnel connects Crestone's network with the client's. Crestone sees SAP as if it
were local.

- **Enable:** the same ports as direct access, but inside the tunnel — the rules go on the
  firewall at both ends.
- **Critical point:** allowed-service lists often only include 32NN, since that's the "known"
  SAP port. Confirm 33NN is also in the tunnel's policy.
- **In Crestone:** same as direct access. No SAProuter.

#### Scenario C — SAProuter

All traffic enters through the client's SAProuter, which acts as an intermediary.

- **Enable:** 3299 towards the SAProuter. And in its `saprouttab`, allow both destinations:
  dispatcher and gateway.
- **Critical point:** it's common for the `saprouttab` entry to only cover the dispatcher.
  Without the gateway entry, the registration never arrives and there's no trace of the attempt
  in SAP.
- **In Crestone:** load the SAProuter in the connection's corresponding field.

With a SAProuter, Crestone builds the routing chain internally. The resulting format is:

```
/H/<saprouter-host>/S/3299/H/<sap-host>/S/32<NN>
```

If the SAProuter requires a routing password, the intermediate `/W/` parameter is supported.

### SAP user

A Communication- or Dialog-type user with permissions to execute RFC (`S_RFC`) and read the
tables or extractors that will be extracted. It also needs `RFC_SYSTEM_INFO` authorization, which
Crestone uses when connecting to detect whether the system is Unicode.

---
