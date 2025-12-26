---
sidebar_position: 2
iconName: "Snowflake"
useBrand: true
title: "Snowflake"
description: "Create a node to export data from a source and load it into a destination."
---
import {Cardcre} from '../../../../cards/cards.tsx'

## How to create a destination with Snowflake

### 1. Select the destination type:
-   Select the "Snowflake" option for the destination type.
![Select the destination type](/img/old/connections/snow.png)


### 2. Enter Snowflake credentials:
-   You will be shown a section where you must enter the credentials to connect to your Snowflake account.
<p align="center">
![Snowflake credentials](/img/old/connections/chrome_rlpel2cl2v.png)
</p>

**Enter the user name:**
-   For the User input, you will enter the user name with which you registered in Snowflake (The name must be in all capital letters), for password, you will enter the password with which you registered in Snowflake.

**Enter the Private Key and Private Key passphrase:**
To obtain the private key, you need to follow the steps provided in the Key-pair authentication and key-pair rotation section, which you can view by clicking on "**See Now**" in the "**Info Alert**".

<p align="center">
![Private Key](/img/old/snowflake/chrome_oufcwqsoy5.png)   
</p>


**Enter the account:**
-   For Account, you need to go to Snowflake and copy from the url the account name that Snowflake assigned to you.
![Enter the account](/img/old/snowflake/chrome_9busyiijvd.png)

-   In this case it is ```“fspcfhh/dwb64383”```, copy it and change the "/" to "-"
-   It should look something like this:
<p align="center">
![Enter the account](/img/old/snowflake/chrome_avuzwknhbx.png)
</p>

### 3. Click on the “Test Connection” button
Enable the inputs below.

### 4. Configure the inputs of Role
Warehouse, Database and Schema as you wish to establish the connection to Snowflake and finally click on the “Create Destination” button.
<p align="center">
![Configure the inputs of Role](/img/old/snowflake/role.png)
</p>



## Exporting data to Snowflake

Crestone allows you to connect your SAP environment to Snowflake flexibly and securely. When configuring a node with Snowflake as the destination, you can decide how the data will be exported: either as a file in an intermediate **stage** or by inserting the data directly into a **table**.

This option is key to adapting the behavior of the extraction process to your technical or data governance needs:

<div className="row">
    <div className="col">
        <Cardcre title="Stage"  description="The data is sent as CSV or Parquet files to Snowflake (Stage). It is ideal for subsequent uploads, manual reviews, or asynchronous integrations." link="/docs/documentation/sections/nodes/data/stage" icon="folder" />
    </div>
    <div className="col">
        <Cardcre title="Table"  description="The data is inserted directly into a target table in Snowflake, allowing integration and analysis processes to be automated without intermediate steps." link="/docs/documentation/sections/nodes/data/table" icon="list" />
    </div>
</div>


