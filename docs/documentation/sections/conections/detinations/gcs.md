---
sidebar_position: 7
iconName: "GoogleBigquery"
useBrand: true
title: "Google Cloud Big Query"
description: "Create a node to export data from a source and load it into a destination."
---

## How to create a destination with Google Cloud Platform
### 1. Select the destination type:
Select the "Google Cloud Platform" option for the destination type.
![Select the destination type](/img/old/gcp/select.png)


### 2. Enter GCP credentials:
You will be shown a section where you must upload the file with the credentials to connect to your Google Cloud Platform account.
<p align="center">
![Enter GCP credential](/img/old/gcp/file.png)
</p>


### 3. Test connection
Click on "Test connection", once tested you can proceed to the next step, otherwise check the connection data

### 4. Create the connection
Click "Create Destination"

## How to get "Service Account JSON"
1. Go to the **Google Cloud console**: https://console.cloud.google.com/
2. In the side menu, look for the IAM and Administration option and go to Service Accounts

<p align="center">
![Go to service accounts](/img/old/gcp/servacc.png)
</p>

3. Look for the option + create service account in the tab and complete everything required in step 1. Name and id of the service, now click create and continue
<p align="center">
![Create service account](/img/old/gcp/servacc2.png)
</p>

4. Step 2 says optional, but it's important to give it BigQuery admin permissions (you can use the filter to find it)
<p align="center">
![Assign role](/img/old/gcp/servacc3.png)      
</p>

5. Continue and voila, step 3 leave it as is.
6. View the account created and on the right look for the 3 dots, tap and select the option Manage passwords

<p align="center">
![Manage keys](/img/old/gcp/servacc4.png)      
</p>

7. Within this option in the nabar select keys, look below add key, create new key
8. Select JSON type, create and download a JSON file in downloads that will be used to create the connection.

<p align="center">
![Create key](/img/old/gcp/servacc5.png)
</p>    

9. Copy that content and use it when the connection is created in crestone
<p align="center">
![Use key](/img/old/gcp/servacc6.png)

</p>

10. Return to the cloud console and look for the Big Query option

<p align="center">
![Go to BigQuery](/img/old/gcp/servacc7.jpg)
</p>


11. Once inside, search for service account and see the options with the 3 dots and select create datasets. Add the identifier ID you like and create it
<p align="center">
![Create dataset](/img/old/gcp/servacc8.png)
</p>

12. It will appear at the end with the name of the chosen id

<p align="center">
![Dataset created](/img/old/gcp/servacc9.png)  
</p>