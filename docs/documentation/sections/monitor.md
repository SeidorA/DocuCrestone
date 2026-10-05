---
sidebar_position: 4
iconName: "screenChart"
description: "Monitor your data integrations with ease."
title: "Monitor"
---
In monitoring, there are sections for Calendar, Performance, History, and Logs.

## Calendar

This calendar displays all jobs scheduled for the day, week, or month.
![Calendar view showing scheduled jobs with daily, weekly, and monthly views](/img/old/settings/chrome_fztgejtxr6.png)

---

## Performance
Here you can view all jobs scheduled for the day, week, or month.
![Performance dashboard showing job execution metrics and statistics](/img/old/settings/chrome_ixe3ykikfb.png)

### Cancelling a running execution

If a job execution is still running (status **Running** or **Initiated**), you can cancel it from its detail in Performance without waiting for it to finish or restarting services directly:

1. In the Performance table, locate the running execution.
2. Click **Cancel execution**.
3. Confirm the status changed to cancelled before continuing.

:::info
Cancellation is **cooperative**, not instant: Crestone marks the execution for cancellation, and the node that's currently running stops at its next internal checkpoint rather than being killed immediately. Depending on what the node is doing at that moment, the execution may take a few seconds to actually stop.
:::

Only executions in **Running** or **Initiated** status can be cancelled — once an execution has finished (successfully or with errors), the Cancel action is no longer available for it.

> **Important:** If you need to restart the Crestone server or containers while an extraction is running, cancel it here first. Restarting without cancelling can leave processes or connections open on the SAP side (occupied RFC slots) that don't release on their own.

---

## History
Here you can explore the complete activity history.
![History log showing past job executions with timestamps and status information](/img/old/settings/chrome_pl18zze5fu.png)

---

## Logs

Besides the execution history, Monitor has a real-time log viewer with three tabs, depending on
which part of the stack you want to inspect:

| Tab | What it shows |
|---|---|
| **UI** | Frontend logs — the visual part of Crestone. |
| **Engine** | Backend logs — connections, connection tests, and loads to destinations. |
| **SAP** | SAP ABAP microservice logs — errors and extractions/preview against SAP. Only applies to SAP ABAP sources. |

From any tab you can:
- Search text within the logs and jump to a specific date.
- Turn on **Auto Refresh** to see logs live (updates every 10 seconds).
- Pick the date to query with the calendar picker.
- Download the visible logs as a `.txt` file with **Save**.
- Adjust line count, font size, timestamps, and line wrap from **Settings**.
