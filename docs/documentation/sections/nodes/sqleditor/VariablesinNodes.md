---
sidebar_position: 4
iconName: "cube"
description: "Manage variables in nodes."
title: "Variables"
---

The “Variables in Nodes” process allows the creation and management of variables within the nodes connecting a source and a destination. These variables can be used to customize and automate SQL queries in the “SQL Editor> where” section.

![Variables in Nodes](/img/node/variables/a.png)

## Main Features
### Definition of Variables:

Variables are defined using the @ symbol followed by the variable name, for example, ```@date.```
You can create as many variables as you consider necessary for your queries.

# Types of Variables:

**Hard Text**: Fixed values that do not change, such as @date = ‘10/20/2025’.
![Types of Variables](/img/node/variables/b.png)

**Python code** : Allows the execution of dynamic code between {} braces, such as 
```{{today().replace(...)}}```, to schedule jobs and customize each execution.

![Types of Variables Python](/img/node/variables/c.png)

**Within the “SQL Editor”**, you can use these variables to build dynamic SQL queries.
Example: ```SELECT * FROM table WHERE date = @date.```

## Implementation
**Creation of Variables:**

Define the required variables in the corresponding node.
Assign fixed or dynamic values as needed.
![Implementation](/img/node/variables/image.png)

## Configuration of SQL Queries:
Use the variables defined within the “SQL Editor” to customize queries. Make sure that the variables are correctly referenced in the query. 

## Execution of Jobs:
Use the variables defined within the “SQL Editor” to customize queries.
Make sure the variables are correctly referenced in the query.

Schedule the execution of tasks using dynamic variables.
Make sure that the jQuery code between braces {} is correctly implemented to obtain the desired values.

