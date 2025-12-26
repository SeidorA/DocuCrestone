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
- **Disk:** 120 GB  
- **RAM:** 16 GB  

---

## Required Open Ports
- **5432:** PostgreSQL Database Service  
- **9000:** Container hosting service (all services)  
- **80, 81, 443:** Nginx Proxy Manager (public/internal URLs)  
- **8080, 8082:** Web microservices  
- **29092, 9090, 9092:** Kafka Services  
- **2181:** Zookeeper Service  
- **7000, 8000:** CRESTONE Database web access  
- **22:** SSH Service  

---

## Supported Architectures

CRESTONE only supports installation on **x86_64 (amd64) architecture** servers.  
ARM-based architectures (such as Apple Silicon M1/M2 or ARM servers) are **not supported**.

---

## User Permissions
- A user account with **root** or **administrator** permissions on the OS.  

---

## Allowed Domains
The following domains must be accessible for package installation and updates:

- `archive.ubuntu.com`  
- `security.ubuntu.com`  
- `download.docker.com`  
- `get.docker.com`  
- `*.ubuntu.com`  
- `*.canonical.com`  
- `registry-1.docker.io`  
- `auth.docker.io`  

---
