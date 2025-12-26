---
title: "Stage"
iconName: "folder"
description: "Create a node to export data from a source and load it into a destination."
---
import {Brand} from 'iconcaral2';
import Admonition from '@theme/Admonition';

### Stage Destination Configuration
The Stage destination allows you to export data as files into a storage layer such as

<div className="row gap--crest margin-horiz--xs">
    <Brand name="AWS" size={45} />
    <Brand name="snowflake" size={45} />
    <Brand name="Azure" size={45} />
    <Brand name="Databricks" size={45} />
    <Brand name="GoogleStorage" size={45} />
</div>


This option is ideal when working with raw or semi-structured data and supports integration with data lakes or batch pipelines.

Once the node is configured (linking a compatible source with a stage-compatible destination), the export is performed by executing a Job manually.

### 1. Select a Compatible Destination
Choose a destination that supports staging, such as:

![Select a Compatible Destination](/img/node/stage/destination.png)

### 2. Choose the File Format
Select how the data should be exported:

- CSV: Flat, readable format, ideal for interoperability.
- Parquet: Columnar format, optimized for analytics and large-scale processing.
![Choose the File Format](/img/node/stage/file.png)

### 3. Define a Target Path (Optional)
Specify the path or folder inside the storage destination where the file should be written.
If no path is defined, the file will be exported to the root directory of the stage.
![Define a Target Path](/img/node/stage/route.png)


<Admonition type="tip">
    Once the node is configured, you can include it in a Job. The export will occur only when that Job is executed.
</Admonition >