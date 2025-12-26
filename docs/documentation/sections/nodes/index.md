---
sidebar_position: 2
iconName: "cubeInCube"
description: "Create a node to extract data from a source and load it into a destination."
title: "Node"
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Cardcre, Feature} from '../../cards/cards.tsx';

## Getting Started

Before creating a node, you must have at least one Source and one Destination already configured.
These connections are essential, since every node relies on them to synchronize and transfer data effectively.

👉 Make sure both the [Source and Destination.](/docs/documentation/sections/conections) are properly set up before proceeding with node creation.


## Create new Node
Steps to create a Node:


### 1. Start a New Node
Click on the green button with the "+" symbol.
![Start a New Node](/img/old/chrome_vl4qhko1ie.png)

### 2. Select "New Node".
![New Node](/img/old/node/chrome_5xugbm07ld.png)

### 3. Naming
Enter the name of the new node and click the "Next" button.
![Naming](/img/old/node/chrome_xopoh01ff1.png)



### 4. Select a source
Click on "Select a connection for a source" and choose a source that has been created previously.
![Select a source](/img/old/node/chrome_gvwjzjz0p3.png)



### 5.  Set up the node
According to the source configure the node to extract the necessary
<Tabs>
  <TabItem value="SAP S/4HANA" label="SAP S/4HANA" >
<Cardcre
    title="Tables"
    description="For detailed instructions on configuring a node when SAP S/4HANA is used as the source."
    icon="SAP"
    brand={true}
    link= '/docs/documentation/sections/nodes/setupsource/table'
/>
  </TabItem>
  <TabItem value="SAP ABAP" label="SAP ABAP" default>
  When SAP ABAP is used as the source, the node supports multiple data extraction methods, each with its own configuration options. This gives you flexibility to access both standard and custom-developed SAP data objects.
    <div  className="row">
        <Feature
            title="Table"
            description="Direct extraction from transparent tables or views."
            icon="SAP"
            link='/docs/documentation/sections/nodes/setupsource/table'
        />
        <Feature
            title="Reports"
            description="Execution of custom ABAP reports (Z-reports) that return structured output."
            icon="SAP"
            link='/docs/documentation/sections/nodes/setupsource/reports'
        />
        <Feature
            title="BAPI"
            description="Data extraction via BAPIs, typically requiring input parameters and structure mapping."
            icon="SAP"
            link='/docs/documentation/sections/nodes/setupsource/bapi'
        />
        <Feature
            title="Extractor"
            description="Use of SAP standard extractors (e.g., 2LIS_*) for data already prepared for reporting."
            icon="SAP"
            link='/docs/documentation/sections/nodes/setupsource/extractor'
        />
        <Feature
            title="CDC"
            description="Incremental extraction of only the records changed since the last execution."
            icon="SAP"
            link='/docs/documentation/sections/nodes/setupsource/cdc'
        />
    </div>
  </TabItem>
</Tabs>




### 6. Select a destination
Click on "Select a connection for a destination" and choose a destination created previously.
![chrome_sqwssiaaon](/img/old/node/chrome_sqwssiaaon.png)

### 7. Configure the output data
Once your node is connected and the source is properly configured, the next step is to define how the data will be exported to the destination.

Crestone supports two main export modes:
<div className="row">
    <Feature
        title="Table"
        description=" Ideal for structured, query-ready data."
        icon= 'list'
        link= '/docs/documentation/sections/nodes/data/table'
    />  
    <Feature
        title="Stage"
        description="Suitable for raw or semi-structured data files, available in CSV or Parquet format."
        icon= 'folder'
        link='/docs/documentation/sections/nodes/data/stage'
    />
</div>

Choose the export mode that best fits your target system and downstream processing requirements.


### 8. Set the limit
Set the node limit and then click the "Create" button.
![chrome_tqeezuc4xt](/img/old/node/chrome_tqeezuc4xt.png)

And that's it! The node has been successfully created.