---
title: "GCP Cloud Storage Source Connection"
slug: "gcp-storage"
sidebar_label: "GCP Storage"
sidebar_position: 14
useBrand: true
iconName: "GoogleStorage"
---
## Prerequisites

Before configuring the GCP Cloud Storage source connection in Crestone, make sure you have the following:

**Main Requirement:** An active **GCP Cloud Storage bucket** containing the files you want to extract. Crestone connects using a **service account JSON key** — no user accounts or OAuth browser flows are required.

> **Note:** Crestone uses the `google-cloud-storage` SDK with `Client.from_service_account_info()`. No additional client libraries or on-premises gateway are required.

**Supported file formats:**

| Format | Extension | Notes |
|--------|-----------|-------|
| CSV | `.csv` | Configurable delimiter and header row |
| TSV | `.tsv` | Tab-delimited, same options as CSV |
| JSON | `.json` | Array of flat objects |
| Parquet | `.parquet` | Schema read directly from the file |
| Excel (Open XML) | `.xlsx` | Read via `openpyxl`; optional sheet name |
| Excel (97-2003) | `.xls` | Read via `xlrd`; optional sheet name |

Other file types (e.g. `.txt`, `.zip`, `.gz`) are not listed when browsing the bucket.

**Required Information:**

| Field | Description |
|-------|-------------|
| **Service Account JSON** | The full JSON key file downloaded from GCP — drag-and-drop it into the credentials form |
| **Project ID** | Extracted automatically from the JSON key; identifies the GCP project |

> **Tip:** You can use the same service account for both **source** (file extraction) and **destination** (file upload) if the account has the necessary permissions on both operations. Crestone treats them as separate connection types when you create them.

---

## Pre-Verification Step

Before configuring the connection in Crestone, verify your service account and bucket access in the GCP Console:

1. Go to **Cloud Storage** in the GCP Console and confirm the target bucket exists and contains the files you want to extract.
2. Go to **IAM & Admin** → **Service Accounts** and confirm the service account exists and has an active key.
3. Verify the service account has the required permissions (see [Required Permissions](#required-permissions) below).

**Creating a service account key (if you don't have one):**

1. Go to **IAM & Admin** → **Service Accounts**.
2. Select (or create) the service account that Crestone will use.
3. Click **Keys** → **Add key** → **Create new key** → **JSON**.
4. Download the `.json` file — this is what you upload into Crestone.

> **Important:** Keep the JSON key file secure. It grants access to your GCP project. Revoke it from **IAM & Admin → Service Accounts → Keys** if it is ever compromised.

---

## Configuration Steps

Follow these steps to create a new GCP Cloud Storage source connection in Crestone:

1. Navigate to **Connections** in the top navigation bar.
2. Select the **Source** tab.
3. Click the **+** button to create a new connection.
4. Fill in the **Connection Name** field with a descriptive name (e.g. `GCP Storage - Data Lake`).
5. In the **Source Type** dropdown, select **GCP Storage**.
6. In the credentials form, drag and drop (or click to browse) your **service account JSON key file**. The **Project ID** is filled in automatically.
7. Click **Test Connection** to validate that Crestone can reach the GCP project.
8. Once the test passes, click **Create Source** to save the connection.

---

## Editing an Existing Connection

To update the credentials of an existing GCP Cloud Storage source connection:

1. Navigate to **Connections** and find your GCP Storage source.
2. Click **Edit**.
3. Drop the new service account JSON key file into the credentials area.
4. Click **Test Connection** to verify the new credentials.
5. Click **Confirm** to save the changes.

---

## Using GCP Cloud Storage as a Source in an Extraction Node

Once the connection is created, you can use it as the source of an Extraction Node. GCP Cloud Storage uses a **bucket/blob** model — there are no schemas or tables.

1. Open or create an **Extraction Node** and go to the **Source** tab.
2. In **Select Source**, choose your GCP Cloud Storage connection.
3. In **Bucket**, select the GCS bucket you want to read from. All buckets accessible to the service account are listed.
4. (Optional) Use the **Folder / prefix filter** field to narrow down the file list (e.g. `data/2026/`) and click **Filter**.
5. In **File**, choose the blob (object) to extract. Only files with a supported extension are listed.
6. **File format** is auto-detected from the file extension but can be overridden:
   - For **CSV/TSV**: set the **Delimiter** and toggle **File has header row**.
   - For **Excel** (`.xlsx`/`.xls`): optionally set the **Sheet name** (leave blank to use the first sheet).
   - **JSON** and **Parquet** require no additional options.
7. The summary card shows the selected bucket/file, detected format, and chosen options.
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

Column names are automatically sanitized before extraction: special characters are replaced with `_`, names cannot start with a digit, and duplicate names are de-duplicated (e.g. `name`, `name_1`). This ensures compatibility with all supported destinations (SQL Server, Snowflake, Oracle, PostgreSQL, etc.).

---

## Common Issues

| Issue | Possible Cause | Solution |
|-------|---------------|----------|
| Test connection fails with authentication error | Invalid or expired service account key | Generate a new key in **IAM & Admin → Service Accounts → Keys** |
| Bucket dropdown is empty | Service account lacks `storage.buckets.list` at the project level | Grant the **Storage Object Viewer** role (or `roles/storage.admin`) to the service account at the **project** level in **IAM & Admin → IAM** |
| File dropdown is empty with a red error box | Service account lacks `storage.objects.list` on the specific bucket | Grant the **Storage Object Viewer** role to the service account on the **bucket** in **Cloud Storage → Bucket → Permissions** |
| No files listed in the bucket | All files have unsupported extensions, or the prefix filter is too restrictive | Clear the prefix filter; confirm the bucket has `.csv`, `.tsv`, `.json`, `.parquet`, `.xlsx`, or `.xls` files |
| File list is very long and slow to load | Large bucket with many objects | Use the **prefix filter** to narrow the listing to a specific folder (e.g. `reports/2026/`) |
| Preview shows "No data found" for an Excel file | Wrong sheet name or format mismatch | Leave **Sheet name** blank to use the first sheet, or verify the sheet name spelling |
| Job execution fails after a successful preview | Transient GCS access issue or blob deleted between preview and execution | Re-run the job; verify the blob still exists in the bucket |
| `Invalid JSON` when uploading the key file | File is not a valid GCP service account JSON key | Download a fresh JSON key from **IAM & Admin → Service Accounts → Keys** |

---

## Required Permissions

Crestone requires **two separate levels of permission** on GCP when using Cloud Storage as a source:

### Project-level (for the bucket dropdown)

| Operation | GCP permission |
|-----------|---------------|
| List all accessible buckets | `storage.buckets.list` |

Grant this at the **project level** in **IAM & Admin → IAM** by assigning one of:
- `roles/storage.objectViewer` (recommended minimum)
- `roles/storage.admin`

### Bucket-level (for file listing and download)

| Operation | GCP permission |
|-----------|---------------|
| List blobs in a bucket | `storage.objects.list` |
| Download a blob for preview/extraction | `storage.objects.get` |

Grant this at the **bucket level** in **Cloud Storage → [bucket name] → Permissions** by assigning:
- `roles/storage.objectViewer` on the specific bucket

> **Important:** Having project-level `storage.buckets.list` does **not** automatically grant `storage.objects.list` on all buckets. Each bucket must grant list+get permissions separately unless the role is assigned at the project level.

> **Tip:** For stronger security, grant the service account `Storage Object Viewer` at the project level (covers both bucket listing and object access across all buckets in the project) rather than managing per-bucket ACLs individually.
