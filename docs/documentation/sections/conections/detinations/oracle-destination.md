---
iconName: "Oracle"
useBrand: true
title: " Oracle Destination"
sidebar_position: 13
sidebar_label: Oracle
---
# Oracle Destination Connection

## Prerequisites

Before configuring the Oracle destination connection in Crestone, make sure you have the following:

**Main Requirement:** An active and accessible Oracle Database instance, **version 12.1 (12c Release 1) or higher**, with a user that has write privileges on the target schema. Oracle 11g and earlier are not supported.

**Required Information:**

| Field | Description |
|-------|-------------|
| **Server / Host** | IP address or hostname of the Oracle server (e.g. `192.168.1.100` or `oracle.example.com`) |
| **Port** | TCP port where Oracle is listening. Default is `1521`. |
| **Service Name** | Oracle service name that identifies the database (e.g. `FREEPDB1`, `XE`, `ORCL`). This is **not** the SID. |
| **Username** | User with sufficient privileges to create tables and write data |
| **Password** | Password for the specified user |

> **Important:** In Oracle, a **schema and a user are the same concept**. The user configured in Crestone will load data into its own schema by default. To write into another schema, the user must have explicit `CREATE TABLE` and `INSERT` privileges on that schema.

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

Follow these steps to create a new Oracle destination connection in Crestone:

1. Navigate to **Connections** in the top navigation bar.
2. Select the **Destination** tab.
3. Click the **+** button to create a new connection.
4. Fill in the **Connection Name** field with a descriptive name (e.g. `My Oracle DB`).
5. In the **Destination Type** dropdown, select **Oracle**.
6. Complete the credentials form with the required fields:
   - **Server** — host or IP address of your Oracle instance
   - **Port** — default `1521`
   - **Service Name** — Oracle service name that identifies the database
   - **Username** — database user
   - **Password** — password for the user

7. Click **Test Connection** to validate that Crestone can reach the database successfully.
8. Once the test passes, click **Create Destination** to save the connection.

---

## Editing an Existing Connection

To update the credentials of an existing Oracle destination connection:

1. Navigate to **Connections** and find your Oracle destination.
2. Click **Edit**.
3. Modify the desired fields in the credentials form.
4. Click **Test Connection** to verify the new credentials.
5. Click **Confirm** to save the changes.

---

## Using Oracle as a Destination in an Extraction Node

Once the connection is created, you can use it as the destination of an Extraction Node:

1. Open or create an **Extraction Node** and go to the **Destination** tab.
2. In **Select Destinations**, choose your Oracle connection.
3. In **Select Schema**, choose an existing schema from the list, or select **Create new table (use connected user schema)** to load data directly into the connected user's schema.
4. In **Select Table**, choose an existing table or select **Create new table** to have Crestone create it automatically based on the source data structure.
5. Optionally enable **Prefers to delete existing data and then insert new data** if you want the table to be truncated before each load.
6. Continue to the **Settings** tab and save the node.

> **Note:** When you select **Create new table**, Crestone automatically infers the column types from the source data and creates the table in Oracle before inserting records. The type mapping used is:
>
> | Source type | Oracle type |
> |-------------|------------|
> | Int8 / Int16 | `NUMBER(5)` |
> | Int32 | `NUMBER(10)` |
> | Int64 | `NUMBER(19)` |
> | Float32 | `BINARY_FLOAT` |
> | Float64 | `BINARY_DOUBLE` |
> | Boolean | `NUMBER(1)` |
> | String | `VARCHAR2(4000)` |
> | Date | `DATE` |
> | Datetime | `TIMESTAMP` |

> **Important:** Oracle schemas cannot be created automatically — they are tied to database users. If you need to load data into a schema that does not yet exist, ask your DBA to create the corresponding Oracle user first.

---

## Common Issues

| Issue | Possible Cause | Solution |
|-------|---------------|----------|
| Connection timeout | Firewall blocking port 1521 | Allow inbound connections on port 1521 from the Crestone server IP |
| Authentication failed | Wrong username or password | Verify credentials in your Oracle client first |
| Service name not found | Incorrect service name | Use `lsnrctl status` on the DB server to list available services |
| ORA-01031: insufficient privileges | User cannot create tables in target schema | Grant `CREATE TABLE` privilege to the user, or load into the user's own schema |
| ORA-00955: name is already used | Table already exists with a conflicting definition | Enable **delete existing data** or drop and recreate the table manually |
| Schema not listed | User does not have visibility on other schemas | Use the connected user's own schema, or grant access to the target schema |

---

## Required Permissions

The database user configured in Crestone needs at minimum the following privileges:

```sql
-- Allow connection (granted by default when user is created)
GRANT CREATE SESSION TO crestone;

-- Allow table creation in the user's own schema
GRANT CREATE TABLE TO crestone;

-- Allow sufficient quota to write data
ALTER USER crestone QUOTA UNLIMITED ON USERS;

-- To write into another user's schema, additional grants are required (run as DBA):
GRANT CREATE ANY TABLE TO crestone;
GRANT INSERT ANY TABLE TO crestone;
GRANT DELETE ANY TABLE TO crestone;
```

> **Tip:** If the Oracle user configured in Crestone owns the schema where data will be loaded (i.e., the username and schema name are the same), only `CREATE SESSION`, `CREATE TABLE`, and tablespace quota are needed — no additional grants required.
