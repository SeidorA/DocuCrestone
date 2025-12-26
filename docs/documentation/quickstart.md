---
sidebar_position: 3
iconName: "bolt"
title: "Quickstart"
description: "Learn how to quickly set up your first data synchronization job in Crestone. This guide covers creating connections, nodes, and jobs to automate data flow between SAP and AWS."
config:
      theme: redux
---

##  End-to-End Example: SAP ➜ AWS S3 and Snowflake
This example demonstrates how to configure a complete workflow in Crestone to extract data from SAP ABAP and transfer it to destinations in AWS S3 and Snowflake.

```mermaid
flowchart TD
    A(["Start"]) --> D["Create connections"]
    D --> n1["Create a source"] & n2["Create a destination"]
    n1 --> n3["Create a node"]
    n2 --> n3
    n3 --> n4["Create Jobs"]
    n4 --> n5["End"]
    style A fill:#FFD600

```


## Step 1: Create Connection


###  Create new source

Enter the required data to be able to connect correctly with your destination.

**Create a SAP Source**
1. Go to **Create Connection**.
<p align="center">

![Animation showing how to create a connection through the interface.](/img/old/star/conection.gif)

</p>

![Source connection settings screen.](/img/old/connection/chrome_rmvjsa1zat.png)

2. Enter the following information:
   - **Connection Name:** `SAP_KNA1_Connection`
   - **Connection Type:** `SAP HANA`
   - **Host:** `sap.example.com`
   - **Port:** `30015`
   - **Username:** `USERNAME`
   - **Password:** `PASSWORD`
3. Click **Test Connection**.
4. Once validated, click **Create**.
5. If you require more information on connections, please see the [connections page](./sections/conections/).

> Note: Ensure the SAP HANA connection is enabled and the credentials are correct, as this is critical for data extraction.
> 

### Create New Destination
Enter the required data to be able to connect correctly with your destination.


**Create a AWS S3 Destination**
1. Go to **Create Destination**.

2. Enter:
![Destination connection settings screen.](/img/old/connection/chrome_ffaxuw3rlp.png)
   - **Name:** `AWS_S3_Destination`
   - **Type:** `S3`
   - **Bucket:** `crestone-demo-bucket`
   - **Region:** `us-east-1`
   - **Access Key ID:** `AKIA...`
   - **Secret Key:** `********`
3. Click **Test Connection** If the connection is valid, you can continue.
4. Click then **Create**and you're done.


**Create a Snowflake Destination**

1. Go to **Create Destination**.
2. Enter:
![Destination connection settings screen.](/img/old/connection/Snow.png)
   - **Name:** `Snowflake_Destination`
   - **Username:** `SF_USER`
   - **Private Key:** `-----BEGIN PRIVATE KEY----- ...`
   - **Private Key Password:** `password`
   - **Account:** `xyz12345.us-east-1`
3. Click **Test Connection**.
4. Then select:
   - **Role:** `SYSADMIN`
   - **Warehouse:** `COMPUTE_WH`
   - **Database:** `CRESTONE_DB`
   - **Schema:** `PUBLIC`
5. Click **Create**.

:::::info
Note: Refer to the [Snowflake documentation](./sections/conections/detinations/snowflafe) for advanced configuration details.
:::::



## Create Nodes
For node creation, it is essential to have previously established at least one **Souce** and one **Destination**.These connections are fundamental, as the nodes will depend on them to effectively synchronize the data. Make sure to properly configure both ends before proceeding with node creation.

![Animation showing how to create a new node.](/img/old/connection/chrome_c29onchecm.gif)


## Create a new JOB
To generate a Job it is required that at least one **node** has been generated.


1. Click on the "Create Job" button.
![Screenshot of the screen for changing the job name.](/img/old/connection/chrome_3ghucqaojr.png)

2. Change the name of the Job.
<p align="center">
![Screenshot of the screen for running or scheduling a job.](/img/old/connection/chrome_9nnsvoqhoj.png)
</p>

3. Click on "Nodes".
![Nodes](/img/old/connection/chrome_jwyaeov22k.png)

4. Select the control node and drag it to the right, along with the extraction nodes you need.
![Jobs](/img/old/connection/chrome_yswpathtsy.gif)

5. Link the nodes together.
![Link the node](/img/old/connection/chrome_zqtpkmgpuu.gif)

6. Click the green button to save the changes.
![Save the changes](/img/old/connection/chrome_lupjlxg8qu.png)

7. Executes the job or schedules its execution.


<p align="center">
![Save](/img/old/connection/chrome_0wqarufc9l.png)
</p>

<p align="center">
![Repeat Job](/img/old/job/captura_de_pantalla_2024-12-12_082809.png)
</p>
