---
title: IBM DB2 Destination Connection
slug: "db2"
sidebar_label: IBM DB2
useBrand: true
iconName: "IBMDb2"
sidebar_position: 18
---

## Prerequisites

Before configuring the IBM DB2 destination connection in Crestone, make sure you have the following:

**Main Requirement:** An active and accessible IBM DB2 LUW (Linux/Unix/Windows) instance with a user that has write privileges on the target database. The following versions are supported:

| Version | Support |
|---------|---------|
| DB2 LUW 9.7 | Supported |
| DB2 LUW 10.1 | Supported |
| DB2 LUW 10.5 | Supported |
| DB2 LUW 11.1 | Supported |
| DB2 LUW 11.5 | Supported (recommended, tested) |
| DB2 for z/OS (mainframe) | Not supported |
| DB2 for i (AS/400 / IBM i) | Not supported |

> **Note:** Crestone connects to IBM DB2 using **jaydebeapi** with the IBM JDBC driver (`db2jcc4.jar` version 11.5.8.0). No DB2 client software or IBM Data Server Client is required on the Crestone server.

**Required Information:**

| Field | Description |
|-------|-------------|
| **Server / Host** | IP address or hostname of the DB2 server (e.g. `192.168.1.100` or `db2.example.com`) |
| **Port** | TCP port where DB2 is listening. Default is `50000`. |
| **Database** | Name of the DB2 database where data will be loaded (e.g. `CRESTONE`) |
| **Username** | User with `CREATE TABLE`, `INSERT`, `DELETE`, and `SELECT` privileges |
| **Password** | Password for the specified user |

> **Important:** In IBM DB2, **schemas must be created explicitly before use**. Unlike MySQL or PostgreSQL, DB2 does not create schemas automatically when you first insert data. The schema selected in the Extraction Node must already exist in the database. Contact your DBA to create it if needed (see Required Permissions).

---

## Pre-Verification Step

Before configuring the connection in Crestone, we recommend verifying your credentials using a compatible SQL client such as DBeaver or DataGrip. This ensures the server is reachable and the credentials are correct before proceeding.

---

## Configuration Steps

Follow these steps to create a new IBM DB2 destination connection in Crestone:

1. Navigate to **Connections** in the top navigation bar.
2. Select the **Destination** tab.
3. Click the **+** button to create a new connection.
4. Fill in the **Connection Name** field with a descriptive name (e.g. `My DB2 Destination`).
5. In the **Destination Type** dropdown, select **IBM DB2**.
6. Complete the credentials form with the required fields:
   - **Server** — host or IP address of your DB2 instance
   - **Port** — default `50000`
   - **Database** — name of the DB2 database where data will be loaded
   - **Username** — database user with write privileges
   - **Password** — password for the user
7. Click **Test Connection** to validate that Crestone can reach the database successfully.
8. Once the test passes, click **Create Destination** to save the connection.

---

## Editing an Existing Connection

To update the credentials of an existing IBM DB2 destination connection:

1. Navigate to **Connections** and find your IBM DB2 destination.
2. Click **Edit**.
3. Modify the desired fields in the credentials form.
4. Click **Test Connection** to verify the new credentials.
5. Click **Confirm** to save the changes.

---

## Using IBM DB2 as a Destination in an Extraction Node

Once the connection is created, you can use it as the destination of an Extraction Node:

1. Open or create an **Extraction Node** and go to the **Destination** tab.
2. In **Select Destinations**, choose your IBM DB2 connection.
3. In **Select Schema**, choose an existing schema from the list.
4. In **Select Table**, choose an existing table or select **Create new table** to have Crestone create it automatically based on the source data structure.
5. Optionally enable **Prefers to delete existing data and then insert new data** if you want the table to be truncated before each load.
6. Continue to the **Settings** tab and save the node.

> **Note on schemas:** The schema list shows all non-system schemas defined in the connected DB2 database (`SYSCAT.SCHEMATA`, excluding `SYS%`, `NULLID`, `SQLJ`, `DB2GSE`, `SYSTOOLS`). If the schema you need is not listed, ask your DBA to create it (see Required Permissions).

