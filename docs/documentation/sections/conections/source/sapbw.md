---
title: "SAP BW"
slug: sap-bw
sidebar_label: "SAP BW"
iconName: "SAP"
useBrand: true
sidebar_position: 3
hide_table_of_contents: true
---


## Prerequisites

Before configuring the SAP BW source connection in Crestone, make sure you have the following:

**Main Requirement:** An SAP BW system (classic BW-on-ABAP or BW/4HANA running in BW mode) reachable via **RFC**. Crestone connects using the SAP JCo library through the `crestone-abap-ms` microservice — the exact same RFC destination mechanism used by the SAP ABAP connector (application server host, instance number, client, user, password). No additional database driver or gateway is required beyond standard SAP RFC connectivity.

> **Note:** This connector targets InfoProviders (InfoCubes/MultiProviders), BEx Queries, and InfoObject master data exposed on the ABAP stack. It does not read HANA-native composite providers modeled purely via CDS views — that is a different connector.

---

### SAP-side Prerequisites (RFC user authorizations)

The RFC user Crestone connects with needs:

| Authorization Object | Field / Value | Purpose |
|---|---|---|
| `S_RFC` | `RFC_TYPE = FUGR`, `RFC_NAME` including `RSR_MDX`, `BAPI_MDPROVIDER`, `SDTX` (`RFC_READ_TABLE`) | Execute the RFC function modules Crestone calls: `RSR_MDX_CREATE_OBJECT`/`RSR_MDX_GET_FLAT_DATA` (data extraction), `BAPI_MDPROVIDER_GET_DIMENSIONS`/`GET_MEMBERS`/`GET_VARIABLES` (metadata), `RFC_READ_TABLE` (InfoProvider/Query discovery) |
| `S_TABU_DIS` (or `S_TABU_NAM`) | Scoped to `RSDCUBE`, `RSZCOMPDIR`, `RSDIOBJ` | InfoProvider/Query/InfoObject discovery via `RFC_READ_TABLE` (same mechanism the SAP ABAP connector already uses for `DD02L`) |
| `S_RS_ICUBE` | `ACTVT = 03` (Display) | Read access to InfoCubes/InfoProviders |
| `S_RS_COMP` / `S_RS_COMP1` | `ACTVT = 16` (Execute), scoped to the relevant `INFOCUBE`/`COMPID` | Execute BEx queries via the `BAPI_MDPROVIDER_*` family and MDX |

> **Tip:** Start with a read-only custom role scoped to the objects above rather than granting broad SAP_ALL-style access. See "Required Permissions" below for a minimal role summary.

---

## Pre-Verification Step

Before configuring the connection in Crestone, verify RFC connectivity and authorization directly in SAP:

1. In SAP GUI, run transaction **SM59**, locate (or create) an RFC destination with the same host/instance/client/user credentials you'll use in Crestone.
2. Click **Connection Test** — confirms basic RFC reachability.
3. Click **Authorization Test** — confirms the RFC user can log on and surfaces any missing authorization objects immediately.
4. Optionally, run transaction **SE37** and test-execute `RSR_MDX_CREATE_OBJECT` (submit a simple MDX `SELECT` against a known InfoProvider) followed by `RSR_MDX_GET_FLAT_DATA` with the returned `DATASETID`, to confirm the user can read InfoProvider data before wiring up Crestone.

A successful Authorization Test plus a successful `RSR_MDX_CREATE_OBJECT`/`RSR_MDX_GET_FLAT_DATA` test call are strong signals the Crestone connection will work.

---

## Configuration Steps

Follow these steps to create a new SAP BW source connection in Crestone:

1. Navigate to **Connections** in the top navigation bar.
2. Select the **Source** tab.
3. Click the **+** button to create a new connection.
4. Fill in the **Connection Name** field with a descriptive name (e.g. `SAP BW Production`).
5. In the **Source Type** dropdown, select **SAP BW**.
6. Complete the credentials form:
   - **Host Address** — application server host (`ashost`)
   - **Instance Number** — two-digit system number (`sysnr`)
   - **User** — RFC user
   - **Client Number** — three-digit client (`client`)
   - **SAP Router** *(optional)* — SAProuter string if the system is reachable only through one
   - **Password**
   - **Select Language** — logon language (defaults to English)
7. Click **Test Connection** to validate that Crestone can open an RFC connection.
8. Once the test passes, mark the connection as **Productive** if it should be schedulable, then click **Create Source** to save it.

---

## Editing an Existing Connection

To update the credentials of an existing SAP BW source connection:

1. Navigate to **Connections** and find your SAP BW source.
2. Click **Edit**.
3. Modify the desired fields in the credentials form.
4. Click **Test Connection** to verify the new credentials.
5. Click **Confirm** to save the changes.

---

