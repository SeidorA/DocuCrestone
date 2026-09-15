---
title: SAP ASE (Sybase) Destination Connection
slug: "sybase"
sidebar_label: SAP ASE
useBrand: true
iconName: "Sybase"
sidebar_position: 18
---
# SAP ASE (Sybase) Destination Connection

## Prerequisites

Before configuring the SAP ASE destination connection in Crestone, make sure you have the following:

**Main Requirement:** An active and accessible SAP ASE (Sybase) instance, **version 12.5.1 or higher**, with a user that has write privileges on the target database. The following versions are fully supported:

| Version | Support |
|---------|---------|
| SAP ASE 12.5.x (< 12.5.1) | Not supported (`SELECT TOP` not available) |
| SAP ASE 12.5.1+ | Supported |
| SAP ASE 15.x | Supported (recommended) |
| SAP ASE 16.x | Supported (recommended, tested) |
| SAP IQ (Sybase IQ) | Not supported (different engine and protocol) |
| SAP SQL Anywhere | Not supported (different engine) |

> **Note:** Crestone connects to SAP ASE using `pyodbc` with the **FreeTDS** open-source driver (TDS protocol version 5.0). No SAP-licensed ODBC driver is required on the Crestone server.

**Required Information:**

| Field | Description |
|-------|-------------|
| **Server / Host** | IP address or hostname of the ASE server (e.g. `192.168.1.100` or `ase.example.com`) |
| **Port** | TCP port where ASE is listening. Default is `5000`. |
| **Database** | Name of the ASE database where data will be loaded (e.g. `my_database`) |
| **Username** | User with `CREATE TABLE`, `INSERT`, `DELETE`, and `SELECT` privileges |
| **Password** | Password for the specified user |

> **Important:** In SAP ASE, **schemas correspond to database users**. Crestone loads data into tables owned by the configured user (e.g. `crestone_user.my_table`). Unlike MySQL or PostgreSQL, ASE does **not** create schemas automatically — the schema (user) must already exist in the database before using it as a destination. Contact your DBA to create the user if needed.

---

## Pre-Verification Step

Before configuring the connection in Crestone, we recommend verifying your credentials using a compatible SQL client such as DBeaver, DataGrip, or the `isql` CLI (part of FreeTDS). This ensures that the server is reachable and the credentials are correct before proceeding.

---

## Configuration Steps

Follow these steps to create a new SAP ASE destination connection in Crestone:

1. Navigate to **Connections** in the top navigation bar.
2. Select the **Destination** tab.
3. Click the **+** button to create a new connection.
4. Fill in the **Connection Name** field with a descriptive name (e.g. `My Sybase Destination`).
5. In the **Destination Type** dropdown, select **SAP ASE (Sybase)**.
6. Complete the credentials form with the required fields:
   - **Server** — host or IP address of your ASE instance
   - **Port** — default `5000`
   - **Database** — name of the ASE database where data will be loaded
   - **Username** — database user with write privileges
   - **Password** — password for the user
7. Click **Test Connection** to validate that Crestone can reach the database successfully.
8. Once the test passes, click **Create Destination** to save the connection.

---

## Editing an Existing Connection

To update the credentials of an existing SAP ASE destination connection:

1. Navigate to **Connections** and find your SAP ASE destination.
2. Click **Edit**.
3. Modify the desired fields in the credentials form.
4. Click **Test Connection** to verify the new credentials.
5. Click **Confirm** to save the changes.

---

## Using SAP ASE as a Destination in an Extraction Node

Once the connection is created, you can use it as the destination of an Extraction Node:

1. Open or create an **Extraction Node** and go to the **Destination** tab.
2. In **Select Destinations**, choose your SAP ASE connection.
3. In **Select Schema**, choose an existing schema (database user) from the list.
4. In **Select Table**, choose an existing table or select **Create new table** to have Crestone create it automatically based on the source data structure.
5. Optionally enable **Prefers to delete existing data and then insert new data** if you want the table to be truncated before each load.
6. Continue to the **Settings** tab and save the node.

> **Note on schemas:** The schema list shows all database users defined in the connected ASE database. Crestone will write data to tables owned by the selected schema user. If the schema you need is not listed, ask your DBA to create the corresponding database user and grant it the appropriate permissions.

