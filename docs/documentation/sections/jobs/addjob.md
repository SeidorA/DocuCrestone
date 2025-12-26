---
sidebar_position: 1
iconName: "plus"
title: "New Job"
description: "Create a job to extract data from a source and load it into a destination."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Steps to create a Job:

### 1.Start a New Job
Click on the green button with the "+" symbol.
![Start a New Job](/img/old/jobs/chrome_3ghucqaojr.png)

### 2. Select Manual Job Creation
Choose "Create job manually" from the available options.
![Select Manual Job Creation](/img/old/jobs/chrome_ld6tnujoac.png)

### 3. Click on "Nodes".
![Nodes](/img/old/jobs/chrome_jwyaeov22k.png)

### 4.Add Control and Extraction Nodes
Select the control node and drag it to the right, along with the extraction nodes you need.
![Extraction Nodes](/img/old/jobs/chrome_yswpathtsy.gif)

### 4. Link the nodes.
Connect the nodes by dragging from one to another, defining the flow of execution.
![Link the nodes.](/img/old/jobs/chrome_zqtpkmgpuu.gif)

### 5. Save Your Job Structure
Click the green button to save the changes.
![Job Structure](/img/old/jobs/chrome_lupjlxg8qu.png)

### 6. Click on "Panel".
![Panel](/img/old/jobs/chrome_a4sbnuc3bl.png)

### 7.  Set a Job Name
Go to the "Panel" section and update the job name for easy identification.
    <p align="center">
    ![Set a Job Name](/img/old/jobs/chrome_9nnsvoqhoj.png)
    </p>

### 8. Schedule Execution

Click on "Schedule Execution" to configure how often the job should run. Depending on the selected option, you'll be able to define specific scheduling parameters.

**Scheduling Options** 
<Tabs>
  <TabItem value="Once Only" label="Once Only" default>
    Run the job only one time at a specific date and time.
    <p align="center">
    ![cheduling Options](/img/old/jobs/chrome_dyal1oysms.png)
    </p>

  </TabItem>
  <TabItem value="Once per Day" label="Once per Day">
    **Run the job once per day.**
    Select the days of the week and the time it should run.
    <p align="center">
        ![Run the job once per day](/img/old/jobs/chrome_abfdyiz0hg.png)
    </p>
  </TabItem>
  <TabItem value=" Once per Month" label=" Once per Month">
    **Run the job once per month.**
    Choose the day of the month and the execution time.
    <p align="center">
     ![Run the job once per month](/img/old/jobs/chrome_ckxy7vmtgr.png)
    </p>
  </TabItem>
  <TabItem value="More than Once per Day" label="More than Once per Day">
    **Run the job multiple times per day.**
    Select the days of the week and define how often it should repeat within a day.
    <p align="center">
        ![Run the job once per day](/img/old/jobs/chrome_p0fajg2vzk.png)
    </p>
  </TabItem>
  <TabItem value="Custom Cron" label="Custom Cron">
    Use a standard cron schedule expression to define custom execution intervals.
    This method is ideal for users familiar with cron syntax who need precise control over the schedule.
    <p align="center">
        ![Custom Cron](/img/old/job/cronos.png)
    </p>
    
  </TabItem>

</Tabs>

### 9. Confirm the Scheduling
Once you’ve defined the execution schedule, click on "Schedule Job" to finalize and activate it.
And that's it! The job with the scheduled execution has been successfully created.