## Using SAP BW as a Source in an Extraction Node

Once the connection is created, you can use it as the source of an Extraction Node. SAP BW uses an **OLAP model** — there are no tables, only InfoProviders and Queries exposing characteristics (dimensions) and key figures (measures).

1. Open or create an **Extraction Node** and go to the **Source** tab.
2. In **Select Source**, choose your SAP BW connection.
3. Choose the **Extraction Type**: **InfoProvider (Cube)**, **BEx Query**, or **InfoObject (Master Data)**.
   - For InfoProvider extraction, select the technical name of the InfoCube or MultiProvider.
   - For Query extraction, select the technical name of a released BEx query.
   - For InfoObject extraction, select the technical name of a characteristic that has **"Characteristic is InfoProvider"** enabled — see the dedicated subsection below.
4. Select the **Characteristics** (dimension fields) and **Key Figures** (measure fields) to include. The extracted result has one row per unique combination of selected characteristics, with key figures as additional columns — the same flattening behavior as Theobald xtract Universal's BWCUBE extraction.
5. **Include totals / aggregates** (unchecked by default) — each selected characteristic's hierarchy has a root "All ..." aggregate member alongside its real detail values. Leave this unchecked to extract only detail-level rows (recommended for most extraction use cases); check it to also include the aggregate row per characteristic.
6. Optionally add **Variables / Selections** to restrict the data — each row is `{field or query variable, sign, option, low, high}`, the same select-options semantics used throughout Crestone's SAP ABAP connector:
   - **Sign**: Include or Exclude
   - **Option**: Equal, Between, Contains Pattern, Greater/Less or Equal
   - **Low / High**: the value(s) to restrict on (High only applies to range options like Between)
7. The **Preview** panel shows a sample of the flattened data before running a full extraction.

> **Note:** For BEx Queries, the "Variables / Selections" section also lists the query's declared OLAP variables (name, description) as a reference — enter matching rows using the same field to supply a value for that variable.

### InfoObject (Master Data) Extraction

This extraction type reads a characteristic's own **master data** (its key, texts, and navigational attributes) rather than transactional data from a cube or query. This is possible only when the characteristic has **"Characteristic is InfoProvider"** enabled in SAP (RSD1/RSA1), which publishes its master data as a queryable object.

1. Select **InfoObject (Master Data)** as the Extraction Type.
2. In the **InfoObject** search box, find and select the characteristic (e.g. `/ERP/COMPCODE`). Unlike InfoProvider/Query, there is no separate "Characteristics" picker for this type — the selected InfoObject is automatically the sole characteristic.
3. In **Attributes / Properties**, select which master-data fields to extract — this reuses the "Key Figures" list UI, relabeled for this type. Each entry is one of the characteristic's own key/text fields (e.g. "Key", "Medium Name") or a navigational attribute's key/text (e.g. "Chart of Accounts (Key)", "Country (Name)"). A **"Select all available"** checkbox toggles every listed property at once.
4. "Include totals / aggregates" and "Variables / Selections" do not apply to master data and are hidden for this type — master-data extraction always returns every member with no aggregate row and no variable restrictions.
5. **Preview** and **full extraction** work exactly as with the other two types.

---

## Data Type Handling

SAP BW characteristics and key figures are extracted and written as **text (string) columns** in this initial version, regardless of their underlying SAP data type:

| BW Field Type | Written As | Notes |
|---|---|---|
| Characteristic (`CHAR`) | `string` | Includes master-data attributes like `0MATERIAL`, `0CUSTOMER` |
| Date characteristics (`0CALDAY`, `0FISCPER`, etc.) | `string` | Preserved in their raw internal format (e.g. `YYYYMMDD`, fiscal period codes) — not converted to display format |
| Key figure (`DEC`, `CURR`, `QUAN`) | `string` | Currency (`CURR`) and quantity (`QUAN`) key figures are written as-is; the reference currency/unit is **not** automatically appended as a separate column — include the relevant reference characteristic explicitly if you need it |

> **Why strings for everything:** SAP BW returns key figures as locale-formatted display values (currency symbol, thousands/decimal separators, e.g. `"$ -10.744.436,30"`), not raw numbers — and that formatting depends on the requesting user's SAP logon language, which isn't guaranteed to be consistent across systems or users. Treating all columns as text avoids silently corrupting numeric values during that conversion; downstream destinations can cast columns to numeric types in their own transformation step. Native numeric typing is a planned improvement.

---

## How Extraction Types Are Addressed Internally

Crestone builds and executes the underlying OLAP query automatically based on the Extraction Type and fields you select — you never need to write this yourself. This section is a brief reference for advanced troubleshooting (e.g. interpreting an SAP-side error message), not something you need to configure.

