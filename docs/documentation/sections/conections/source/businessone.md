---
sidebar_position: 5
iconName: "SAP"
useBrand: true
title: "ODATA SAP Business One"
description: "Create a node to extract data from a source and load it into a destination."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## How to create an SAP source with the OData protocol
This page walks you through setting up a connection with OData services.
You’ll learn how to authenticate, define endpoints, and integrate structured SAP data into Crestone via standard OData protocols.

### 1. Select the source type:
- Select any of the OData options we have available to connect your source
<p align="center">
  ![Illustration showing the selection of OData source type in SAP integration setup.](/img/old/odatasap/bo.png)
</p>

### 2. Select the type of authentication


<Tabs>
  <TabItem value="Basic Auth" label="Basic Auth" default>

<p> **Enter SAP OData credentials:** </p>
You will be prompted to enter the credentials needed to connect to your SAP OData system.
<p align="center">
  ![Screenshot of SAP OData Basic Authentication input fields including username and password.](/img/old/odatasap/select.png)
</p>
  
**Username**
1. Use your SAP account credentials to authenticate. The Username is provided by your SAP administrator.
2. If you’re unsure of your Username, verify it with your system administrator or in the SAP GUI under User Settings.

**Password**
1. Enter the Password associated with your SAP account.
2. If you don’t know your Password or need to reset it, contact your SAP administrator.


**Service URL**
1. Obtain the OData Service endpoint URL from your SAP system administrator.
2. This URL typically points to the specific OData service you want to connect to, and it may look like:
`https://<sap-server>/sap/opu/OData/<service-name>`
1. Ensure the URL includes the correct protocol (https:// or http://), server address, and service name.


  </TabItem>
<TabItem value="API Key" label="API Key">
  <p> **Enter API Key:** </p>
You will be prompted to enter the credentials needed to connect to your SAP OData system.
<p align="center">
    ![Screenshot of SAP OData API Key authentication input screen.](/img/old/odatasap/api.png)
</p>


**API Key**
1. Enter the API Key associated with your SAP account.

**Service URL**
1. Obtain the OData service endpoint URL from your SAP system administrator.
2. This URL typically points to the specific OData service you want to connect to, and it may look like:
`https://<sap-server>/sap/opu/OData/<service-name>`
1. Ensure the URL includes the correct protocol (https:// or http://), server address, and service name.
  </TabItem>
</Tabs>

### 3. Test the connection:

Click the "Test Connection" button to verify that the connection to the SAP OData system is working correctly.
If the test is successful, the system will enable additional configuration options.
 


### 4. Create the connection:
Finally, click the "Create Source" button to establish the connection to SAP OData.



## Connection Parameters

| Parameter      | Description                                            | Example                                               |
|----------------|--------------------------------------------------------|-------------------------------------------------------|
| Authentication | Authentication method (`Basic Auth` or `API Key`)      | `Basic Auth` or `API Key`                             |
| Username       | SAP user (only if using Basic Auth)                    | `sapuser`                                             |
| Password       | Password of the SAP user (only if using Basic Auth)    | — (hidden)                                            |
| API Key        | Access key (only if using API Key authentication)      | `12345-abcde-67890`                                   |
| Service URL    | Endpoint of the OData service                          | `https://sap.company.com/sap/opu/odata/ServiceName`   |
