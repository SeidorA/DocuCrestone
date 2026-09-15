---
title: IBM DB2 Source Connection
slug: db2
sidebar_label: IBM DB2
useBrand: true
iconName: "IBMDb2"
sidebar_position: 16
---

## Prerequisites

Before configuring the IBM DB2 source connection in Crestone, make sure you have the following:

**Main Requirement:** An active and accessible IBM DB2 LUW (Linux/Unix/Windows) instance with a user that has read privileges on the target database. The following versions are supported:

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
| **Database** | Name of the DB2 database to connect to (e.g. `CRESTONE`) |
| **Username** | User with read privileges on the tables you want to extract |
| **Password** | Password for the specified user |

---

## Pre-Verification Step

Before configuring the connection in Crestone, we recommend verifying your credentials using a compatible SQL client such as DBeaver or DataGrip. This ensures the server is reachable and the credentials are correct before proceeding.

> **DBeaver tip:** To connect to IBM DB2 from DBeaver, select **IBM DB2** as the driver type and choose the **DB2 LUW** variant. Use the same host, port (50000), database name, username, and password that you will enter in Crestone.

---

## Configuration Steps

Follow these steps to create a new IBM DB2 source connection in Crestone:

1. Navigate to **Connections** in the top navigation bar.
2. Select the **Source** tab.
3. Click the **+** button to create a new connection.
4. Fill in the **Connection Name** field with a descriptive name (e.g. `My DB2 Source`).
5. In the **Source Type** dropdown, select **IBM DB2**.
6. Complete the credentials form with the required fields:
   - **Server** — host or IP address of your DB2 instance
   - **Port** — default `50000`
   - **Database** — name of the DB2 database to connect to
   - **Username** — database user
   - **Password** — password for the user
7. Click **Test Connection** to validate that Crestone can reach the database successfully.
8. Once the test passes, click **Create Source** to save the connection.

---

## Editing an Existing Connection

To update the credentials of an existing IBM DB2 source connection:

1. Navigate to **Connections** and find your IBM DB2 source.
2. Click **Edit**.
3. Modify the desired fields in the credentials form.
4. Click **Test Connection** to verify the new credentials.
5. Click **Confirm** to save the changes.

---

## Using IBM DB2 as a Source in an Extraction Node

Once the connection is created, you can use it as the source of an Extraction Node. Two extraction modes are available:

### Visual Mode

Configure the extraction without writing SQL:

1. Open or create an **Extraction Node** and go to the **Source** tab.
2. In **Select Source**, choose your IBM DB2 connection.
3. In **Select Schema**, choose the schema that contains the tables you want to extract.
4. In **Select Table**, choose the table to extract.
5. In **Select Fields**, choose the specific columns you want, or leave empty to extract all columns.
6. Optionally add a **WHERE** condition to filter rows.
7. The **Preview** panel shows a sample of the data that will be extracted.

### SQL Script Mode

Write a custom SQL query for more complex extractions:

1. Select the source and schema as in Visual Mode.
2. Switch to **SQL Script** mode.
3. Write your SQL query using standard DB2 SQL syntax.
4. Click **Run Preview** to validate and preview the query results.

> **Note:** SQL Script mode supports any valid DB2 `SELECT` statement, including `JOIN`, subqueries, aggregate functions, and `GROUP BY`. Avoid DDL statements (`CREATE`, `DROP`, `ALTER`) in this field.

> **Note on row limiting:** DB2 uses `FETCH FIRST n ROWS ONLY` syntax (not `LIMIT` or `TOP`). Crestone handles this automatically in Visual Mode. If writing a custom SQL Script, use the same syntax: `SELECT * FROM schema.table FETCH FIRST 100 ROWS ONLY`.

> **Note on schemas:** In IBM DB2, schemas are logical namespaces that group database objects. A schema is identified by its name (e.g. `DB2INST1`, `CRESTONE`). Crestone lists all schemas visible in `SYSCAT.SCHEMATA`, excluding system schemas (`SYS%`, `NULLID`, `SQLJ`, `DB2GSE`, `SYSTOOLS`).

---

## Data Type Handling

When Crestone reads data from IBM DB2, column types are returned via the JDBC cursor and mapped internally to Polars types:

| DB2 type | Polars type |
|----------|-------------|
| `SMALLINT` | `Int64` |
| `INTEGER`, `INT` | `Int64` |
| `BIGINT` | `Int64` |
| `REAL` | `Float64` |
| `DOUBLE`, `FLOAT` | `Float64` |
| `DECIMAL`, `NUMERIC` | `String` (cast) |
| `CHAR`, `VARCHAR`, `CLOB` | `String` |
| `DATE` | `String` (cast) |
| `TIME` | `String` (cast) |
| `TIMESTAMP` | `String` (cast) |
| Other / unknown | `String` (cast) |

> **Note:** Non-standard Python types returned by the JDBC bridge (e.g. `java.math.BigDecimal`, `java.sql.Timestamp`) are automatically cast to string to ensure compatibility across all destination connectors.

---

## Common Issues

| Issue | Possible Cause | Solution |
|-------|---------------|----------|
| Connection timeout | Firewall blocking port 50000 | Allow inbound connections on port 50000 from the Crestone server IP |
| `Connection refused` | DB2 server not running or wrong port | Verify DB2 is running and the port is correct with your DBA |
| Authentication failed | Wrong username or password | Verify credentials using DBeaver or DataGrip |
| No schemas listed | No user schemas exist in `SYSCAT.SCHEMATA` | At least one schema must be created explicitly (see Required Permissions) |
| No tables listed for a schema | Schema exists but has no tables | Create tables in the schema or select a different schema |
| Preview shows no data | Table is empty or WHERE condition filters all rows | Verify data exists using a SQL client |
| `SQL0204N` — object not found | Wrong schema or table name (DB2 identifiers are case-sensitive in catalog) | Use uppercase schema and table names, as DB2 stores unquoted identifiers in uppercase |

---

## Required Permissions

For read-only access (source extraction), the database user needs at minimum the following privileges:

```sql
-- Grant CONNECT privilege on the database
GRANT CONNECT ON DATABASE TO USER crestone_user;

-- Grant SELECT on specific tables
GRANT SELECT ON TABLE schema_name.table_name TO USER crestone_user;

-- Or grant SELECT on all tables in a schema (requires SCHEMAADM or DBADM)
GRANT SELECT ON TABLE schema_name.* TO USER crestone_user;
```

> **Note:** To list schemas and tables in the schema discovery UI, Crestone queries `SYSCAT.SCHEMATA` and `SYSCAT.TABLES`. These catalog views are readable by any authenticated user with `CONNECT` privilege by default in DB2.
