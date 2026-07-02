---
title: Sybase Source Connection
slug: sybase
sidebar_label: Sybase
useBrand: true
iconName: "Sybase"
sidebar_position: 15
---

# SAP ASE (Sybase) Source Connection

## Prerequisites

Before configuring the SAP ASE source connection in Crestone, make sure you have the following:

**Main Requirement:** An active and accessible SAP ASE (Sybase) instance, **version 12.5.1 or higher**, with a user that has read privileges on the target database. The following versions are fully supported:

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
| **Database** | Name of the ASE database to connect to (e.g. `my_database`) |
| **Username** | User with read privileges on the tables you want to extract |
| **Password** | Password for the specified user |

---

## Pre-Verification Step

Before configuring the connection in Crestone, we recommend verifying your credentials using a compatible SQL client such as DBeaver, DataGrip, or the `isql` CLI (part of FreeTDS). This ensures that the server is reachable and the credentials are correct before proceeding.

> **DBeaver tip:** To connect to SAP ASE from DBeaver, select **Sybase ASE** as the driver type. Make sure the TDS version is set to `5.0` in the advanced driver properties. DBeaver uses a JDBC driver for Sybase (jTDS or the Sybase JDBC driver), while Crestone uses FreeTDS/ODBC — both use TDS 5.0 and should behave consistently for credential validation.

---

## Configuration Steps

Follow these steps to create a new SAP ASE source connection in Crestone:

1. Navigate to **Connections** in the top navigation bar.
2. Select the **Source** tab.
3. Click the **+** button to create a new connection.
4. Fill in the **Connection Name** field with a descriptive name (e.g. `My Sybase Source`).
5. In the **Source Type** dropdown, select **SAP ASE (Sybase)**.
6. Complete the credentials form with the required fields:
   - **Server** — host or IP address of your ASE instance
   - **Port** — default `5000`
   - **Database** — name of the ASE database to connect to
   - **Username** — database user
   - **Password** — password for the user
7. Click **Test Connection** to validate that Crestone can reach the database successfully.
8. Once the test passes, click **Create Source** to save the connection.

---

## Editing an Existing Connection

To update the credentials of an existing SAP ASE source connection:

1. Navigate to **Connections** and find your SAP ASE source.
2. Click **Edit**.
3. Modify the desired fields in the credentials form.
4. Click **Test Connection** to verify the new credentials.
5. Click **Confirm** to save the changes.

---

## Using SAP ASE as a Source in an Extraction Node

Once the connection is created, you can use it as the source of an Extraction Node. Two extraction modes are available:

### Visual Mode

Configure the extraction without writing SQL:

1. Open or create an **Extraction Node** and go to the **Source** tab.
2. In **Select Source**, choose your SAP ASE connection.
3. In **Select Schema**, choose the schema (database user) that owns the tables you want to extract.
4. In **Select Table**, choose the table to extract.
5. In **Select Fields**, choose the specific columns you want, or leave empty to extract all columns.
6. Optionally add a **WHERE** condition to filter rows.
7. The **Preview** panel shows a sample of the data that will be extracted.

### SQL Script Mode

Write a custom SQL query for more complex extractions:

1. Select the source and schema as in Visual Mode.
2. Switch to **SQL Script** mode.
3. Write your SQL query using standard Sybase ASE T-SQL syntax.
4. Click **Run Preview** to validate and preview the query results.

> **Note:** SQL Script mode supports any valid ASE `SELECT` statement, including `JOIN`, subqueries, aggregate functions, and `GROUP BY`. Avoid DDL statements (`CREATE`, `DROP`, `ALTER`) in this field.

> **Note on schemas:** In SAP ASE, schemas correspond to **database users**. A schema named `dbo` is the default schema owned by the DBA. User-created schemas (e.g. `crestone`) correspond to database users with the same name. Crestone lists all users in the connected database that are available as schemas.

---

## Data Type Handling

When Crestone reads data from SAP ASE, column types are returned via the ODBC cursor and mapped internally to Polars types. Because pyodbc/FreeTDS returns Python native types, the mapping is determined at runtime based on the values:

| ASE type | Python type returned | Polars type |
|----------|---------------------|-------------|
| `TINYINT`, `SMALLINT` | `int` | `Int64` |
| `INT`, `INTEGER` | `int` | `Int64` |
| `BIGINT` | `int` | `Int64` |
| `REAL`, `FLOAT` | `float` | `Float64` |
| `DOUBLE PRECISION` | `float` | `Float64` |
| `NUMERIC`, `DECIMAL` | `Decimal` (cast to `str`) | `String` |
| `CHAR`, `VARCHAR`, `TEXT` | `str` | `String` |
| `DATETIME`, `SMALLDATETIME` | `datetime` (cast to `str`) | `String` |
| `DATE` | `date` (cast to `str`) | `String` |
| `BIT` | `bool` | `Boolean` |
| Other / unknown | cast to `str` | `String` |

> **Note:** Non-standard Python types (e.g. `Decimal`, `datetime`) are automatically cast to string to ensure compatibility across all destination connectors. If you need numeric precision preserved, consider casting in your SQL Script query.

---

## Common Issues

| Issue | Possible Cause | Solution |
|-------|---------------|----------|
| Connection timeout | Firewall blocking port 5000 | Allow inbound connections on port 5000 from the Crestone server IP |
| `Adaptive Server is unavailable or does not exist` | Wrong host, port, or server name | Verify the host and port with your DBA; ensure the ASE server is running |
| Authentication failed | Wrong username or password | Verify credentials using a SQL client (DBeaver, `isql`) |
| No schemas listed | User has no visible users in `sysusers` | Verify the user has at least `SELECT` on system tables; contact your DBA |
| No tables listed for a schema | Schema user owns no tables in that database | Select a different schema, or use SQL Script mode to query across schemas |
| `Can't open lib 'FreeTDS'` | FreeTDS driver not installed | This is a server-side issue; contact your Crestone administrator |
| Preview shows no data | Table is empty or WHERE condition filters all rows | Verify data exists using a SQL client |
| Column names with special characters | Source columns contain `/`, spaces, or non-ASCII characters | Crestone automatically sanitizes column names; the original names may differ in the destination |

---

## Required Permissions

For read-only access (source extraction), the database user needs at minimum the following privileges:

```sql
-- Grant SELECT on all tables owned by a specific user/schema
GRANT SELECT ON dbo.my_table TO crestone_user
GO

-- Or grant SELECT on all tables in the database (requires DBA or resource role)
GRANT SELECT ON ALL TO crestone_user
GO
```

> **Note:** In SAP ASE, `SELECT` permission is granted per table or per user. There is no equivalent of `GRANT SELECT ON *.* TO user` as in MySQL. Ask your DBA to grant `SELECT` on the specific tables you need to extract, or assign the user to a group with the appropriate permissions.

> **Note:** To list schemas (users) and tables in the schema discovery UI, Crestone queries the `sysusers` and `sysobjects` system tables. These are readable by any authenticated user by default in ASE.
