---
sidebar_position: 11
iconName: "mySQL"
useBrand: true
title: "MySQL Source Connection"
description: "Create a node to extract data from a source and load it into a destination."
sidebar_label: "MySQL"
---

## Prerequisites

Before configuring the MySQL source connection in Crestone, make sure you have the following:

**Main Requirement:** An active and accessible MySQL instance, **version 5.7 or higher**, with a user that has read privileges on the target database. The following versions are fully supported:

| Version | Support |
|---------|---------|
| MySQL 5.7 | Supported |
| MySQL 8.0 | Supported (recommended) |
| MySQL 8.4 LTS | Supported (recommended) |
| MySQL 9.x Innovation | Supported |
| MariaDB | Not supported |
| Amazon Aurora MySQL | Supported (5.7-compatible and 8.0-compatible) |
| Google Cloud SQL for MySQL | Supported (5.7 and 8.0) |
| Azure Database for MySQL | Supported (5.7 and 8.0 Flexible Server) |

> **Note:** Crestone uses `mysql-connector-python` in pure-Python mode. No additional client libraries or native drivers are required on the server running Crestone.

**Required Information:**

| Field | Description |
|-------|-------------|
| **Server / Host** | IP address or hostname of the MySQL server (e.g. `192.168.1.100` or `db.example.com`) |
| **Port** | TCP port where MySQL is listening. Default is `3306`. |
| **Database** | Name of the MySQL database to connect to (e.g. `my_database`) |
| **Username** | User with read privileges on the tables you want to extract |
| **Password** | Password for the specified user |

> **Tip:** If you are connecting to a **local MySQL** instance for testing, use the following values:
> - **Server:** `localhost`
> - **Port:** `3306`
> - **Database:** `crestone_test`
> - **Username / Password:** `crestone` / `crestone123`

---

## Pre-Verification Step

Before configuring the connection in Crestone, we recommend verifying your credentials using any MySQL client of your choice (e.g. DBeaver, MySQL Workbench, TablePlus, or the `mysql` CLI). This ensures that the credentials are correct and that the server is reachable before proceeding with the setup.

> **DBeaver tip:** If you get a `Public Key Retrieval is not allowed` error when connecting with DBeaver to MySQL 8.x, go to **Driver properties** and set `allowPublicKeyRetrieval` to `true` and `useSSL` to `false`. This is a JDBC driver restriction and does not affect Crestone's connection.

---

## Configuration Steps

Follow these steps to create a new MySQL source connection in Crestone:

1. Navigate to **Connections** in the top navigation bar.
2. Select the **Source** tab.
3. Click the **+** button to create a new connection.
4. Fill in the **Connection Name** field with a descriptive name (e.g. `My MySQL Source`).
5. In the **Source Type** dropdown, select **MySQL**.
6. Complete the credentials form with the required fields:
   - **Server** — host or IP address of your MySQL instance
   - **Port** — default `3306`
   - **Database** — name of the MySQL database to connect to
   - **Username** — database user
   - **Password** — password for the user

7. Click **Test Connection** to validate that Crestone can reach the database successfully.
8. Once the test passes, click **Create Source** to save the connection.

---

## Editing an Existing Connection

To update the credentials of an existing MySQL source connection:

1. Navigate to **Connections** and find your MySQL source.
2. Click **Edit**.
3. Modify the desired fields in the credentials form.
4. Click **Test Connection** to verify the new credentials.
5. Click **Confirm** to save the changes.

---

## Using MySQL as a Source in an Extraction Node

Once the connection is created, you can use it as the source of an Extraction Node. Two extraction modes are available:

### Visual Mode

Configure the extraction without writing SQL:

1. Open or create an **Extraction Node** and go to the **Source** tab.
2. In **Select Source**, choose your MySQL connection.
3. In **Select Schema**, choose the database/schema that contains the data.
4. In **Select Table**, choose the table to extract.
5. In **Select Fields**, choose the specific columns you want, or leave empty to extract all columns.
6. Optionally add a **WHERE** condition to filter rows.
7. The **Preview** panel shows a sample of the data that will be extracted.

