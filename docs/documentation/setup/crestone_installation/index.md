---
iconName: "Crestone"
useBrand: true
---

# Installation Procedure

This document describes the steps required to install **CRESTONE** on a server. Follow the procedure carefully to ensure a successful deployment.

---

## 1. Prerequisites
Before starting, make sure you have:

- A **Linux server** (Ubuntu recommended) with `sudo` privileges. See [Minimum Technical Requirements](./step_1.1_crestone_min_requirements.md) for more details about the server. 
- Internet connectivity for downloading the installer package (or access to a copy of it).  
- Server IP or DNS name to be used during installation.  

---

## 2. Download the Installer Package
The CRESTONE installer is provided as a compressed `.tar.gz` package stored in AWS S3.

Run the following command to download it:

```bash
curl -fLO https://seidor-analytics-products.s3.amazonaws.com/crestone/crestone_installer_latest.tar.gz
```

---

## 3. Extract the Package
Unpack the archive into your working directory:

```bash
tar -xzvf crestone_installer_latest.tar.gz
```
Move to the unpacked directory:

```
cd crestone_installer
```

---

## 4. Run the Installer
Start the installation process by running:

```bash
sudo bash ./install.sh
```

- The script will guide you through the installation steps and automatically configure all the CRESTONE components.  

Expected messages include progress steps like:

```
🛠️  [Step 1/10] Check prerequisites
✅ Done: Docker ready
 ...
🛠️  [Step 11/11] Finalize NPM proxy hosts via API (save & reload)
✅ Done: NPM API finalize (host or in-container)
```

At the end, you should see:

```
🎉 Installation complete (steps 11/11).
```

---

## 5. Verify the Installation
After installation completes, test the system by opening the following URLs in your browser:

- **CRESTONE UI:**  
  `http://crestone.<SERVER_IP>.nip.io`

  or

  `http://<SERVER_DNS>`

---

## 6. Troubleshooting
- If containers fail to start, re-run the installer:  
  ```bash
  sudo bash ./install.sh --yes --server <SERVER_IP_OR_DNS>
  ```
- You’ve run out of disk space while writing the image tar files:
  ```bash
  Cannot write: No space left on device
  ```
  Ensure you have enough space. The full installer (all images/tars) typically needs ~20–30 GB free during unpack + docker load (because tar files + extracted layers coexist temporarily). Aim for >30 GB free to be safe.
---

## Common Commands
- Bring CRESTONE stack up:
  ```bash
  sudo docker compose -p crestone -f /home/ubuntu/crestone_installer/docker-compose-full.yml --env-file /home/ubuntu/crestone_installer/.env.runtime up -d --pull=never
  ```
- Bring CRESTONE stack down manually:
  ```bash
  sudo docker compose -p crestone -f /home/ubuntu/crestone_installer/docker-compose-full.yml --env-file /home/ubuntu/crestone_installer/.env.runtime down
  ``` 
- View logs:
  ```bash
  sudo docker compose -f ./docker-compose-full.yml -p crestone logs -f --tail=200
  ``` 
- Restart all services:
  ```bash
  sudo bash ./restart.sh
  ```   
- Ensure services are up before restart:
  ```bash
  sudo bash ./restart.sh --ensure-up
  ```  
---

✅ **You are now ready to use CRESTONE.**