> **Note:** When you select **Create new table**, Crestone automatically infers the column types from the source data and issues a `CREATE TABLE` statement before inserting records. Column names from the source are sanitized to be valid DB2 identifiers (alphanumeric and underscore only, uppercased). The type mapping used is:
>
> | Polars source type | DB2 type created |
> |-------------------|-----------------|
> | `Int8`, `Int16` | `SMALLINT` |
> | `Int32` | `INTEGER` |
> | `Int64` | `BIGINT` |
> | `Float32` | `REAL` |
> | `Float64` | `DOUBLE` |
> | `Boolean` | `SMALLINT` |
> | `Date` | `DATE` |
> | `Datetime` | `TIMESTAMP` |
> | `String` and other | `VARCHAR(512)` |

---

## Column Name Sanitization

IBM DB2 has strict identifier rules. Crestone automatically sanitizes column names from the source before creating or inserting into DB2 tables:

- All non-alphanumeric characters (spaces, `/`, `-`, `.`, etc.) are replaced with `_`
- Leading underscores or digits are removed or prefixed with `C_`
- All names are uppercased
- Duplicate names after sanitization are deduplicated with a numeric suffix (e.g. `NAME_1`, `NAME_2`)

For example:

| Source column name | DB2 column name |
|-------------------|----------------|
| `/BIC/MY_FIELD` | `BIC_MY_FIELD` |
| `Sales Amount` | `SALES_AMOUNT` |
| `2024_value` | `C_2024_VALUE` |
| `Total/Net` | `TOTAL_NET` |

> **Note:** The sanitized column names are what will appear in the DB2 table. If you are joining this table with other systems, make sure to reference the sanitized names.

---

## Common Issues

| Issue | Possible Cause | Solution |
|-------|---------------|----------|
| Connection timeout | Firewall blocking port 50000 | Allow inbound connections on port 50000 from the Crestone server IP |
| `Connection refused` | DB2 server not running or wrong port | Verify DB2 is running and the port is correct with your DBA |
| Authentication failed | Wrong username or password | Verify credentials using DBeaver or DataGrip |
| No schemas listed | No user schemas in `SYSCAT.SCHEMATA` | Create at least one schema explicitly (see Required Permissions) |
| `SQL0204N` — schema not found | Schema does not exist in the database | Create the schema explicitly before using it as a destination (see Required Permissions) |
| `SQL0551N` — insufficient privilege | User lacks `CREATE TABLE` or `INSERT` | Grant required privileges (see Required Permissions) |
| `SQL0803N` — duplicate key | Table already has a unique constraint and data conflicts | Disable or drop the unique constraint, or enable the delete-before-insert option |
| Data loaded but column names differ from source | Column name sanitization applied | Expected behavior — see Column Name Sanitization section above |

---

## Required Permissions

The database user configured in Crestone needs at minimum the following privileges to load data as a destination:

```sql
-- Grant CONNECT privilege on the database
GRANT CONNECT ON DATABASE TO USER crestone_user;

-- Grant CREATETAB to allow the user to create tables in their own schema
GRANT CREATETAB ON DATABASE TO USER crestone_user;

-- Grant INSERT, SELECT, DELETE on existing tables
GRANT INSERT, SELECT, DELETE ON TABLE schema_name.table_name TO USER crestone_user;
```

> **Note:** A DB2 user can only create tables within a schema they own or have been granted `CREATEIN` on. By default, a user can create tables in a schema with the same name as their username (e.g. user `crestone_user` can create tables in schema `CRESTONE_USER`).

> **Important:** Crestone **does not create schemas automatically**. The schema selected in the Extraction Node must already exist in the database. Ask your DBA to run:
>
> ```sql
> -- Create a schema and assign it to a user
> CREATE SCHEMA schema_name AUTHORIZATION user_name;
>
> -- Example: create schema DB2INST1 owned by user db2inst1
> CREATE SCHEMA DB2INST1 AUTHORIZATION DB2INST1;
> ```
>
> To grant another user the ability to create tables inside an existing schema:
>
> ```sql
> GRANT CREATEIN ON SCHEMA schema_name TO USER crestone_user;
> GRANT ALTERIN ON SCHEMA schema_name TO USER crestone_user;
> GRANT DROPIN ON SCHEMA schema_name TO USER crestone_user;
> ```
