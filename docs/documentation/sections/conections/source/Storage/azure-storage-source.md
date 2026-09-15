---
slug: "azure-storage"
title: "Azure Storage Source Connection"
description: "Azure Storage Source Connection"
sidebar_label: "Azure Storage"
sidebar_position: 14
useBrand: true
iconName: "Azure"
---


## Prerequisites

Before configuring the Azure Storage source connection in Crestone, make sure you have the following:

**Main Requirement:** An active **Azure Storage Account** (Blob Storage) with at least one container holding the files you want to extract. Crestone connects using the account's **access key** — no Azure AD app registration or managed identity is required.

> **Note:** Crestone uses the Azure Storage Blob SDK directly. No additional client libraries or on-premises gateway are required.

**Supported file formats:**

| Format | Extension | Notes |
|--------|-----------|-------|
| CSV | `.csv` | Configurable delimiter and header row |
| TSV | `.tsv` | Tab-delimited, same options as CSV |
| JSON | `.json` | Array of flat objects |
| Parquet | `.parquet` | Schema read directly from the file |
| Excel (Open XML) | `.xlsx` | Read via `openpyxl`; optional sheet name |
| Excel (97-2003) | `.xls` | Read via `xlrd`; optional sheet name |

Other file types (e.g. `.txt`, `.zip`) are not listed when browsing a container.

**Required Information:**

| Field | Description |
|-------|-------------|
| **Account Name** | Name of the Azure Storage account (e.g. `mystorageaccount`) |
| **Account Key** | Access key for the storage account (found in Azure Portal → Storage Account → **Access keys**) |

> **Tip:** You can use the same Azure Storage connection for both **source** (file extraction) and **destination** (file upload) — Crestone treats them as separate connection types when you create them, but they accept the same credentials.

---

## Pre-Verification Step

Before configuring the connection in Crestone, verify the account name and key using **Azure Storage Explorer** or the Azure Portal:

1. In the Azure Portal, go to your **Storage Account** → **Access keys**.
2. Confirm `key1` (or `key2`) is active and copy its value.
3. Open the target **Container** and confirm the files you want to extract are visible and readable.

---

## Configuration Steps

Follow these steps to create a new Azure Storage source connection in Crestone:

1. Navigate to **Connections** in the top navigation bar.
2. Select the **Source** tab.
3. Click the **+** button to create a new connection.
4. Fill in the **Connection Name** field with a descriptive name (e.g. `Azure Storage - Reports`).
5. In the **Source Type** dropdown, select **Azure Storage**.
6. Complete the credentials form:
   - **Account Name** — your Azure Storage account name
   - **Account Key** — the account's access key
7. Click **Test Connection** to validate that Crestone can reach the storage account.
8. Once the test passes, click **Create Source** to save the connection.

---

## Editing an Existing Connection

To update the credentials of an existing Azure Storage source connection:

1. Navigate to **Connections** and find your Azure Storage source.
2. Click **Edit**.
3. Modify the desired fields in the credentials form.
4. Click **Test Connection** to verify the new credentials.
5. Click **Confirm** to save the changes.

---

## Using Azure Storage as a Source in an Extraction Node

Once the connection is created, you can use it as the source of an Extraction Node. Azure Storage uses a **container/file** model — there are no schemas or tables.

1. Open or create an **Extraction Node** and go to the **Source** tab.
2. In **Select Source**, choose your Azure Storage connection.
3. In **Container**, choose the container that holds the file.
4. (Optional) Use the **Folder / prefix filter** field to narrow down the file list (e.g. `data/2026/`) and click **Filter**.
5. In **File**, choose the blob/file to extract. Only files with a supported extension are listed.
6. **File format** is auto-detected from the file extension but can be overridden:
   - For **CSV/TSV**: set the **Delimiter** and toggle **File has header row**.
   - For **Excel** (`.xlsx`/`.xls`): optionally set the **Sheet name** (leave blank to use the first sheet).
   - **JSON** and **Parquet** require no additional options.
7. The summary card shows the selected file, detected format, and chosen options.
8. The **Preview** panel shows a sample of the data that will be extracted.

> **Note:** Excel files are read with `pandas` (`openpyxl` engine for `.xlsx`, `xlrd` engine for `.xls`). All cell values are read as strings to avoid locale-dependent number/date parsing issues; downstream type inference happens at the destination.

---

## Data Type Handling

Type handling depends on the source file format:

| Format | Type behavior |
|--------|---------------|
| CSV / TSV | All columns are read as inferred types by Polars; empty strings, `NULL`, and `null` are treated as missing values |
| JSON | Types inferred from the JSON values (string, number, boolean) |
| Parquet | Native column types are preserved as stored in the file |
| Excel (`.xlsx` / `.xls`) | All cells are read as **strings** (`dtype=str`); blank cells become `null` |

Column names are automatically sanitized before extraction: special characters are replaced with `_`, names cannot start with a digit, and duplicate names are de-duplicated (e.g. `name`, `name_1`). This ensures compatibility with all supported destinations (SQL Server, Snowflake, Oracle, etc.).

---

## Common Issues

| Issue | Possible Cause | Solution |
|-------|---------------|----------|
| `Container not found` | Wrong container name or container deleted | Verify the container exists in the storage account and the name matches exactly |
| No files listed in a container | All files have unsupported extensions, or a prefix filter is too restrictive | Clear the prefix filter; confirm the container has `.csv`, `.tsv`, `.json`, `.parquet`, `.xlsx`, or `.xls` files |
| Preview shows "No data found" for an Excel file | Wrong sheet name, or the file is `.xls` but engine mismatch | Leave **Sheet name** blank to use the first sheet, or verify the sheet name spelling |
| `File contains no valid workbook part` | `.xls` file processed with the `.xlsx` engine | Fixed in current version — Crestone selects the engine (`xlrd` vs `openpyxl`) based on the file extension automatically |
| Job execution fails after a successful preview | Destination connector reading the extracted file as CSV instead of Parquet | Fixed in current version — destination connectors detect `.parquet` files written by Azure Storage extraction and read them accordingly |
| `invalid utf-8 sequence` during upload to a SQL destination | Destination tried to parse a Parquet file as CSV | Same fix as above; ensure you're running the current version of the backend |
| Authentication failed on Test Connection | Wrong account name or key | Re-copy the **Account Key** from Azure Portal → Storage Account → Access keys (`key1` or `key2`) |

---

## Required Permissions

The Azure Storage account key used by Crestone grants full read/write access to the storage account by default (it is a master key, not a scoped credential). For source extraction, Crestone only performs read operations (`list_containers`, `list_blobs`, `download_blob`).

If you want to limit Crestone's access to read-only on specific containers, use a **Shared Access Signature (SAS)** instead of the account key, scoped to:

- **Allowed services:** Blob
- **Allowed resource types:** Container, Object
- **Allowed permissions:** Read, List

> **Note:** SAS tokens are not currently supported by the Crestone Azure Storage connector — only **account name + account key** authentication is supported. If you need scoped access, create a dedicated storage account for the data Crestone will extract.
