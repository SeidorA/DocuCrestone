---
sidebar_position: 3
iconName: "Azure"
useBrand: true
title: "Azure Storage"
description: "Create a destination to export data to Azure."
---

## How to create a destination with Azure

### 1. Select the destination type:
- Select the "Azure" option for the destination type.
![Select the destination type](/img/old/azure/msedge_5lpxopfkwj.png)

### 2. Enter Azure credentials:
You will be prompted to enter the credentials needed to connect to your Azure account.
<p align="center">
![msedge_txoprclebt](/img/old/azure/msedge_txoprclebt.png)
</p>
To connect to an Azure Storage Account, follow these steps to gather the necessary details:

**Find the Account Name**
1. Log in to the Azure Portal.
2. Navigate to Storage accounts in the left-hand menu.
3. Select the storage account you want to connect to.
4. Under the Overview section, locate the Storage account name field.
5. Copy the account name, which is typically a unique identifier for your storage account.


**Retrieve the Account Key**
![azure](/img/old/azure/azure.gif)

1. In the selected storage account, navigate to Access keys under the Settings section in the left-hand menu.
2. You will see two key pairs: Key1 and Key2.
3. Copy the key you want to use (either Key1 or Key2). Both keys provide the same level of access, so you can use either.
4. Important: Store this key securely, as it grants access to your storage account.

### 3. Test the connection:
Click the "Test Connection" button to verify that the connection to Azure has been established correctly.
If the test is successful, the system will enable additional configuration options.

### 4. Create the connection:
Finally, click the "Create Destination" button to establish the connection to Azure.