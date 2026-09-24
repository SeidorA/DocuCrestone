---
title: "Step 9 — Installation Acceptance Checklist"
description: "End-to-end checklist to validate a Crestone installation before calling it done."
sidebar_position: 10
---

Use this checklist end to end for every new Crestone installation with an SAP source. Don't
mark a section done just because the UI loaded or the installer showed a success message —
each item only counts once the thing it describes actually happened.

---

## 1. Before installing

- [ ] Server meets the minimums (230 GB disk, 16 GB RAM, 8 CPU cores, 4 GB swap), x86_64 architecture
  *Client infrastructure*
- [ ] Ports 80/443/81/7000/22 enabled as needed (see [Minimum Technical Requirements](./crestone_installation/step_1.1_crestone_min_requirements.md))
  *Client network team*
- [ ] Outbound TCP/587 to `email-smtp.us-east-1.amazonaws.com` (AWS SES) enabled — it's the only outbound port in the whole block; if it's missing there's no visible error, the confirmation email just never goes out
  *Client network team*
- [ ] If the install starts with just an IP (no custom DNS yet), access is over HTTP, not HTTPS — confirm the client's security policy/proxy doesn't block plain HTTP before assuming "the UI won't load"
  *Client network team*
- [ ] Allowed domains: `*.s3.amazonaws.com` (always), plus Docker/Ubuntu ones if the server doesn't already have them
  *Client network team*
- [ ] Root/sudo access confirmed on the server
  *Client infrastructure*
- [ ] Decided whether to use the default `nip.io` hostname or a custom DNS from the start (see the risk of it being blocked by filters like FortiGuard)
  *Seidor / client*
- [ ] If the source is SAP: client's sysnr confirmed, and the network scenario defined (direct access / VPN / SAProuter)
  *Seidor / Basis*

## 2. Install Crestone

- [ ] `install.sh` ran without errors and shows the success message
  *Seidor*
- [ ] All containers are `Up` and healthy (`docker compose ps`), none stuck in `Restarting`/`Exited`
  *Seidor*
- [ ] `housekeeping.sh` run after installing, to free up the space used by duplicated images
  *Seidor*
- [ ] UI reachable from the configured hostname (nip.io or custom DNS) from the client's normal network, not only from a technical network/VPN
  *Seidor · confirm with the client*

## 3. Crestone users and licensing

- [ ] License activated (online with a code, or offline with a signed file), limits and expiration matching what was contracted
  *Seidor*
- [ ] `noreply@notifications.crestone.io` allowlisted on the company's mail gateway/firewall (once, for everyone)
  *Client network team*
- [ ] Also allowlisted on each invited user's own mailbox rules (M365/Google Workspace can apply different filtering per person or group, independent of the company-wide policy)
  *The user / their IT*
- [ ] Crestone user created, confirmation email arrived
  *Seidor · verify with a real signup, don't assume*
- [ ] The confirmation link opens and works from the user's normal network, without needing a VPN
  *Seidor*
- [ ] If the client configured their own SMTP (Settings → SMTP instead of Crestone's default): the test send passed
  *Seidor (optional, if applicable)*
- [ ] MFA configured if the client's security policy requires it
  *Client*

## 4. SAP — role, user, and RFC connection

- [ ] Transport requests (OTs) imported into SAP without errors
  *Basis*
- [ ] Technical user created (Communication or Dialog type)
  *Basis*
- [ ] `ZCRESTONE` role imported, assigned to the user, and user comparison run
  *Basis*
- [ ] User has `S_RFC`, `RFC_SYSTEM_INFO`, and access to the tables/extractors in scope
  *Basis / Security*
- [ ] Port 32NN open from Crestone to the application server
  *Client network team*
- [ ] The SAP host's FQDN resolves via DNS from the VM and from the container (not enough for the IP alone to respond over TCP)
  *Basis / Client network team*
- [ ] Port 33NN open from Crestone to the SAP gateway
  *Client network team · the most commonly forgotten one*
- [ ] If there's a SAProuter: `saprouttab` allows both destinations, dispatcher and gateway
  *SAProuter administrator*
- [ ] `reginfo` and `secinfo` authorize `CRESTONE_SERVER` and the `CRES_SLOT_*`
  *Basis*
- [ ] Gateway ACLs reloaded after editing the files
  *Basis*
- [ ] Type-T RFC destination created in SM59 and its connection test passes
  *Basis*
- [ ] The connection's Gateway Host field points to the client's real SAP host, not a Crestone/demo server
  *Seidor · confirm against the real `ashost`*
- [ ] If parallelism will be used: the number of `CRES_SLOT_N` created in SAP matches what's configured in Settings → Parallel Extraction
  *Seidor / Basis*

## 5. Connections in Crestone (source and destination)

- [ ] Source connection created in Crestone and its connection test passes
  *Seidor*
- [ ] Destination connection created in Crestone and its connection test passes
  *Seidor*
- [ ] If the destination is cloud-based (Azure/AWS/GCP/Snowflake/Databricks/etc.): that connector's domains confirmed with the client and allowed on their outbound internet access
  *Client network team*

## 6. Test node, job, and extraction

- [ ] Test node created using the configured source connection
  *Seidor*
- [ ] Node preview returns data
  *Seidor*
- [ ] If the table/extraction is large: filters or Batch by Field were applied before running an unbounded Full
  *Seidor*
- [ ] Test job defined and executed
  *Seidor*
- [ ] The full extraction (not just the preview) completes successfully and the data reaches the destination
  *Seidor · validate both, not just the preview*
- [ ] Data in the destination validated against a known sample
  *Client validates*

## 7. Monitor

- [ ] The test execution shows up in Monitor → Performance/History with a successful status
  *Seidor*
- [ ] No errors in Monitor → Logs (UI / Engine / SAP tabs) tied to the execution
  *Seidor*
- [ ] If cancelling an execution was tested: `Cancel execution` works and leaves no residual processes on the SAP side
  *Seidor (optional, if applicable)*

## 8. Closing

- [ ] No item on this list was marked "done" just because the UI loaded or the installer showed `11/11`
  *Seidor*
- [ ] Evidence kept: rows extracted, duration, screenshots of the key screens (no visible credentials/secrets)
  *Seidor*

---

## Download a fillable copy

Prefer to work from a document you can check off and keep as evidence? Download the fillable
PDF version — same checklist, with real checkboxes:

- 📄 [Download in English](/files/Crestone-Installation-Checklist-EN.pdf)
- 📄 [Descargar en español](/files/Crestone-Installation-Checklist-ES.pdf)
