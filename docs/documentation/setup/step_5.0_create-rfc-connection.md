# Step 5 — Create the RFC Connection in SAP

This guide shows how to set up the TCP/IP RFC destination that Crestone will use to communicate with your SAP system.

> The RFC destination provides the secure transport channel for Crestone to execute remote-enabled function modules.

---

## Prerequisites

- SAP GUI (SAP Logon) access to the target system/client.
- Technical user dedicated to Crestone integration with the role `ZCRESTONE` assigned (see Step 4).
- Hostname/IP, system number (SYSNR), client, and logon language for the SAP application server where Crestone will connect.

---

## 1) Open the RFC configuration

1. Log in to SAP with a user authorized to maintain RFC destinations.
2. Launch transaction `SM59` (RFC Destinations).
3. In the navigation tree, expand **TCP/IP Connections**.
4. Click **Create** (or use **Display/Change** → **Create**).

![alt text](/img/setup/5.1.0.4.image.png)

---

## 2) Maintain the RFC destination

Fill the tabs as follows:

**Technical Settings**
- **RFC Destination**: `CRESTONE_SERVER`.
- **Connection Type**: Select `T` (TCP/IP Connection).
- **Description**: Provide a short purpose (e.g., "Crestone integration").
- **Activation Type**: Choose `Registered Server Program`.
- **Program ID**: Set a unique identifier (e.g., `CRESTONE_SERVER`). This must match the ID configured in the Crestone connector.
- Leave **Gateway Host** and **Gateway Service** with the default values for your SAP system unless BASIS specifies otherwise.

No logon credentials are required for TCP/IP destinations. Save the destination when the fields are complete.

Click **Save** when the fields are complete.

![alt text](/img/setup/5.2.0.0.image.png)

---

## 3) Test the connection

1. With the new destination selected, choose **Connection Test**.
2. Confirm you receive status **Connection test OK**.
3. If any errors appear, verify that the Crestone connector is running and registered with the same Program ID, and confirm network/firewall settings permit the registration.

![alt text](/img/setup/5.3.0.0.image.png)


---

## 4) Configure SAP Gateway security

1. Access transaction `SMGW`.
2. Navigate to **Goto ▸ Expert Functions ▸ External Security ▸ Maintain ACL Files**.

![alt text](/img/setup/5.4.2.0.image.png)

3. In the **secinfo** file, add the standard entry that allows program `CRESTONE_SERVER` to start, specifying:
   - `TP`: `CRESTONE_SERVER`
   - `HOST`: the application server host name or `*` (per security policy)
   - `USER`: the SAP user permitted to start the program (often `*` for registered programs)

![alt text](/img/setup/5.4.3.0.image.png)

4. In the **reginfo** file, add the standard entry that allows program `CRESTONE_SERVER` to register from the connector host, for example:
   - `TP`: `CRESTONE_SERVER`
   - `HOST`: connector host/IP
   - `ACC`: `*` (permitted users/clients)

![alt text](/img/setup/5.4.3.0.image.png)

> Coordinate these ACL entries with your BASIS/security team; incorrect values can block gateway registrations or expose the gateway unnecessarily.

---

## Verification

- The RFC destination appears under **TCP/IP Connections** with a green status icon.
- Connection tests complete without errors.
- Logs in transaction `SM59` show successful registration/test timestamps.

---

## Summary

1. Create a TCP/IP RFC destination in `SM59` with connection type `T`.
2. Set the destination name and Program ID to `CRESTONE_SERVER` (or your agreed identifier).
3. Save and test the destination to confirm successful registration and connectivity.
4. Configure SAP Gateway security
