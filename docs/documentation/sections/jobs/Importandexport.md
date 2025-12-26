---
sidebar_position: 3
iconName: "arrowDownToLine"
title: "Import & export"
description: "Import and export jobs in Crestone."
---

The ability to import and export jobs in Crestone allows users to share, replicate, and back up workflows with ease. You can export your current job configuration into a JSON file and import it later in a different workspace or instance, making collaboration and deployment significantly more efficient.

## 1. Export a Job
In the top-left section of the job editor, click on the “Export” button.
You’ll be prompted to enter a filename for the exported job.
- If this field is left empty, the system will use the Job Name as the default file name.
- The job will be exported as a .json file containing all node structures and job metadata (excluding credentials for security reasons).
<p align="center">
![Export a Job](/img/Job/exporta/export.png)
</p>

## 2. Import a Job
From the Jobs tab, click on "Add New Job" and select "Import".
This will start the guided import flow.
<p align="center">
![Import a Job](/img/Job/exporta/portada.gif)
</p>

## 3. Upload a File
Drag and drop or manually select your previously exported ```.json``` file.
<p align="center">
![Upload a File](/img/Job/exporta/a.png)
</p>

Once uploaded, Crestone will begin processing the contents of the file and load the relevant configuration.

<p align="center">
![Upload a File ](/img/Job/exporta/b.png)
</p>

## 4. Match Data Connections
For security reasons, credentials are not included in the exported file.
You'll need to match the required **sources and destinations** with existing connections in your environment. These connections must be previously created and available.
<p align="center">
![Match Data Connection](/img/Job/exporta/emparejar.png)
</p>

## 5. Generate Nodes
Once the connections are mapped, Crestone will automatically generate all required nodes based on the imported configuration.
The names of the nodes will be applied exactly as they appear in the original export.

## 6. Review Summary
Just like in the template flow, you’ll see a summary screen showing all the nodes and job steps that will be created. This gives you a final chance to review before proceeding.

![Review Summary 1](/img/Job/exporta/c.png)
![Review Summary 2](/img/Job/exporta/d.png)

Once confirmed, your job is ready to use. You can modify it using the visual editor or schedule it for execution as needed.