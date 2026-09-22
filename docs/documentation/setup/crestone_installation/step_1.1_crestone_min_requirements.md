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


### Email delivery (not a port, but breaks the same flow)

Crestone's emails (account confirmation, invite, password reset) are sent from **`noreply@notifications.crestone.io`**. If the client's firewall/spam filter blocks unknown senders, these emails never arrive — even if port 7000 is open and everything else is correct. Before creating new users, ask the client to allowlist **`noreply@notifications.crestone.io`**.

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
