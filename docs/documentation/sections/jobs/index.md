---
sidebar_position: 1
iconName: "network"
title: "Jobs"
description: "Create a node to extract data from a source and load it into a destination."
---
import {Feature} from '../../cards/cards.tsx';


## Sections
Jobs are the core of the platform. They function as a visual canvas where you can drag and connect pre-configured nodes, defining the execution flow of your data export process.

Each job controls how and when data is moved from SAP or other sources to different destinations, allowing you to sequence multiple subsequent steps in a single execution.

The true potential of jobs lies in their automated scheduling capability, facilitating periodic uploads and minimizing manual intervention.

## Create a new job

<div className="row">
    <Feature
        title="Manually"
        description="Design a custom flow from scratch. Select the nodes that already contain source and destination information, and arrange them on the canvas to define the order of execution."
        icon="plus"
        link='addjob'
    />
    <Feature
        title="Templates"
        description="Choose from preconfigured templates containing common workflows. Ideal for speeding up the creation of repetitive or standard jobs while maintaining best practices."
        icon="bolt"
        link='addjob'
    />
    <Feature
        title="Import & export"
        description="Save an existing job as a file to share or replicate in other environments. You can also import previous configurations to facilitate migrations or reuse structures."
        icon="arrowDownToLine"
        link='addjob'
    />
    
</div>


## Views

View all existing jobs with filters by status, name or date. From this view you can edit, duplicate, or delete a job.

## Job Statuses

Each job has an operational status indicating its current availability or activity:
- **Active:** The job is enabled and can be executed manually or automatically.
- **Paused:** The execution is temporarily stopped.
- **Running:** The job is currently running.
- **Disabled:** The job is not available to be executed until it is reactivated.