# Housekeeping Procedure

This document describes how to free up disk space on a CRESTONE server. 

---

## 1. Prerequisites
Before starting, make sure you have:

- An existing CRESTONE installation. See [Installation Procedure](./) if you haven't installed it yet.
- `sudo` privileges on the server.

> If your installation is on a version **older than v1.97.6**, it doesn't have `housekeeping.sh` yet. Download it first:
> ```bash
> cd ~/crestone_installer
> curl -fLO https://seidor-analytics-products.s3.amazonaws.com/crestone/housekeeping.sh
> chmod +x housekeeping.sh
> ```
---

## 2. Run Housekeeping
Go to the folder where CRESTONE was installed (or upgraded) and run:

```bash
cd ~/crestone_installer
sudo bash housekeeping.sh
```

This removes:
- Image `.tar` files already loaded into Docker during install/upgrade (100% duplicated once loaded — this is usually the biggest chunk of freed space).
- The original downloaded `.tar.gz` package, if it's still there.
- Docker images, volumes, and networks not used by any container — including old versions left behind by a previous upgrade.

Expected messages include:

```
==== CRESTONE Sanitize / Housekeeping ====
...
✅ images/*.tar removed (~14G freed).
...
✅ Housekeeping complete.
```

### Preview without changing anything
```bash
sudo bash housekeeping.sh --dry-run
```

---

## When to run it
- **Right after installing** — frees the space used by the install package's image files, usually 15–20 GB.
- **After every upgrade** — frees the space used by the previous version's images.
- **Periodically**, as general maintenance.

---

✅ **Your CRESTONE server is now clean.**
