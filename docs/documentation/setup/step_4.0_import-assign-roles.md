# Step 4 — Import and Assign Crestone SAP Role

This guide walks through importing the standard **ZCRESTONE** authorization role delivered with the installer and assigning it to the technical user created in Step 3.

> The role grants the SAP authorizations required for Crestone to execute remote function calls securely.

---

## Prerequisites

- SAP GUI (SAP Logon) access to the target system/client.
- A technical user already created for Crestone integration (see Step 3 of the setup guide).
- Authorization to maintain roles (`PFCG`) and users (`SU01`).

---

## 1) Download the Crestone role file

1. Click to download the role export: [`ZCRESTONE.SAP`](/files/ZCRESTONE.SAP).
2. Save the file locally without renaming it.

---

## 2) Import the role into SAP

1. Launch **SAP Logon** and sign in to the target client.
2. Open transaction `PFCG` (Role Maintenance).
3. In the command field, enter the role name `ZCRESTONE` and press **Enter**.
4. From the menu, choose **Role ▸ Upload**.
5. In the upload dialog:
   - Choose **From File** and browse to the downloaded `ZCRESTONE.SAP` file.
   - Confirm the upload.
6. When prompted, allow the system to overwrite/create objects. The role will populate with the delivered authorizations.
7. Click **Save** to store the role in the system.

> If the role already exists, upload will overwrite it with the delivered version. Review changes with your BASIS/security team as needed.

---

## 3) Assign the role to the Crestone user

1. Still in transaction `PFCG`, click **User** (or switch to transaction `SU01`).
2. Locate the technical user created in Step 3 (e.g., `ZCRESTONE_INT`).
3. Add role `ZCRESTONE` to the user’s **Roles** tab.
4. Press **Save**, and then **User Comparison ▸ Complete Comparison** to activate the authorizations.

---

## Verification

- In `PFCG`, open role `ZCRESTONE` and confirm the authorization status is **green**.
- In `SU01`, display the user and verify `ZCRESTONE` appears in the **Roles** tab with current validity dates.
- Optionally execute a basic RFC call (as described in later steps) to ensure the role grants the required access.

---

## Summary

1. Download `ZCRESTONE.SAP` from the installer package.
2. Upload the role in transaction `PFCG` via **Role ▸ Upload**.
3. Assign `ZCRESTONE` to the Crestone technical user and run a user comparison.
