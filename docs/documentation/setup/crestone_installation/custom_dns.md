---
sidebar_position: 2
---

# Custom DNS Name

If Crestone's default `nip.io` hostname gets blocked by the client's firewall or web filter (see
[Minimum Technical Requirements](./step_1.1_crestone_min_requirements.md#default-hostname-and-dns)),
or you simply want a permanent domain from the start, this procedure explains how to publish
Crestone behind a friendly DNS name after the platform is already installed and running.

---

## Prerequisites

- Crestone installation completed and accessible via the installation IP.
- Administrative access to the DNS zone that should host the Crestone records.
- The public or private IP address of the Crestone server.
- SSH access to the Crestone server with sudo privileges.

---

## 1) Choose the Crestone hostname

1. Select the base hostname clients will use, for example `crestone.example.com`.
2. Ensure the name does not clash with existing services in your DNS zone.

> Crestone automatically expects companion hostnames for its internal services. All records can point to the same server IP or use CNAMEs to the primary hostname.

---

## 2) Create DNS records

Create A (or CNAME) records for the hostnames below. Replace `example.com` with your chosen domain and point each record to the Crestone server IP (or CNAME back to the `crestone` record).

| Hostname | Purpose |
| --- | --- |
| `crestone.example.com` | Main Crestone web application |
| `crestone-back.example.com` | Backend/API proxy |
| `crestone-supa.example.com` | Supabase/Kong gateway |

> Some environments prefer a wildcard record such as `*.crestone.example.com`. If you choose that route, ensure it resolves to the Crestone server IP and does not affect other applications.

Allow time for DNS propagation and confirm the names resolve (e.g., `dig crestone.example.com`).

---

## 3) Update the Crestone configuration

1. SSH into the Crestone server.
2. Navigate to the installer directory (for example `cd /opt/crestone_installer` if you cloned the repository there).
3. Run the installer in update mode with the new base domain:

   ```bash
   sudo bash ./install.sh --yes --server example.com
   ```

   - When prompted, confirm the detected server identity.
   - The script rewrites `.env.runtime`, updates Nginx Proxy Manager, and restarts the required containers so that `crestone`, `crestone-back`, and `crestone-supa` use the new DNS names.

4. Wait for the script to finish and for all containers to restart successfully.

---

## 4) Verify access

1. In a browser, open `http://crestone.example.com` and confirm the UI loads.
2. Test API access at `http://crestone-back.example.com` if you expose it directly (optional).
3. From SAP or other integration points, update endpoints to reference the new DNS names.
4. If you plan to enable HTTPS, request or import TLS certificates after confirming DNS resolves correctly.

---

## Summary

1. Define the desired Crestone hostname and create DNS records (`crestone`, `crestone-back`, `crestone-supa`).
2. Rerun the installer with `--server <your-domain>` so the configuration picks up the DNS names.
3. Validate connectivity using the new hostnames and update downstream integrations.