- **InfoProvider (Cube):** queries the InfoCube or MultiProvider directly by its technical name.
- **BEx Query:** queries the released query by its full technical name (InfoProvider + query name).
- **InfoObject (Master Data):** queries the characteristic's own master data, returning every member with its selected attributes/properties — no aggregate row, no restrictions.
- **Include totals / aggregates:** when unchecked (default), only leaf-level detail rows are returned for InfoProvider/Query extraction; checking it also includes each characteristic's "All ..." aggregate row.
- **Variables / Selections:** mandatory or optional BEx query variables are supplied as `{sign, option, low, high}` rows, the same select-options semantics used throughout Crestone's SAP connectors.
- **Output column names:** where SAP's own technical field name isn't presentable (e.g. some BEx Query key figures are internally addressed by a system-generated ID), Crestone substitutes the field's description as the column name automatically.

---

## Common Issues

| Issue | Possible Cause | Solution |
|---|---|---|
| `RSR_MDX_CREATE_OBJECT not found` / `not authorized` | RFC user lacks `S_RFC` for the `RSR_MDX`/`BAPI_MDPROVIDER` function group, or the function module isn't released for RFC on this BW release | Check `S_RFC` authorization; confirm the function module is remote-enabled via SE37 |
| Empty InfoProvider list | InfoProvider is inactive (`OBJVERS ≠ 'A'`) or `S_TABU_DIS` doesn't cover `RSDCUBE` | Activate the InfoProvider in RSA1; check table authorization |
| Empty BEx Query list | No queries released for the searched InfoProvider, or `S_TABU_DIS` doesn't cover the query catalog table | Confirm the query is released for external access in RSRT/RSZC; check table authorization |
| `"The requested query ... does not exist"` | The selected query name doesn't exist on this system, or wasn't released for external access | Re-select the query from the picker; confirm it's released in RSRT/RSZC |
| `"Value <X> for characteristic <X> unknown"` or `"Dimension <X> unknown"` | The characteristic or key figure wasn't picked up correctly during field discovery | Re-open the extraction node's Source tab and re-select the affected fields from the picker rather than typing them manually |
| Query returns **zero rows with no error at all** | The InfoProvider/Query genuinely has no data matching the current field/variable selection, or a field/measure combination isn't valid together | Try previewing with fewer fields selected to narrow down which combination causes the empty result; verify the same combination returns data in SAP GUI's `MDXTEST`/RSRT |
| Unexpected MDX/syntax error from SAP not covered above | An edge case in field/variable selection not yet handled | Contact support with the exact SAP error text and the extraction node's configuration |
| `BAPI_MDPROVIDER_*` call fails | RFC user lacks `S_RS_COMP`/`S_RS_COMP1` for the target InfoProvider/query | Grant execute authorization scoped to the relevant `INFOCUBE`/`COMPID` |
| Variable value rejected | The `sign`/`opt` combination doesn't match the variable's declared selection type (e.g. sending a range to a single-value variable) | Check the variable's type in the query definition and adjust `opt` accordingly (`EQ` for single value, `BT` for a range) |
| Authorization error surfaces as a generic 500 | Missing authorization details weren't captured from the JCo exception | Check the `crestone-abap-ms` container logs — the RFC exception text (`ABAP_EXCEPTION`/`SYSTEM_FAILURE`) usually names the missing authorization object directly |
| Empty "Attributes / Properties" list for an InfoObject | The characteristic does **not** have "Characteristic is InfoProvider" enabled, so `BAPI_MDPROVIDER_GET_PROPERTIES` has nothing to return for it | Enable "Characteristic is InfoProvider" for that InfoObject in RSD1/RSA1, or pick a different characteristic that already has it enabled |
| `BAPI_MDPROVIDER_GET_PROPERTIES not found` / `not authorized` | Same function group as `GET_DIMENSIONS`/`GET_MEMBERS`/`GET_VARIABLES` — RFC user lacks `S_RFC` for `BAPI_MDPROVIDER`, or `S_RS_ICUBE`/`S_RS_COMP` scoped to the InfoObject | Check the same authorizations already required for InfoProvider/Query metadata calls |

---

## Required Permissions

Crestone only reads data from SAP BW (source connector). The RFC user needs, at minimum:

- `S_RFC` covering the function groups listed in "SAP-side Prerequisites" above
- `S_RS_ICUBE` with **Display** (`03`) on the InfoProviders to extract
- `S_RS_COMP` / `S_RS_COMP1` with **Execute** (`16`) scoped to the queries to extract
- `S_TABU_DIS` (or `S_TABU_NAM`) read access to `RSDCUBE`, `RSDCUBET`, `RSZCOMPDIR`, `RSZELTTXT` for discovery

> **Tip:** Build a dedicated custom role scoped to these objects rather than reusing a broad BW power-user role — this connector never writes to SAP, so a strictly read-only role is sufficient.