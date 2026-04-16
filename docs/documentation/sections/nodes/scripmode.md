---
title: SQL Script Mode
---

:::::warning
This configuration only works for Azure SQL and MS SQL Server configured as a data source
:::::


This mode allows users to write custom SQL queries, providing greater flexibility in data retrieval. Instead of being limited to selecting tables and fields in a structured manner, users can directly define the extraction logic using an SQL script.
With SQL Script Mode, you can:
- Perform advanced SELECT queries
- Use JOINs across multiple tables
- Apply complex filters with WHERE
- Incorporate SQL functions, aggregations, and custom logic

This allows you to tailor data extraction to specific business needs and optimize how data is retrieved from the source.

## 1. Select SQL Script Mode

Click and select the SQL server or Azure SQL connection type
![Select SQL Script Mode](/img/node/sqlscript/a.png)

## 2. Click "Select database"

![Select database](/img/node/sqlscript/b.png)

## 3. Click "Select schema"

![Select schema](/img/node/sqlscript/c.png)

## 4. Select table
Here we have two flows: search table and select field

![Select table](/img/node/sqlscript/d.png)

## 5. Select fields

![Select fields](/img/node/sqlscript/e.png)

## 6. SQL Script Mode
The other flow is using SQL script mode, which allows flexibility to perform queries as needed.

![SQL Script Mode](/img/node/sqlscript/f.png)

## 7. Write your query

![Write your query](/img/node/sqlscript/g.png)

## 8. Preview
Click "Preview" to see the results of your query

![Preview](/img/node/sqlscript/h.png)


![Preview](/img/node/sqlscript/i.png)

## 9. Done
Click "Next" to continue