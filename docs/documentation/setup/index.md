---
iconName: "command"
title: "Setup"
description: "This document describes the step-by-step procedure required to configure and establish the connection between CRESTONE and an SAP system."
---


# 📘 Procedure to Establish the Connection Between CRESTONE and SAP  

This document describes the step-by-step procedure required to configure and establish the connection between **CRESTONE** and an **SAP** system.  

---

## 1. Install CRESTONE  
Before starting the integration with SAP, CRESTONE must be installed and running in the target environment (server).  

👉 See installation procedure here: [CRESTONE – Installation Procedure](./crestone_installation)  

---

## 2. Import Transport Requests (OTs) into SAP  
To enable the communication layer with CRESTONE, the **transport requests (OTs)** delivered with the installation package must be imported into SAP.  

👉 Detailed procedure: [Import OTs in SAP](./step_2.0_import-OTs.md)  

---

## 3. Create a User in SAP  
A technical user must be created in SAP that will be used by CRESTONE to establish the connection.  
- Recommended user type: **Dialog** or **System** (depending on client security policies).  
- This user must have the specific roles assigned, as described in the next step.  

---

## 4. Import and Assign Roles in SAP  
The technical user created in the previous step must have the correct authorizations. For this, the **standard roles provided by CRESTONE** must be imported and assigned to the user.  

👉 Instructions: [Import and Assign SAP Roles](./step_4.0_import-assign-roles.md)  

---

## 5. Create the RFC Connection in SAP  
The communication between SAP and CRESTONE is established through a **TCP/IP RFC destination**.  
- Define the RFC destination `CRESTONE_SERVER` in transaction **SM59**.  
- Configure it as a **Registered Server Program** with the agreed Program ID.  
- Validate the destination using the **Connection Test**.
- Configure SAP Gateway security.


👉 Detailed procedure: [Create RFC Connection](./step_5.0_create-rfc-connection.md)  

---

## 6. Create the Source Connection in CRESTONE  
In the CRESTONE administration panel:  
1. Navigate to **Connections**.  
2. Create a new source connection of type **SAP ABAP**.  
3. Enter the required parameters (host, client, user, password, system number, etc.).  
4. Save and test the connection.  

---

## 7. Create the Destination Connection in CRESTONE  
In the CRESTONE administration panel:  
1. Navigate to **Connections**.  
2. Create a new destinarion connection of any type (e.g., **Azure Storage**).  
3. Enter the required parameters.  
4. Save and test the connection.  

---

## 8. Create a Test Node and Job in CRESTONE  
Finally, to validate the integration:  
1. Create a **node** that uses the SAP connection previously configured.  
2. Define a **test job** (for example, extract data from a standard table such as `KNA1`).  
3. Execute the job and validate that the extraction is successful.  

---

✅ Once these steps are completed, the connection between **CRESTONE** and **SAP** will be fully configured and ready for use in data extraction and replication processes.
