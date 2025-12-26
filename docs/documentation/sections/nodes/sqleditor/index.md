---
title: "SQL Editor"
iconName: "fullJoinW"
description: "Define complex logic for your extractions by combining tables and applying filters, using standard SQL syntax."
---
import Admonition from '@theme/Admonition';

![SQL Editor](/img/node/sqleditor/portada.png)
The SQL Editor allows you to define complex logic for your extractions by combining tables and applying filters, using standard SQL syntax. This feature is available for sources such as SAP S/4HANA, ABAP, and CDC tables.


## Join Clause
Use the Join Clause section to combine two or more tables based on matching fields. You can choose between different types of joins:
- Inner Join
- Left Join


### To create a join:
1. Select a Left table and a Right table.
<p align="center">
![Create a join](/img/node/sqleditor/select.png)
</p>

2. Choose the Join type from the dropdown.
<p align="center">
![Choose the Join type](/img/node/sqleditor/join.png)
</p>

3. Once both tables are selected, map the corresponding fields (left and right).
 <p align="center">
![fields](/img/node/sqleditor/fild.png)
</p>

4. Click Make join to save.

<Admonition type="tip">
This operation is useful when you need to enrich your data by bringing in related fields from multiple tables.
</Admonition>

## WHERE Clause
The Where section lets you filter the results by specifying conditions. You can add multiple conditions using standard SQL syntax.
For example:

```
MANDT = 400 AND LAND1 = 'DE'
```

**There are two modes:**
- Text Mode: Write conditions manually.
- Editor Mode: Enables a more guided UI experience.


:::::tip
You can also insert reusable variables to make your queries dynamic.
See the [Variables Guide](./VariablesinNodes) for more details on how to define and use them.
:::::
