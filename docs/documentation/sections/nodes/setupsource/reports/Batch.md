---
title: Batch Data
description: "Create batches of data to process in Creastone."
iconName: "database"
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Introduction 
Learn how to efficiently manage data batches by applying date-based filters and organizing your output files. This guide streamlines the process of splitting large datasets into smaller, manageable segments for improved reporting and accessibility.

---

## Configuration 

### Enable this section 
![Enable this section](/img/node/Reports/batch/a.png)

### Add a batch

![Add a batch](/img/node/Reports/batch/b.png)

### Select the “date” or “string” type
Select either the **“date”** or **“string”** type; only one batch type is allowed. You cannot combine types in this section or create two batches within the same node.
![Select date or string type](/img/node/Reports/batch/c.png)


### Select type of batch

<Tabs>
  <TabItem value="Fields" label="Fields" default>

#### Select Fields
![Select Fields](/img/node/Reports/batch/d.png)


#### Select the batch frequency
You can select the **“Standard”** type, which allows you to choose a range—day, week, month, semester, or year—depending on what you're looking for or the ranges set in the filter.
![Select the batch frequency](/img/node/Reports/batch/e.png)

#### Enable split files
Enable splitting if the user wants the data to be saved in different files based on the range. This applies ONLY to storage-type destinations; for table-type destinations, even if this option is enabled, the next step will display a message stating that it has been disabled because the destination is a table.
![Enable split files](/img/node/Reports/batch/f.png)

#### Number of files generated
Depending on what was selected in the range, it will display the number of files that will be generated.
![Number of files generated](/img/node/Reports/batch/g.png)


</TabItem>
  <TabItem value="String" label="String">

#### Select type
![string fields](/img/node/Reports/batch/i.png)

#### Select fild
![string frequency](/img/node/Reports/batch/j.png)

### Select the values separated by , 
![string frequency](/img/node/Reports/batch/k.png)
    
  </TabItem>
</Tabs>

### Save
![Save](/img/node/Reports/batch/h.png)