> **Note:** When you select **Create new table**, Crestone automatically infers the column types from the source data and issues a `CREATE TABLE` statement before inserting records. Column names from the source are sanitized to be valid ASE identifiers (alphanumeric and underscore only, uppercased). The type mapping used is:
>
> | Polars source type | ASE type created |
> |-------------------|-----------------|
> | `Int8`, `Int16` | `SMALLINT` |
> | `Int32` | `INT` |
> | `Int64` | `BIGINT` |
> | `Float32` | `REAL` |
> | `Float64` | `FLOAT` |
> | `Boolean` | `TINYINT` |
> | `Date` | `DATETIME` |
> | `Datetime` | `DATETIME` |
> | `String` and other | `VARCHAR(255)` |

---

## Column Name Sanitization

SAP ASE has strict identifier rules. Crestone automatically sanitizes column names from the source before creating or inserting into ASE tables:

- All non-alphanumeric characters (spaces, `/`, `-`, `.`, etc.) are replaced with `_`
- Leading underscores or digits are removed or prefixed with `C_`
- All names are uppercased
- Duplicate names after sanitization are deduplicated with a numeric suffix (e.g. `NAME_1`, `NAME_2`)

For example:
| Source column name | ASE column name |
|-------------------|----------------|
| `/BIC/MY_FIELD` | `BIC_MY_FIELD` |
| `Sales Amount` | `SALES_AMOUNT` |
| `2024_value` | `C_2024_VALUE` |
| `Total/Net` | `TOTAL_NET` |

> **Note:** The sanitized column names are what will appear in the ASE table. If you are joining this table with other systems, make sure to reference the sanitized names.

---

## Common Issues

| Issue | Possible Cause | Solution |
|-------|---------------|----------|
| Connection timeout | Firewall blocking port 5000 | Allow inbound connections on port 5000 from the Crestone server IP |
| `Adaptive Server is unavailable or does not exist` | Wrong host, port, or server name | Verify the host and port with your DBA; ensure the ASE server is running |
| Authentication failed | Wrong username or password | Verify credentials using a SQL client (DBeaver, `isql`) |
| No schemas listed | No valid database users in `sysusers` | Ask your DBA to create a database user to use as a schema |
| `Permission denied` on `CREATE TABLE` | User lacks DDL privileges | Grant `CREATE TABLE` to the user (see Required Permissions) |
| `Permission denied` on `INSERT` | User lacks DML privileges on the target table | Grant `INSERT` on the table or schema (see Required Permissions) |
| `Incorrect syntax near ...` | Unexpected character in table or schema name | Avoid special characters in schema/table names; use alphanumeric and underscore only |
| `Can't open lib 'FreeTDS'` | FreeTDS driver not installed | This is a server-side issue; contact your Crestone administrator |
| Data loaded but column names differ from source | Column name sanitization applied | Expected behavior — see Column Name Sanitization section above |

---

## Required Permissions

The database user configured in Crestone needs at minimum the following privileges to load data as a destination:

```sql
-- Allow the user to create tables in their own schema (default in ASE for the schema owner)
-- The user automatically owns objects they create, so no additional grant is needed
-- for CREATE TABLE within their own schema.

-- Grant INSERT, SELECT, DELETE on the destination database to the user:
GRANT INSERT, SELECT, DELETE ON my_table TO crestone_user
GO

-- If the user needs to create tables in another user's schema:
GRANT CREATE TABLE TO crestone_user
GO
```

> **Note:** In SAP ASE, a database user automatically has the right to create tables **within their own schema** (i.e. tables they own). No additional grant is needed as long as the destination schema matches the username configured in Crestone. For example, if the username is `crestone_user`, Crestone will write to `crestone_user.my_table` by default.

> **Important:** Crestone **does not create schemas (database users) automatically**. The schema selected in the Extraction Node must already exist as a database user in ASE. Ask your DBA to run:
>
> ```sql
> -- Create a new database user (schema) in ASE
> USE my_database
> GO
> sp_adduser 'crestone_user', 'crestone_user', 'null'
> GO
> ```
>
> The user must also exist as a login in the ASE server:
>
> ```sql
> -- Create the login at server level first
> sp_addlogin 'crestone_user', 'strong_password'
> GO
>
> -- Then add to the target database
> USE my_database
> GO
> sp_adduser 'crestone_user'
> GO
> ```
