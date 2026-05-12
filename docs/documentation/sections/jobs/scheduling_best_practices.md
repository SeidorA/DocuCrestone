---
id: scheduling_best_practices
title: Scheduling Best Practices
sidebar_label: Scheduling Best Practices
description: Configuration, monitoring, and optimization guide for scheduled jobs in Crestone.
sidebar_position: 6
---

# Scheduling Best Practices

Configuration, monitoring, and optimization guide for scheduled jobs in Crestone.

---

## Key Concepts

Crestone's scheduler allows you to define periodic executions of extractors, transformations, and data pipelines. Each job consumes server resources during execution; a poor configuration can lead to CPU contention, memory pressure, or database connection bottlenecks.

:::info Scope of this guide
Applies to both Crestone deployment modes. Hardware metrics are primarily relevant for **On-Premise** environments. In **SaaS**, the infrastructure is managed by SEIDOR Analytics.
:::

---

## Recommended Hardware Metrics

The tables below describe recommended thresholds by server load profile. CPU and RAM values are based on [Crestone's minimum installation requirements](/docs/documentation/setup/crestone_installation/step_1.1_crestone_min_requirements). Aligning the scheduler's concurrency limits with these metrics prevents service degradation.

### Server Profiles

| Profile | CPU (cores) | RAM | Disk | Max concurrent jobs | Target CPU usage | Target RAM usage |
|---|---|---|---|---|---|---|
| Minimum | 4 cores | 16 GB | 120 GB | 2–3 | ≤ 60 % | ≤ 65 % |
| Recommended | 8 cores | 32 GB | 250 GB | 6–8 | ≤ 70 % | ≤ 70 % |
| Production | 16 cores | 64 GB | 500 GB | 12–16 | ≤ 75 % | ≤ 75 % |
| High availability | 32+ cores | 128+ GB | 1 TB+ | 25+ | ≤ 80 % | ≤ 80 % |

:::warning Critical server threshold
If sustained CPU usage exceeds **85 %** or RAM exceeds **90 %**, Crestone may begin queuing jobs with delays or dropping them entirely. These thresholds must be monitored at the operating system level — not from within Crestone. Review your concurrency settings and scale the server if needed.
:::

### Quick Reference: Key Metrics

| Metric | Value | Description |
|---|---|---|
| CPU per job | 0.5–1 core | Estimated logical core per active job |
| RAM per job | 512 MB | Baseline per extractor/transform |
| Free CPU headroom | ≥ 20 % | Always reserve for peak spikes |
| Free RAM headroom | ≥ 25 % | Prevent swap during load peaks |

---

## Recommended Configuration

### Job Time Distribution

- ✅ Schedule high-cost jobs (large extractions, complex joins) during low-traffic windows: **02:00–06:00**.
- ✅ Avoid having more than 3 heavy jobs starting at the exact same minute.
- ✅ Use staggered start times: if two jobs share the same frequency, offset their starts by at least **5 minutes**.
- ⚠️ Do not schedule production extractors in the same time slot as server-level database backups.
- ⚠️ Avoid frequencies shorter than 5 minutes for jobs that run unindexed queries or full table scans.

### Priorities and Queues

- ✅ Assign high priority only to business-critical jobs (e.g. daily closes, executive dashboards).
- ✅ Keep development and testing jobs separate from production to isolate failures and resource consumption.
- ✅ In On-Premise environments with multiple sources, group jobs by origin or functional area to simplify operations and troubleshooting.

---

## Common Mistakes to Avoid

:::warning Thundering herd
Occurs when many jobs with the same frequency (e.g. every hour on the hour) launch simultaneously. Staggering starts within **2–3 minute windows** can significantly reduce CPU spikes on the server.
:::

:::warning Implicit dependencies without order control
If job B consumes data produced by job A, make the dependency explicit in the scheduler. Running B before A produces inconsistent or empty data with no visible error in Crestone.
:::

:::warning Unchecked execution history growth
Execution history grows indefinitely if not managed. We recommend keeping no more than **90 days** of active history; archive or purge older records to avoid impacting the performance of Crestone's internal database.
:::

---

## Monitoring and Alerts

Crestone notifies the outcome of each job execution. For full environment observability, complement Crestone alerts with server-level monitoring tools.

### Alerts available in Crestone

| Event | Description |
|---|---|
| Job completed successfully | Success notification sent when the execution finishes without errors. |
| Job completed with errors | Failure notification with details of the node or step that caused the error. |

### Metrics to monitor at the server level

The following metrics are not visible within Crestone and must be configured using OS or infrastructure tools (e.g. Prometheus, Grafana, Azure Monitor, CloudWatch):

| Metric | Recommended threshold |
|---|---|
| CPU usage | Alert if sustained above 80 % for more than 15 minutes during active job execution. |
| Available RAM | Alert if it drops below 2 GB at any point during active execution. |
| Disk space | Alert if free space falls below 15 %, especially on the partition hosting Crestone's internal database. |

:::tip Periodic review
Review your scheduling configuration monthly or whenever data volume changes significantly. The hardware thresholds above assume stable load; a 2× growth in data volume may require upgrading to the next server profile.
:::
