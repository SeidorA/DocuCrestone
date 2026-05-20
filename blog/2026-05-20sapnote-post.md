---
slug: sap-note-3255746-data-integration
title: SAP-Compliant Data Extraction with CRESTONE - SAP Note 3255746 (EN)
description: What Every Data Integration Team Needs to Know
authors: [Martin]
tags: [SAP]
---

![Imagen de SAP Note 3255746](/img/blog/note3.png)

## What Every Data Integration Team Needs to Know

If your organization extracts data from SAP to external analytics or storage platforms, you've likely heard of SAP Note 3255746. And if you haven't, now is the time to pay attention: starting June 2026, SAP will technically block one of the most widely used data integration approaches — ODP access via RFC from non-SAP systems.

<!--truncate-->

In this article, we explain what this means in practice, what alternatives exist, and how CRESTONE allows you to keep your SAP pipelines running without interruption and in full compliance with SAP's guidelines.

---

## The Context: What Is Changing and Why?

Historically, many data integration tools used the ODP Data Replication API (ODP-RFC) to extract data from SAP. The issue is that SAP designed this interface exclusively for transfers between SAP systems — not to connect SAP with external tools such as BI platforms, data warehouses, or data lakes.

With Version 11 of the note, published on **April 21, 2026**, SAP formalized this restriction with clearer and more direct terms:

- ODP-RFC is for **exclusive use between SAP applications**.
- Its use by third-party tools or custom developments in on-premises or private cloud environments is **explicitly prohibited**.
- Any incident resulting from unauthorized use of ODP-RFC is the **customer's responsibility**, not SAP's.

On top of this, in **June 2026** SAP will roll out a security patch that will automatically block ODP-RFC calls originating from external systems. This is not a recommendation — it is a technical change that will leave non-compliant integrations broken. The right time to review and adapt your integration architecture is now, while there is still enough time to do it in an orderly way.

---

## An Important Clarification

It is worth pausing here, because this point causes a great deal of confusion.

**The note does not prohibit RFC as a protocol.** RFC remains a fully valid communication mechanism and will continue to work. What is restricted is solely the **ODP Data Replication API when accessed via RFC from applications external to SAP**.

This means that if you currently extract data using tables, CDS views, BAPIs, or function modules over RFC, those integrations **are not affected** and can continue without any changes.

---

## How to Know If You Are Exposed

SAP published **Note 3439624**, which includes an automated self-assessment tool. This tool allows you to audit ODP-RFC usage across your system landscape and is the recommended starting point for any organization that wants to understand its actual exposure before taking action.

CRESTONE also includes a built-in compliance function that directly identifies which extractions configured in the platform are using ODP, without the need to review each configuration manually.

---

## The Alternatives: What to Use Instead of ODP-RFC

The key takeaway is this: **ODP-RFC is being replaced — not SAP integration as a whole**. CRESTONE offers several components that cover the same use cases efficiently and in full compliance with SAP:

**Table with CDS View support** is the natural choice when current extractions are based on ABAP CDS views. It provides direct access to these views — including parameterized variants and CDS entities — without going through ODP.

**ODP OData** enables access to SAP Extractors/Datasources that have been exposed as OData services from the SAP side (via transaction SEGW). This mechanism uses HTTP/OData — not ODP-RFC — making it fully compliant with the note. It requires the customer's SAP Basis team to create and publish the OData service for each source object; CRESTONE connects to the service once it is available. It is important to verify that the extractor is ODP-enabled in RSA5/RSA6 and that the SAP Gateway Foundation component (SAP_GWFND) is installed.

---

## CDC (Change Data Capture)

CRESTONE offers three mechanisms for capturing changes (delta), all operating outside of ODP-RFC and without direct database access:

**Table CDC** natively detects Inserts and Updates at the table level through incremental logic based on control columns (timestamp, modification field). It is the recommended mechanism for most SAP table replication scenarios.

**Native delta from Extractors via ODP OData:** when the SAP Extractor/Datasource is delta-capable and has been exposed as an OData service, CRESTONE can leverage its native delta mechanism to retrieve only the records that are new or modified since the last extraction.

**Date variables in CRESTONE:** for source objects that do not support native delta, CRESTONE allows configuring date variables that filter records on each execution based on date/time fields in the SAP source object. This logic is managed entirely within CRESTONE, with no modifications required on the SAP system.

---

## Reference Table: Source Objects and Their Alternatives in CRESTONE

| ODP Source Object                   | Recommended Alternative                          |
|-------------------------------------|--------------------------------------------------|
| ABAP Core Data Services [ABAP_CDS]  | Table with CDS View                              |
| Datasources / Extractors [SAPI]     | ODP OData (requires configuration in SAP Basis)  |
| SAP LT Queue Alias [SLT]            | Table, Table CDC                                 |

All other CRESTONE components — Table, Table CDC, BAPI, and Query — **are not affected by the note and can continue operating without restrictions**.

---

## Action Plan: Three Concrete Steps

**Step 1 — Diagnose before migrating.**
Use the SAP Note 3439624 tool to map ODP-RFC usage in your system. In parallel, review which active extractions in CRESTONE are using ODP. Without this diagnosis, any migration plan will be incomplete.

**Step 2 — Prioritize by impact.**
Not all extractions carry the same weight in production. Identify which ones are critical and start the migration there, leaving less urgent cases for a second phase.

**Step 3 — Choose the right component for each scenario.**
Following the logic of the table above: CDS views → Table with CDS View; table replication → Table CDC; Extractors/Datasources → ODP OData (after the service is published by SAP Basis).

---

## In Summary

SAP Note 3255746 is not a threat to SAP data integration — it is an opportunity to organize and modernize the extraction architecture. The alternatives available in CRESTONE not only comply with the new guidelines, but in most cases offer better performance and lower operational complexity than ODP-RFC.

The time to act is now. The June 2026 patch will not wait, and a well-planned migration is far less costly than an unplanned production outage.

---

## Frequently Asked Questions

**Are my existing table extractions affected?**
No. Table, Table CDC, BAPI, and Query are not affected by the note.

**Can I keep using ODP via RFC while I wait to migrate?**
Technically yes, until June 2026. But once the security patch is applied, unauthorized calls will be actively blocked. Leaving this to the last minute is not advisable.

**How complex is migrating to ODP OData for Extractors?**
It requires SAP Basis to create and publish an OData service for each source object from transaction SEGW. Once the service is published, CRESTONE can connect to it without significant complexity. It is important to verify beforehand that the extractor is ODP-enabled and that SAP Gateway Foundation is installed.

**Does RFC as a protocol still work?**
Yes, completely. The note does not affect RFC in general — only the specific use of the ODP Data Replication API via RFC from external systems.

**How do I identify my ODP extractions in CRESTONE?**
CRESTONE includes a built-in compliance function that displays all active ODP-based extractions, allowing you to act immediately and with precision.

---

*Have questions about how this applies to your system landscape? The SEIDOR Analytics team can help you assess your situation and define the most suitable migration path.*
