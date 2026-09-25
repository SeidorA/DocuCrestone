---
title: Incremental Loads
sidebar_position: 5
---


## Handling Incremental Loads in CRESTONE

When working with large datasets in SAP and external systems, it is often inefficient to extract the entire dataset every time. Instead, **incremental loads** allow you to capture only the records that have changed since the last successful extraction. CRESTONE provides multiple alternatives to implement incremental strategies depending on the business scenario, data source, and technical requirements.

---
## 1. Using Date or Timestamp Fields  

If the source table or view includes a **timestamp or last-change field** (for example, `ERDAT`, `AEDAT` in SAP), **CRESTONE** can automatically filter the extraction based on dynamic date variables.  

### 🔧 Configuration in the Extraction Node  

In the **Source** tab of an Extraction Node:  

1. Create variables to represent your desired date range.  
2. Assign them dynamic expressions using Python syntax wrapped in `{{ ... }}`.  
3. Reference those variables in the **WHERE** clause to control which records are extracted.  

For example:  

| Variable | Expression | Meaning |
|-----------|-------------|----------|
| `@startdate` | ` {{ today().replace(day=1).strftime('%Y%m%d') }}` | First day of the current month |
| `@enddate` | `{{ ((today().replace(day=28) + timedelta(days=4)).replace(day=1) - timedelta(days=1)).strftime('%Y%m%d') }}` | Last day of the previous month |

**WHERE Example:**  
```sql
VBAK-ERDAT >= ‘@startdate’
```

:::warning
Within the Python code for the variable, text strings must be enclosed in single quotes ('...'), not double quotes. Also, when using the variable in the SQL Editor, it is important to enclose '@variable' in single quotes within the WHERE clause to avoid syntax conflicts.
:::

CRESTONE will automatically resolve these variables at runtime during extraction.

---

### ✅ Advantages  
- Simple and flexible — the logic is embedded directly in the extraction node.  
- Allows dynamic filtering without manual date updates.  
- Ensures consistency when scheduling incremental or monthly loads.  

### ⚙️ Considerations  
- The date expressions must be valid **Python syntax** (evaluated within CRESTONE’s runtime).  
- The timestamp field used in the filter (e.g., `ERDAT`, `AEDAT`) should be **reliably updated** and **indexed** in the source system.  
- For **historical loads**, you can define static values (e.g., `20250101`) before switching to dynamic expressions.
- To **avoid potential duplicates**, ensure that the destination table is refreshed or truncated appropriately before each incremental load, especially when overlapping date ranges are used.

![alt text](/img/incremental/incremental_1.1.image.png)

![alt text](/img/incremental/incremental_1.2.image.png)

---

## 2. Delta Extraction with SAP Standard Extractors  

For certain SAP modules (FI, CO, MM, SD, etc.), SAP provides **standard delta-enabled extractors** (e.g., `2LIS_11_VAHDR`, `2LIS_02_HDR`, `0FI_AR_4`).  
These extractors implement native SAP delta logic using **delta queues** and **change pointers**.  
**CRESTONE** integrates directly with these extractors through an **RFC connection**, allowing automatic retrieval of only new or changed records.

---

### 🔧 Configuration in CRESTONE

In the **Extraction Node Configuration**, select:

- **Source:** `SAP ABAP`  
- **Type:** `Extractor`  
- **Context:** `DataSources/Extractors [SAP]`  
- **Extractor:** e.g., `2LIS_11_VAHDR` (Sales Document Header)

Once selected, the node automatically detects whether the extractor supports delta mode.  
When **Delta Update** is enabled, CRESTONE performs:

1. **Initialization** — a full extraction of existing data.  
2. **Delta Loads** — subsequent extractions only for new or changed records.

During initialization, CRESTONE registers a **subscription** in SAP’s delta mechanism.  
You can monitor its status in the node’s **Delta Config** tab:

| Field | Description |
|--------|--------------|
| **Subscription ID** | Unique identifier for the delta subscription in CRESTONE |
| **Subscription name** | Logical name used to identify the delta process |
| **Pointer** | Stores the last extraction checkpoint (SAP delta pointer) |
| **Last execution** | Timestamp of the last successful extraction |

