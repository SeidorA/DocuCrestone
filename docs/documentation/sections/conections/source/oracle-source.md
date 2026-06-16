---
sidebar_position: 12
iconName: "Oracle"
useBrand: true
title: "Oracle Source Connection"
description: "Create a node to extract data from a source and load it into a destination."
sidebar_label: "Oracle"
---

## Prerequisites

Before configuring the Oracle source connection in Crestone, make sure you have the following:

**Main Requirement:** An active and accessible Oracle Database instance, **version 12.1 (12c Release 1) or higher**, hosted locally, remotely, or through a cloud provider (such as Oracle Cloud Infrastructure, Amazon RDS for Oracle, or Azure). Oracle 11g and earlier are not supported.

**Required Information:**

| Field | Description |
|-------|-------------|
| **Server / Host** | IP address or hostname of the Oracle server (e.g. `192.168.1.100` or `oracle.example.com`) |
| **Port** | TCP port where Oracle is listening. Default is `1521`. |
| **Service Name** | Oracle service name that identifies the database (e.g. `FREEPDB1`, `XE`, `ORCL`). This is **not** the SID. |
| **Username** | User with sufficient privileges to read data (e.g. `crestone`) |
| **Password** | Password for the specified user |

> **Note:** Crestone connects to Oracle using the **Service Name** (not the SID). If you only know the SID, check with your DBA to get the corresponding service name, or use `lsnrctl status` on the database server to list available services.

> **Tip:** If you are connecting to an **Oracle Free** instance (local testing), use the following values:
> - **Server:** `localhost`
> - **Port:** `1521`
> - **Service Name:** `FREEPDB1`
> - **Username / Password:** credentials of the schema user (e.g. `crestone` / `crestone123`)

---

## Pre-Verification Step

Before configuring the connection in Crestone, we recommend verifying your credentials using any Oracle client of your choice (e.g. SQL Developer, DBeaver, SQLcl). This ensures that the credentials are correct and that the server is reachable before proceeding with the setup.

---

## Configuration Steps

Follow these steps to create a new Oracle source connection in Crestone:

1. Navigate to **Connections** in the top navigation bar.
2. Select the **Source** tab.
3. Click the **+** button to create a new connection.
4. Fill in the **Connection Name** field with a descriptive name (e.g. `My Oracle Source`).
5. In the **Source Type** dropdown, select **Oracle**.
6. Complete the credentials form with the required fields:
   - **Server** — host or IP address of your Oracle instance
   - **Port** — default `1521`
   - **Service Name** — Oracle service name that identifies the database
   - **Username** — database user
   - **Password** — password for the user

7. Click **Test Connection** to validate that Crestone can reach the database successfully.
8. Once the test passes, click **Create Source** to save the connection.

---

## Editing an Existing Connection

To update the credentials of an existing Oracle source connection:

1. Navigate to **Connections** and find your Oracle source.
2. Click **Edit**.
3. Modify the desired fields in the credentials form.
4. Click **Test Connection** to verify the new credentials.
5. Click **Confirm** to save the changes.

---

## Using Oracle as a Source in an Extraction Node

Once the connection is created, you can use it as the source of an Extraction Node:

1. Open or create an **Extraction Node** and go to the **Source** tab.
2. In **Select Source**, choose your Oracle connection.
3. In **Select Schema**, choose the schema (Oracle user) that contains the target table.
4. Choose your extraction mode:

### Visual Mode

5. In **Select Table**, choose the table to extract data from.
6. In **Maps Fields**, select the columns you want to include in the extraction. You can select all or a subset.
7. Optionally configure a **WHERE** clause to filter rows at extraction time.

### SQL Script Mode

5. Enable the **SQL Script mode** toggle.
6. Write your custom SQL query in the editor. You can use `JOIN`, `WHERE`, subqueries, and any valid Oracle SQL syntax.

> **Note:** SQL Script mode is useful when you need to combine multiple tables, apply transformations, or filter data with complex conditions before loading it to the destination.

7. Continue to the **Destination** tab to configure where the extracted data will be sent.

---

## Data Type Handling

Crestone extracts data from Oracle using `python-oracledb` in thin mode (no Oracle Instant Client required). Standard types (`NUMBER`, `FLOAT`, `DATE`, `TIMESTAMP`) are preserved as-is. Columns with complex types such as `CLOB`, `BLOB`, `RAW`, `XMLTYPE`, or user-defined types are automatically converted to text during extraction.

---

## Common Issues

| Issue | Possible Cause | Solution |
|-------|---------------|----------|
| Connection timeout | Firewall blocking port 1521 | Allow inbound connections on port 1521 from the Crestone server IP |
| Authentication failed | Wrong username or password | Verify credentials in your Oracle client first |
| Service name not found | Incorrect service name | Use `lsnrctl status` on the DB server to list available services |
| ORA-01017: invalid username/password | Credentials are wrong or user is locked | Verify credentials and check if the user account is active |
| No tables visible | User lacks privileges on the schema | Grant `SELECT` on the target tables to the configured user |
| ORA-00942: table or view does not exist | User cannot see the table | Grant `SELECT` on the table or query `ALL_TABLES` to check visibility |

---

## Required Permissions

The database user configured in Crestone needs at minimum the following privileges on the source database:

```sql
-- Allow connection (granted by default when user is created)
GRANT CREATE SESSION TO crestone;

-- Allow reading data from a specific schema
GRANT SELECT ON owner_schema.table_name TO crestone;

-- Or grant SELECT on all tables in a schema (run as the schema owner)
BEGIN
  FOR t IN (SELECT table_name FROM all_tables WHERE owner = 'OWNER_SCHEMA') LOOP
    EXECUTE IMMEDIATE 'GRANT SELECT ON OWNER_SCHEMA.' || t.table_name || ' TO crestone';
  END LOOP;
END;
/
```

> **Tip:** If the Oracle user configured in Crestone owns the schema (i.e., the username and schema name are the same), it already has full access to its own tables and no additional grants are needed.
