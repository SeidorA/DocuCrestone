---
iconName: "PostgreSQL"
useBrand: true
title: "PostgreSQL Source Connection"
description: "Create a connection to a PostgreSQL database."
sidebar_label: "PostgreSQL"
sidebar_position: 12
---

# PostgreSQL Source Connection

## Prerequisites

Before configuring the PostgreSQL source connection in Crestone, make sure you have the following:

**Main Requirement:** An active and accessible PostgreSQL database, **version 9.x or higher**, hosted locally, remotely, or through a cloud provider (such as Supabase, Amazon RDS, Azure Database for PostgreSQL, or Google Cloud SQL). PostgreSQL 12 or higher is recommended for production environments.

**Required Information:**

| Field | Description |
|-------|-------------|
| **Server / Host** | IP address or hostname of the PostgreSQL server (e.g. `192.168.1.100` or `db.example.com`) |
| **Port** | TCP port where PostgreSQL is listening. Default is `5432`. |
| **Database** | Exact name of the database to connect to (e.g. `postgres`, `my_database`) |
| **Username** | User with sufficient privileges to read data (e.g. `postgres`) |
| **Password** | Password for the specified user |

> **Tip:** If you are connecting to a **Supabase** instance, use the following values:
> - **Server:** `db.<project-ref>.supabase.co`
> - **Port:** `5432` (direct connection, recommended)
> - **Database:** `postgres`
> - **Username:** `postgres`
> - **Password:** the password you set when creating the project

---

## Pre-Verification Step

Before configuring the connection in Crestone, we recommend verifying your credentials using any PostgreSQL client of your choice (e.g. pgAdmin, DBeaver, psql, TablePlus). This ensures that the credentials are correct and that the server is reachable before proceeding with the setup.

---

## Configuration Steps

Follow these steps to create a new PostgreSQL source connection in Crestone:

1. Navigate to **Connections** in the top navigation bar.
2. Select the **Source** tab.
3. Click the **+** button to create a new connection.
4. Fill in the **Connection Name** field with a descriptive name (e.g. `My PostgreSQL Source`).
5. In the **Source Type** dropdown, select **PostgreSQL**.
6. Complete the credentials form with the required fields:
   - **Server** — host or IP address of your PostgreSQL instance
   - **Port** — default `5432`
   - **Database** — name of the source database
   - **Username** — database user
   - **Password** — password for the user

7. Click **Test Connection** to validate that Crestone can reach the database successfully.
8. Once the test passes, click **Create Source** to save the connection.

---

## Editing an Existing Connection

To update the credentials of an existing PostgreSQL source connection:

1. Navigate to **Connections** and find your PostgreSQL source.
2. Click **Edit**.
3. Modify the desired fields in the credentials form.
4. Click **Test Connection** to verify the new credentials.
5. Click **Confirm** to save the changes.

---

## Using PostgreSQL as a Source in an Extraction Node

Once the connection is created, you can use it as the source of an Extraction Node:

1. Open or create an **Extraction Node** and go to the **Source** tab.
2. In **Select Source**, choose your PostgreSQL connection.
3. In **Select Database**, choose the database to extract data from.
4. In **Select Schema**, choose the schema that contains the target table.
5. Choose your extraction mode:

### Visual Mode

6. In **Select Table**, choose the table to extract data from.
7. In **Maps Fields**, select the columns you want to include in the extraction. You can select all or a subset.
8. Optionally configure a **WHERE** clause to filter rows at extraction time.

### SQL Script Mode

6. Enable the **SQL Script mode** toggle.
7. Write your custom SQL query in the editor. You can use `JOIN`, `WHERE`, subqueries, and any valid PostgreSQL syntax.

> **Note:** SQL Script mode is useful when you need to combine multiple tables, apply transformations, or filter data with complex conditions before loading it to the destination.

8. Continue to the **Destination** tab to configure where the extracted data will be sent.

---

## Data Type Handling

Crestone extracts data from PostgreSQL using `psycopg2`. Columns with standard types (`INTEGER`, `TEXT`, `BOOLEAN`, `FLOAT`, `DATE`, `TIMESTAMP`) are preserved as-is. Columns with complex types such as `UUID`, `JSONB`, `ARRAY`, `DECIMAL`, or custom types are automatically converted to text during extraction.

---

## Common Issues

| Issue | Possible Cause | Solution |
|-------|---------------|----------|
| Connection timeout | Firewall blocking port 5432 | Allow inbound connections on port 5432 from the Crestone server IP |
| Authentication failed | Wrong username or password | Verify credentials in your PostgreSQL client first |
| Database not found | Database name is incorrect or does not exist | Check the exact database name (case-sensitive) |
| SSL error | Server requires SSL | Try connecting directly on port 5432 instead of 6543 (PgBouncer) |
| Permission denied | User lacks SELECT privileges | Grant the user `CONNECT` and `SELECT` on the target schema and tables |
| No tables visible | Schema is empty or user lacks usage privileges | Grant `USAGE` on the schema to the configured user |

---

## Required Permissions

The database user configured in Crestone needs at minimum the following privileges on the source database:

```sql
-- Allow connection
GRANT CONNECT ON DATABASE my_database TO my_user;

-- Allow schema visibility
GRANT USAGE ON SCHEMA my_schema TO my_user;

-- Allow reading data
GRANT SELECT ON ALL TABLES IN SCHEMA my_schema TO my_user;

-- Optional: allow access to future tables created in the schema
ALTER DEFAULT PRIVILEGES IN SCHEMA my_schema
  GRANT SELECT ON TABLES TO my_user;
```

> **Tip:** If you use `postgres` as the user (Supabase default), it already has superuser privileges and no additional grants are needed.
