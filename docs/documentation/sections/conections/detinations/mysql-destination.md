---
iconName: "mySQL"
useBrand: true
title: "MySQL Destination Connection"
description: "Create a connection to a MySQL database."
sidebar_label: "MySQL"
sidebar_position: 15
---

# MySQL Destination Connection

## Prerequisites

Before configuring the MySQL destination connection in Crestone, make sure you have the following:

**Main Requirement:** An active and accessible MySQL instance, **version 5.7 or higher**, with a user that has write privileges on the target database. The following versions are fully supported:

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
| **Username** | User with sufficient privileges to create schemas and write data |
| **Password** | Password for the specified user |

> **Note:** Unlike Oracle, MySQL schemas and databases are the same concept. When Crestone loads data into a schema that does not yet exist, it will attempt to create it automatically using `CREATE SCHEMA IF NOT EXISTS`. The configured user must have the `CREATE` privilege for this to work.

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

Follow these steps to create a new MySQL destination connection in Crestone:

1. Navigate to **Connections** in the top navigation bar.
2. Select the **Destination** tab.
3. Click the **+** button to create a new connection.
4. Fill in the **Connection Name** field with a descriptive name (e.g. `My MySQL DB`).
5. In the **Destination Type** dropdown, select **MySQL**.
6. Complete the credentials form with the required fields:
   - **Server** — host or IP address of your MySQL instance
   - **Port** — default `3306`
   - **Database** — name of the MySQL database to connect to
   - **Username** — database user
   - **Password** — password for the user

7. Click **Test Connection** to validate that Crestone can reach the database successfully.
8. Once the test passes, click **Create Destination** to save the connection.

---

## Editing an Existing Connection

To update the credentials of an existing MySQL destination connection:

1. Navigate to **Connections** and find your MySQL destination.
2. Click **Edit**.
3. Modify the desired fields in the credentials form.
4. Click **Test Connection** to verify the new credentials.
5. Click **Confirm** to save the changes.

---

## Using MySQL as a Destination in an Extraction Node

Once the connection is created, you can use it as the destination of an Extraction Node:

1. Open or create an **Extraction Node** and go to the **Destination** tab.
2. In **Select Destinations**, choose your MySQL connection.
3. In **Select Schema**, choose an existing schema from the list, or select **Create new schema** to have Crestone create it automatically.
4. In **Select Table**, choose an existing table or select **Create new table** to have Crestone create it automatically based on the source data structure.
5. Optionally enable **Prefers to delete existing data and then insert new data** if you want the table to be truncated before each load.
6. Continue to the **Settings** tab and save the node.

> **Note:** When you select **Create new table**, Crestone automatically infers the column types from the source data and creates the table in MySQL before inserting records. The type mapping used is:
>
> | Source type | MySQL type |
> |-------------|-----------|
> | Int8 / Int16 | `SMALLINT` |
> | Int32 | `INT` |
> | Int64 | `BIGINT` |
> | Float32 | `FLOAT` |
> | Float64 | `DOUBLE` |
> | Boolean | `TINYINT(1)` |
> | String | `TEXT` |
> | Date | `DATE` |
> | Datetime | `DATETIME` |
> | Other | `TEXT` |

> **Note:** Unlike Oracle, MySQL schemas can be created automatically. If the configured user has the `CREATE` privilege, Crestone will create the schema if it does not already exist before loading data.

---

## Common Issues

| Issue | Possible Cause | Solution |
|-------|---------------|----------|
| Connection timeout | Firewall blocking port 3306 | Allow inbound connections on port 3306 from the Crestone server IP |
| Authentication failed | Wrong username or password | Verify credentials in your MySQL client first |
| Access denied to create schema | User lacks `CREATE` privilege | Grant `CREATE` privilege to the user (see Required Permissions below) |
| `Public Key Retrieval is not allowed` | MySQL 8.x authentication mode (JDBC clients only) | This does not affect Crestone. In DBeaver, set `allowPublicKeyRetrieval=true` in Driver properties |
| Table not found | Schema or table name typo | Verify that the schema and table exist using a MySQL client |
| `caching_sha2_password` error | MySQL 8.x default auth plugin with some connectors | Crestone's connector handles this natively; verify the user's auth plugin if the issue persists |

---

## Required Permissions

The database user configured in Crestone needs at minimum the following privileges:

```sql
-- Grant access to a specific existing database
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, ALTER
  ON my_database.*
  TO 'crestone'@'%';

-- If you also want Crestone to create new schemas automatically:
GRANT CREATE ON *.* TO 'crestone'@'%';

FLUSH PRIVILEGES;
```

> **Tip:** For testing environments or when the MySQL user owns the target database, granting `ALL PRIVILEGES ON my_database.*` is the simplest approach and covers all operations Crestone may need to perform.

```sql
-- Simplest grant for a dedicated database (testing / single-tenant):
GRANT ALL PRIVILEGES ON my_database.* TO 'crestone'@'%';
FLUSH PRIVILEGES;
```
