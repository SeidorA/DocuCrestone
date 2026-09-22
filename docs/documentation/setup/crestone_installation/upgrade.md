# Upgrade Procedure

This document describes how to update an existing CRESTONE installation to a new version. 

---

## 1. Prerequisites
Before starting, make sure you have:

- An existing CRESTONE installation. See [Installation Procedure](./) if you haven't installed it yet.
- `sudo` privileges on the server.

> If your installation is on a version **older than v1.97.6**, it doesn't have `upgrade.sh` yet. Download it first:
> ```bash
> cd ~/crestone_installer
> curl -fLO https://seidor-analytics-products.s3.amazonaws.com/crestone/upgrade.sh
> chmod +x upgrade.sh
> ```

---

## 2. Download the Update Package
Go to the folder where CRESTONE was installed and download the latest package:

```bash
cd ~/crestone_installer
curl -fLO https://seidor-analytics-products.s3.amazonaws.com/upgrade/crestone_upgrade_latest.tar.gz
```

- Leave the file compressed, right there next to `upgrade.sh` 
- If this server doesn't have internet access, download this same file on a machine that does, then copy it here (`scp`, USB, etc.) into the same folder as `upgrade.sh`. Everything from Step 3 onward is identical either way.

---

## 3. Run the Upgrade
```bash
sudo bash ./upgrade.sh
```

What happens, in order:
1. It shows the version currently installed.
2. It finds the package you just downloaded next to it, and extracts it.
3. It shows which version that package actually contains.
4. It asks you to confirm you've backed up the server, then applies the update.
5. It shows a completion message once done.

Expected messages include:

```
Currently installed version (back): v1.97.5
-> Found a locally staged bundle: ./crestone_upgrade_latest.tar.gz (skipping S3 download)
...
✅ Resolved 'latest' to version v1.97.6 (from bundle manifest).
...
Have you already backed up the server and want to continue? [y/N]:
...
✅ Upgrade to v1.97.6 completed.
```

---

## 4. Verify the Upgrade
Check that the containers restarted with the new version:

```bash
sudo docker compose -p crestone -f /crestone/docker-compose-full.yml --env-file /crestone/.env.runtime ps
```

---

✅ **Your CRESTONE installation is now up to date.**

Next: [Housekeeping](./housekeeping) — free up the disk space used by the previous version. It's a separate step, not part of the upgrade itself.
