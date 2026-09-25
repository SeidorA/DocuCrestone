---
sidebar_position: 4
iconName: "screenChart"
description: "Monitor your data integrations with ease."
title: "Monitor"
---
In monitoring, there are sections for Calendar, Performance, and History.

## Calendar

This calendar displays all jobs scheduled for the day, week, or month.
![Calendar view showing scheduled jobs with daily, weekly, and monthly views](/img/old/settings/chrome_fztgejtxr6.png)

---

## Performance
Here you can view all jobs scheduled for the day, week, or month.
![Performance dashboard showing job execution metrics and statistics](/img/old/settings/chrome_ixe3ykikfb.png)

### Cancelling a running execution

If a job execution is still running (status **Running** or **Initiated**), you can cancel it from
its detail in Performance without waiting for it to finish.

<!-- screenshot: execution detail/card in Performance showing the Cancel action for a running execution -->

:::::info
Cancellation is **cooperative**, not instant: Crestone marks the execution for cancellation, and
the node that's currently running stops at its next internal checkpoint rather than being killed
immediately. Depending on what the node is doing at that moment, the execution may take a few
seconds to actually stop.
:::::

Only executions in **Running** or **Initiated** status can be cancelled — once an execution has
finished (successfully or with errors), the Cancel action is no longer available for it.

---

## History
Here you can explore the complete activity history.
![History log showing past job executions with timestamps and status information](/img/old/settings/chrome_pl18zze5fu.png)
