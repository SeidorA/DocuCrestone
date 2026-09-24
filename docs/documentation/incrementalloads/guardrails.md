---
title: "Before extracting large tables"
sidebar_position: 1
---

Running a **Full** extraction (no filters) on a large table — for example `CDHDR` or another
log/history table — can take many hours and consume the entire operational window. Before
scheduling a load like this:

1. **Never run the full history in one shot** on the first attempt. Start with a small range (a
   day or a week) and measure rows, duration, and resource consumption.
2. **Apply date filters** (for example `UDATE`/`UTIME` on change tables) to narrow the volume
   before scaling up the range.
3. **Increase the range gradually** once the small range has run successfully, and schedule
   heavy loads outside the client's critical hours.
4. For recurring loads, evaluate **incremental or CDC** (see the previous sections) instead of
   repeating a Full every time — it avoids reprocessing the whole history on every run.
5. If a load gets stuck, cancel it from **Monitor** before restarting any service.

## Another option: splitting the load into sub-ranges with Batch by Field

For tables and reports, Crestone has a **Batch by field** feature that splits the extraction into
sub-ranges (by date or by the values of a field) instead of pulling everything in a single call —
another way to avoid the same problem. We won't repeat it here, see:

- [Batch by Field — Tables](../sections/nodes/setupsource/tables/Batch.md)
- [Batch Data — Reports](../sections/nodes/setupsource/reports/Batch.md)