### SQL Script Mode

Write a custom SQL query for more complex extractions:

1. Select the source and schema as in Visual Mode.
2. Switch to **SQL Script** mode.
3. Write your SQL query. Use standard MySQL syntax — `information_schema` is available for metadata queries.
4. Click **Run Preview** to validate and preview the query results.

> **Note:** SQL Script mode supports any valid MySQL `SELECT` statement, including `JOIN`, subqueries, functions, and `GROUP BY`. Avoid DDL statements (`CREATE`, `DROP`, `ALTER`) in this field.

---

## Data Type Handling

When Crestone reads data from MySQL, column types are mapped to Polars (internal) types for processing and then mapped to the destination's native types. The mapping from MySQL to Polars is:

| MySQL type | Polars type |
|-----------|------------|
| `TINYINT`, `SMALLINT` | `Int16` |
| `INT`, `MEDIUMINT` | `Int32` |
| `BIGINT` | `Int64` |
| `FLOAT` | `Float32` |
| `DOUBLE`, `DECIMAL`, `NUMERIC` | `Float64` |
| `TINYINT(1)` | `Boolean` |
| `VARCHAR`, `CHAR`, `TEXT`, `ENUM`, `SET` | `String` |
| `DATE` | `Date` |
| `DATETIME`, `TIMESTAMP` | `Datetime` |
| `TIME` | `String` (formatted as HH:MM:SS) |
| `JSON` | `String` (serialized as text) |
| `BLOB`, `BINARY`, `VARBINARY` | `String` (hex-encoded) |
| Other | `String` |

> **Note:** `DECIMAL` and `NUMERIC` columns are mapped to `Float64`. If you need to preserve the exact decimal precision at the destination, write a custom SQL Script casting the column to `CHAR` or handling it as a string in the extraction.

---

## Common Issues

| Issue | Possible Cause | Solution |
|-------|---------------|----------|
| Connection timeout | Firewall blocking port 3306 | Allow inbound connections on port 3306 from the Crestone server IP |
| Authentication failed | Wrong username or password | Verify credentials in your MySQL client first |
| No schemas listed | User has no `SELECT` privilege on `information_schema` | Grant `SELECT` on `information_schema` or at minimum on the target database |
| No tables listed | User has no access to the selected database | Grant `SELECT` on the target database (see Required Permissions below) |
| `Public Key Retrieval is not allowed` | MySQL 8.x authentication mode (JDBC clients only) | This does not affect Crestone. In DBeaver, set `allowPublicKeyRetrieval=true` in Driver properties |
| Preview shows no data | Table is empty or WHERE condition filters all rows | Verify data exists in the table using a MySQL client |
| `caching_sha2_password` error | MySQL 8.x default auth plugin with some connectors | Crestone's connector handles this natively; verify the user's auth plugin if the issue persists |

---

## Required Permissions

For read-only access (source extraction), the database user needs at minimum the following privileges:

```sql
-- Grant read access to a specific database
GRANT SELECT ON my_database.* TO 'crestone'@'%';

FLUSH PRIVILEGES;
```

If you want the user to access multiple databases or you want Crestone to list all available schemas:

```sql
-- Grant read access to multiple databases
GRANT SELECT ON my_database.* TO 'crestone'@'%';
GRANT SELECT ON another_database.* TO 'crestone'@'%';

FLUSH PRIVILEGES;
```

> **Note:** MySQL automatically grants `SELECT` on `information_schema` to any user, so Crestone can always list schemas and tables that the user has access to. No additional grant is needed for metadata discovery.

> **Tip:** For a read-only integration user, `GRANT SELECT ON *.* TO 'crestone'@'%'` grants read access to all databases at once, which simplifies administration when extracting from multiple schemas.

```sql
-- Read-only grant across all databases (recommended for integration users):
GRANT SELECT ON *.* TO 'crestone'@'%';
FLUSH PRIVILEGES;
```
