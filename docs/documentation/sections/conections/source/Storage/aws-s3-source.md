---
slug: "aws-s3"
title: "AWS S3 Source Connection"
description: "AWS S3 Source Connection"
sidebar_position: 13
sidebar_label: "AWS S3"
useBrand: true
iconName: "AWS"
---

## Prerequisites

Before configuring the AWS S3 source connection in Crestone, make sure you have the following:

**Main Requirement:** An active **AWS S3 bucket** containing the files you want to extract. Crestone connects using an **IAM access key** (Access Key ID + Secret Access Key) — no EC2 instance roles or temporary session tokens are required.

> **Note:** Crestone uses the `boto3` SDK in standard client mode. No additional client libraries or on-premises gateway are required.

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
| **Bucket Name** | Name of the S3 bucket (e.g. `my-data-lake`) |
| **Region** | AWS region where the bucket is hosted (e.g. `us-east-1`) |
| **Access Key ID** | IAM user access key ID (e.g. `AKIAIOSFODNN7EXAMPLE`) |
| **Secret Access Key** | IAM user secret access key associated with the above key ID |

> **Tip:** You can use the same AWS credentials for both **source** (file extraction) and **destination** (file upload) — Crestone treats them as separate connection types when you create them, but they accept the same credentials format.

---

## Pre-Verification Step

Before configuring the connection in Crestone, verify your credentials and bucket access using the AWS CLI or the AWS Console:

1. In the **AWS Console**, go to **S3** and confirm the target bucket exists and contains the files you want to extract.
2. Go to **IAM** → **Users** → your user → **Security credentials** and confirm the access key is **Active**.
3. Verify the IAM user has at least the following S3 permissions on the bucket:
   - `s3:HeadBucket`
   - `s3:ListBucket`
   - `s3:GetObject`

A minimal IAM policy for Crestone source access:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:HeadBucket",
        "s3:ListBucket",
        "s3:GetObject"
      ],
      "Resource": [
        "arn:aws:s3:::my-data-lake",
        "arn:aws:s3:::my-data-lake/*"
      ]
    }
  ]
}
```

---

## Configuration Steps

Follow these steps to create a new AWS S3 source connection in Crestone:

1. Navigate to **Connections** in the top navigation bar.
2. Select the **Source** tab.
3. Click the **+** button to create a new connection.
4. Fill in the **Connection Name** field with a descriptive name (e.g. `AWS S3 - Data Lake`).
5. In the **Source Type** dropdown, select **AWS**.
6. Complete the credentials form:
   - **Bucket Name** — the name of the S3 bucket
   - **Region** — the AWS region where the bucket is hosted
   - **Access Key ID** — the IAM access key ID
   - **Secret Access Key** — the IAM secret access key
7. Click **Test Connection** to validate that Crestone can reach the bucket.
8. Once the test passes, click **Create Source** to save the connection.

---

## Editing an Existing Connection

To update the credentials of an existing AWS S3 source connection:

1. Navigate to **Connections** and find your AWS S3 source.
2. Click **Edit**.
3. Modify the desired fields in the credentials form.
4. Click **Test Connection** to verify the new credentials.
5. Click **Confirm** to save the changes.

---

## Using AWS S3 as a Source in an Extraction Node

Once the connection is created, you can use it as the source of an Extraction Node. AWS S3 uses a **bucket/object** model — there are no schemas or tables.

1. Open or create an **Extraction Node** and go to the **Source** tab.
2. In **Select Source**, choose your AWS S3 connection.
3. The **Bucket** displayed is the one stored in the connection credentials — it cannot be changed here.
4. (Optional) Use the **Folder / prefix filter** field to narrow down the file list (e.g. `data/2026/`) and click **Filter**.
5. In **File**, choose the object to extract. Only files with a supported extension are listed.
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

Column names are automatically sanitized before extraction: special characters are replaced with `_`, names cannot start with a digit, and duplicate names are de-duplicated (e.g. `name`, `name_1`). This ensures compatibility with all supported destinations (SQL Server, Snowflake, Oracle, PostgreSQL, etc.).

---

## Common Issues

| Issue | Possible Cause | Solution |
|-------|---------------|----------|
| `Test connection fails` with `403 Forbidden` | IAM user lacks `s3:HeadBucket` permission | Attach the minimal IAM policy described in the Prerequisites section |
| `Test connection fails` with `NoSuchBucket` | Wrong bucket name or region | Verify the bucket name and region in the AWS Console |
| No files listed in the bucket | All files have unsupported extensions, or the prefix filter is too restrictive | Clear the prefix filter; confirm the bucket has `.csv`, `.tsv`, `.json`, `.parquet`, `.xlsx`, or `.xls` files |
| File list is very long and slow to load | Large bucket with many objects | Use the **prefix filter** to narrow the listing to a specific folder (e.g. `reports/2026/`) |
| Preview shows "No data found" for an Excel file | Wrong sheet name or format mismatch | Leave **Sheet name** blank to use the first sheet, or verify the sheet name spelling |
| Job execution fails after a successful preview | Transient S3 access issue or object deleted between preview and execution | Re-run the job; verify the object still exists in the bucket |
| `InvalidAccessKeyId` on Test Connection | Access Key ID is incorrect or the key has been deleted | Regenerate the access key in IAM → Users → Security credentials |
| `SignatureDoesNotMatch` on Test Connection | Secret Access Key is incorrect | Re-copy the **Secret Access Key** exactly as shown when the key was created (it cannot be retrieved again from AWS Console) |

---

## Required Permissions

Crestone only performs **read operations** when using S3 as a source:

| Operation | AWS API call |
|-----------|-------------|
| Test connection | `s3:HeadBucket` |
| List objects in the bucket | `s3:ListBucket` |
| Download an object for preview/extraction | `s3:GetObject` |

No write permissions (`s3:PutObject`, `s3:DeleteObject`) are needed for source-only connections. If you also use the same bucket as a **destination**, add `s3:PutObject` to the policy.

> **Tip:** For stronger security, create a dedicated IAM user with read-only access to the specific bucket used by Crestone as a source, separate from the IAM user used for S3 destination connections.
