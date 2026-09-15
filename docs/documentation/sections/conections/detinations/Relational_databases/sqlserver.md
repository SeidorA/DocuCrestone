---
title: 'MS SQL Server'
sidebar_position: 7
iconName: "MSSQL"
useBrand: true
sidebar_hide: true
---

## Prerequisites for SQL Server Connection

### Main Requirement
In order to test and establish a successful connection to SQL Server, it is essential to have an active and accessible SQL Server database. This can be hosted at:
- Local server (your own machine)
- Remote server (internal company network)
- Any database manager that supports SQL Server

### Required Connection Data

Before you set up your connection in the app, make sure you have the following information available:
1. **Server/Host:** The IP address or name of the server where the database is hosted
2. **Port:** SQL Server Connection Port (Default: 1433) May vary depending on server configuration
3. **Database Name:** Exact name of the database you want to connect to Example: ```mi_empresa_db, inventory, sales2025```
4. **Username** Username with permissions to access the database Example: ```admin, usuario_app, sa (admin)```
5. **Password** Password corresponding to the specified user

### Pre-Verification
Before setting up the connection in the app, we recommend that you verify that these details are correct by connecting from any SQL client of your choice or database manager that supports this connection.

Once you've confirmed that you can connect with these tools, you'll be able to set up the connection in the app using the same set of credentials.


## Step by step

1. Go to **Create Connection**.
2. Click on the **Destination** tab.
3. Click the **Destination name** field.

![Destination connection settings screen.](/img/Conections/sql/1.png)

4. Select **SQL Server** as the connection type.

![Select SQL Server as the connection type.](/img/Conections/sql/2.png)

5. Fill in the required fields with the connection data you have prepared:
    ![SQL Server connection settings screen.](/img/Conections/sql/3.png)
   - **Connection Name:** `SQLServer_Connection`
   - **Port:** `1433`
   - **Database Name:** `your_database_name`
   - **Username:** `your_username`
   - **Password:** `your_password`

6. Click **Test Connection** to verify that the connection is successful.
7. Once validated, click **Create** to save the connection.