---
sidebar_position: 6
iconName: "Databricks"
useBrand: true
title: "Databricks"
description: "Create a node to export data from a source and load it into a destination."
---
### How to create a destination with Databricks

### 1. Select the destination type:
- Select the "Databricks" option for the destination type.
![Select the destination type](/img/old/databricks/q1hljef1wc.png)

### 2. enter Databricks credentials:
- You will be prompted to enter the credentials needed to connect to your Databricks account.
  
<p align="center">

![Databricks credentials](/img/old/databricks/msedge_wpxszjf1dy.png)
</p>

- **Enter the Server Hostname:**
      Enter the hostname of your Databricks workspace. You can find this information in your Databricks workspace under Account Settings or in the URL of your workspace. For example, it might look like:
      `https://<databricks-instance>.cloud.databricks.com.`

- **Provide the HTTP Path:**
Input the HTTP Path associated with your Databricks cluster. To find the HTTP Path:

1. Navigate to your Databricks workspace.
2. Go to Clusters, select the cluster you want to connect to, and click Advanced Options.
3. Locate the HTTP Path field and copy its value.

- **Enter the Access Token**
Provide the personal access token for your Databricks account. You can generate one by:

1. In your Databricks workspace, click on your user profile icon (top-right corner).
2. Select User Settings from the dropdown menu.
3. Open the Developer tab 
4. Open the Access Tokens tab.
5. Click Generate New Token, then provide an optional name and expiration date.
6. Copy the generated token. Important: Save the token securely, as it won't be displayed again after creation.

Note: Make sure to store your access token securely, as it provides access to your Databricks workspace.


### 3 Test the connection:

![databricks](/img/old/databricks/databricks.gif)
Click the "Test Connection" button to verify that the connection to Databricks has been established correctly.
If the test is successful, the system will enable additional configuration options.


### 4 Create the connection:
Finally, click the "Create Destination" button to establish the connection to Databricks.