Example (from CRESTONE UI):  
```
Subscription ID: CRb058ffd2-abc6-4ebe-9f2b-fac7fe048591  
Pointer: 20251012003005.000000000  
Last execution: 12/10/2025 00:30:05 UTC
```

This ensures each extraction continues from the last processed delta, maintaining data consistency across runs.

---

### ✅ Advantages  
- SAP-native approach with built-in delta logic.  
- Automatically tracks new and changed records using SAP delta queues.  
- Reduces development and maintenance effort.  
- Integrates seamlessly with CRESTONE’s control tables for pointer management.  

### ⚙️ Considerations  
- Not all extractors support delta updates.  
- The delta queue (`RSA7`) must be properly initialized and monitored in SAP.  
- A reinitialization may be required if the pointer is deleted or if data inconsistencies occur.  

---

### 🧩 Common Examples of Delta-Enabled Extractors  

| Module | Extractor | Description |
|---------|------------|--------------|
| SD | `2LIS_11_VAHDR` | Sales Document Header |
| SD | `2LIS_11_VAITM` | Sales Document Item |
| MM | `2LIS_02_HDR` | Purchase Order Header |
| MM | `2LIS_02_ITM` | Purchase Order Item |
| FI | `0FI_GL_4` | General Ledger Line Items |
| FI | `0FI_AR_4` / `0FI_AP_4` | Accounts Receivable / Payable Line Items |
| CO | `0CO_OM_CCA_1` | Cost Centers – Actual Costs |

---

### 🧭 Delta Pointer Management  

CRESTONE provides a built-in interface to control and monitor the delta pointer directly from the **Delta Config** tab:

| Action | Description |
|---------|--------------|
| **Delete subscription** | Resets the delta initialization. The pointer is set to zero and removed from the control table. Used when you need to reinitialize the extractor. |
| **Update delta without extraction data** | Updates the delta pointer in CRESTONE to match the current SAP delta position without extracting new records. Useful for synchronization or skipping erroneous deltas. |
| **Preview** | Displays a simulation of the next delta load, showing which records would be included before execution. |

This management layer provides transparency and control over the delta lifecycle, without requiring access to transaction `RSA7` or `RSA3` in SAP.

---

### 🧩 Typical Flow in CRESTONE

1. **Initialization:** full data extraction → subscription and pointer created.  
2. **Delta load:** fetches only new/changed records since last pointer.  
3. **Monitoring:** pointer automatically updated after each successful run.  
4. **Reinitialization:** manual pointer reset if needed.  

---

With this setup, CRESTONE ensures robust, auditable, and fully automated **delta extraction** for SAP standard extractors.

![alt text](/img/incremental/incremental_2.1.image.png)

![alt text](/img/incremental/incremental_2.2.image.png)
---

## 3. Table Change Data Capture (CDC) with SAP Change Documents

**CRESTONE** also supports **Change Data Capture (CDC)** at the table level, using SAP's
**change-document framework** and control tables (`CDHDR`, `CDPOS`) or direct table-level
pointers for standard master and transactional data — tracking **inserts, updates, and deletes**
performed on the tables you select.

This is configured directly on the **CDC extraction node** (`Source: SAP ABAP`, `Type: Table CDC`),
which has its own dedicated guide with the step-by-step configuration, the **CDC Config** fields,
and the pointer management actions (**Reset Pointer**, **Update Pointer without Extraction**):

👉 **[Configure a Table CDC node](/docs/documentation/sections/nodes/setupsource/cdc)**

![alt text](/img/incremental/incremental_3.1.image.png)

![alt text](/img/incremental/incremental_3.2.image.png)

---

## 4. Hybrid Approaches  
In complex environments, a **combination of strategies** may be applied. For example:  
- Use **timestamps** for master data tables.  
- Use **SAP Standard Extractors** for transactional data.  
- Use **CDC with change documents** for objects requiring full history of changes.  

---

✅ CRESTONE’s incremental load framework adapts to any SAP module — from simple master data updates to complex transactional histories — while minimizing data transfer and ensuring consistency across loads.
