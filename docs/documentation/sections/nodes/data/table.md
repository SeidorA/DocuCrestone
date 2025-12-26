---
title: "Table"
iconName: "list"
description: "Create a node to extract data from a source and load it into a destination."
---

import {Brand} from 'iconcaral2';
import Admonition from '@theme/Admonition';

### Table Destination Configuration
The Table destination allows you to export data directly into structured tables, ideal for analytics, reporting, and downstream transformations. This is the preferred option when working with platforms like:
<div className="row gap--crest margin-horiz--xs">
    <Brand name="snowflake" size={45} />
    <Brand name="Databricks" size={45} />
</div>
As with all nodes, you must first configure the connection between a compatible source and destination. The export will only occur when the Job is manually executed.

### 1. Select a Compatible Destination
Choose a destination that supports table storage, such as:

![Select a Compatible Destination](/img/node/table/destination.png)

### 2. Set the Storage Type
In the destination settings, choose Table as the storage type under the "Select Type Storage" dropdown.
![Set the Storage Type](/img/node/table/storage.png)

### 3. Choose or Create a Table
![Choose a Table](/img/node/table/table.png)
- If the target table already exists, select it from the list.
- If it doesn't exist, you can create a new one directly from the interface by defining its name and structure.
![Create a Table](/img/node/table/newtable.png)


<Admonition type="tip">
    Once the node is properly configured, you can include it in a Job. The data will be written into the selected table only when the Job is executed.
</Admonition >