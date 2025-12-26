---
sidebar_position: 3
iconName: "bolt"
title: "Rapid deployment"
description: "Rapid deployment"
---
import DocCardList from '@theme/DocCardList';

## Rapid deployment

This document focuses on the description and analysis of standard SAP S/4HANA extractors used in Crestone to retrieve information from transactional data across various system modules. Specifically, it will cover extractors from the **Financial Accounting (FI), Materials Management (MM), Sales and Distribution (SD), Controlling (CO), Production Planning (PP), and Project System (PS) modules.**

Details of each available extractor will be provided, including key fields that enable the extraction of specific information such as accounting transactions, material movements, production orders, costs, and project analysis. This document will serve as a technical guide for the proper use of these extractors in generating detailed reports and analysis within SAP S/4HANA, addressing financial, logistics, and operational management aspects.

## **Step by step to get to the extractors**

Once inside Crestone, navigate to the Nodes section. Then, select the "Create New Node" option and click on "New Node."

This will take you to a page where you need to enter the name of the new node and then click the "Next" button. Next, click on "Select a connection for a source" and select the source you previously created with ABAP. **Choosing ABAP is ideal because it is specifically designed to handle structured data from SAP modules. If your data comes from SAP's traditional ERP systems, ABAP ensures seamless integration with the existing business logic and processes. It allows you to manage the data more efficiently, leveraging the customizations and rules already implemented in your SAP system, without needing the complex setup required for HANA.**

Then, click on "Select type" and choose "Extractor." Finally, search for an available extractor in Crestone, which can be found in this same document.



## Modules
### Financial Accounting


<div class="row">
    <div class="col col--6">
      <a class="card padding--lg" href="#fi-master-data-extractors">
        <h3>Master</h3>
        <p>Master data extractors for FI.</p>
      </a>
    </div>
    <div class="col col--6">
      <a class="card padding--lg" href="#fi-transactional-data-extractors">
        <h3>Transactional</h3>
        <p>Transactional data extractors for FI.</p>
      </a>
    </div>
</div>


### Materials Management

<div class="row">
    <div class="col col--6">
      <a class="card padding--lg" href="#master-data-extractors">
        <h3>Master</h3>
        <p>Master data extractors for MM</p>
      </a>
    </div>
    <div class="col col--6">
      <a class="card padding--lg" href="#mm-transactional-data-extractors">
        <h3>Transactional</h3>
        <p>Transactional data extractors for MM.</p>
      </a>
    </div>
</div>


### Sales and Distribution

<div class="row">
    <div class="col col--6">
      <a class="card padding--lg" href="#sd-master-data-extractors">
        <h3>Master</h3>
        <p>Master data extractors for SD</p>
      </a>
    </div>
    <div class="col col--6">
      <a class="card padding--lg" href="#sd-transactional-data-extractors">
        <h3>Transactional</h3>
        <p>Transactional data extractors for SD.</p>
      </a>
    </div>
</div>



### Production Planning

<div class="row">
    <div class="col col--6">
      <a class="card padding--lg" href="#pp-master-data-extractors">
        <h3>Master</h3>
        <p>Master data extractors for PP</p>
      </a>
    </div>
    <div class="col col--6">
      <a class="card padding--lg" href="#pp-transactional-data-extractors">
        <h3>Transactional</h3>
        <p>Transactional data extractors for PP.</p>
      </a>
    </div>
</div>


### Project System

<div class="row">
    <div class="col col--6">
      <a class="card padding--lg" href="#ps-master-data-extractors">
        <h3>Master</h3>
        <p>Master data extractors for ps</p>
      </a>
    </div>
    <div class="col col--6">
      <a class="card padding--lg" href="#ps-transactional-data-extractors">
        <h3>Transactional</h3>
        <p>Transactional data extractors for ps.</p>
      </a>
    </div>
</div>


### Controlling


<div class="row">
    <div class="col col--6">
      <a class="card padding--lg" href="#co-master-data-extractors">
        <h3>Master</h3>
        <p>Master data extractors for CO</p>
      </a>
    </div>
    <div class="col col--6">
      <a class="card padding--lg" href="#co-transactional-data-extractors">
        <h3>Transactional</h3>
        <p>Transactional data extractors for CO.</p>
      </a>
    </div>
</div>



## **Financial Accounting**

The SAP FI (Financial Accounting) module is a core component of the SAP ERP system that manages financial data and processes within an organization. It provides tools for handling general ledger accounting, accounts payable, accounts receivable, asset accounting, and financial reporting. SAP FI integrates seamlessly with other SAP modules, such as CO (Controlling) and MM (Materials Management), enabling real-time financial data management and supporting compliance with international accounting standards.

### FI Master Data Extractors

![a](/img/Conections/estractores/master_fi.png)


#### **Extractor: 0FI\_GL\_6** (General Ledger Master Data)

| **Field Name** | **Description** |
| --- | --- |
| `HKONT` | General Ledger Account |
| `BUKRS` | Company Code |
| `TXT20` | G/L Account Short Text |
| `TXT50` | G/L Account Long Text |
| `XLOEV` | Deletion Indicator for G/L Account |
| `XSKAT` | Account Category |
| `SPRAS` | Language Key |

#### **Extractor: 0FI\_GL\_14** (General Ledger Balances)

| **Field Name** | **Description** |
| --- | --- |
| `HKONT` | General Ledger Account |
| `BUKRS` | Company Code |
| `GJAHR` | Fiscal Year |
| `MONAT` | Fiscal Period |
| `DMBTR` | Balance in Local Currency |
| `WRBTR` | Balance in Document Currency |
| `WAERS` | Document Currency |
| `PRCTR` | Profit Center |

#### **Extractor: 0FI\_AP\_4** (Accounts Payable Master Data)

| **Field Name** | **Description** |
| --- | --- |
| `LIFNR` | Vendor Number |
| `BUKRS` | Company Code |
| `NAME1` | Vendor Name |
| `LAND1` | Country |
| `KTOKK` | Vendor Account Group |
| `XLOEV` | Deletion Indicator for Vendor |
| `SPRAS` | Language Key |

#### **Extractor: 0FI\_AR\_4** (Accounts Receivable Master Data)

| **Field Name** | **Description** |
| --- | --- |
| `KUNNR` | Customer Number |
| `BUKRS` | Company Code |
| `NAME1` | Customer Name |
| `LAND1` | Country |
| `KTOKD` | Customer Account Group |
| `XLOEV` | Deletion Indicator for Customer |
| `SPRAS` | Language Key |

#### **Extractor: 0FI\_ACDOCA\_20** (Universal Journal Master Data)

| **Field Name** | **Description** |
| --- | --- |
| `ACDOCA_ID` | Universal Journal Line Item Identifier |
| `HKONT` | General Ledger Account |
| `PRCTR` | Profit Center |
| `SEGMENT` | Segment |
| `MATNR` | Material Number |
| `AUFNR` | Internal Order |

### **FI Transactional Data Extractors**

![a](/img/Conections/estractores/Transaction_fi.png)



#### **Extractor: 0FI\_GL\_4** (General Ledger Line Items)

| **Field Name** | **Description** |
| --- | --- |
| `BELNR` | Document Number |
| `BUKRS` | Company Code |
| `GJAHR` | Fiscal Year |
| `HKONT` | General Ledger Account |
| `WRBTR` | Amount in Document Currency |
| `WAERS` | Document Currency |
| `DMBTR` | Amount in Local Currency |
| `ZUONR` | Assignment |
| `BSCHL` | Posting Key |

#### **Extractor: 0FI\_AP\_4** (Accounts Payable Line Items)

| **Field Name** | **Description** |
| --- | --- |
| `BELNR` | Document Number |
| `BUKRS` | Company Code |
| `GJAHR` | Fiscal Year |
| `LIFNR` | Vendor Number |
| `WRBTR` | Amount in Document Currency |
| `WAERS` | Document Currency |
| `DMBTR` | Amount in Local Currency |
| `ZUONR` | Assignment |
| `BSCHL` | Posting Key |
| `SGTXT` | Document Text |

#### **Extractor: 0FI\_AR\_4** (Accounts Receivable Line Items)

| **Field Name** | **Description** |
| --- | --- |
| `BELNR` | Document Number |
| `BUKRS` | Company Code |
| `GJAHR` | Fiscal Year |
| `KUNNR` | Customer Number |
| `WRBTR` | Amount in Document Currency |
| `WAERS` | Document Currency |
| `DMBTR` | Amount in Local Currency |
| `ZUONR` | Assignment |
| `BSCHL` | Posting Key |
| `SGTXT` | Document Text |

#### **Extractor: 0FI\_ACDOCA\_10** (Universal Journal Line Items)

| **Field Name** | **Description** |
| --- | --- |
| `BELNR` | Document Number |
| `BUKRS` | Company Code |
| `GJAHR` | Fiscal Year |
| `HKONT` | General Ledger Account |
| `WRBTR` | Amount in Document Currency |
| `WAERS` | Document Currency |
| `DMBTR` | Amount in Local Currency |
| `PRCTR` | Profit Center |
| `SEGMENT` | Segment |
| `MATNR` | Material Number |
| `AUFNR` | Internal Order |

## **Materials Management**
The SAP MM (Materials Management) module is a core part of the SAP ERP system designed to manage procurement and inventory processes efficiently. It supports functions like purchasing, inventory management, material requirements planning (MRP), and invoice verification. SAP MM integrates with other modules, such as FI (Financial Accounting), SD (Sales and Distribution), and PP (Production Planning), to ensure smooth operations across the supply chain. This module helps organizations optimize procurement, manage stock levels, and streamline material-related workflows.

### Master Data Extractors

![a](/img/Conections/estractores/master_mm.png)

#### **Extractor: 0MATERIAL\_ATTR** (Material Master Attributes)

| **Field Name** | **Description** |
| --- | --- |
| `MATNR` | Material Number |
| `MTART` | Material Type |
| `MATKL` | Material Group |
| `MEINS` | Base Unit of Measure |
| `MBRSH` | Industry Sector |
| `WERKS` | Plant |
| `DISMM` | MRP Type |
| `DISPO` | MRP Controller |
| `XCHPF` | Batch Management Indicator |
| `MAKTX` | Material Description |
| `SPRAS` | Language Key |
| `NTGEW` | Net Weight |
| `BRGEW` | Gross Weight |
| `GEWEI` | Weight Unit |

#### **Extractor: 0MATERIAL\_TEXT** (Material Master Texts)

| **Field Name** | **Description** |
| --- | --- |
| `MATNR` | Material Number |
| `SPRAS` | Language Key |
| `MAKTX` | Material Description |

#### **Extractor: 0PLANT\_ATTR** (Plant Attributes)

| **Field Name** | **Description** |
| --- | --- |
| `WERKS` | Plant |
| `NAME1` | Plant Name |
| `BWKEY` | Valuation Area |
| `KOKRS` | Controlling Area |
| `BUKRS` | Company Code |
| `SPRAS` | Language Key |

#### **Extractor: 0VENDOR\_ATTR** (Vendor Master Attributes)

| **Field Name** | **Description** |
| --- | --- |
| `LIFNR` | Vendor Number |
| `NAME1` | Vendor Name |
| `LAND1` | Country |
| `ORT01` | City |
| `PSTLZ` | Postal Code |
| `REGIO` | Region |
| `STRAS` | Street |
| `KTOKK` | Account Group |
| `SPRAS` | Language Key |
| `LOEVM` | Deletion Indicator |

### MM Transactional Data Extractors

![a](/img/Conections/estractores/transaction_mm.png)

#### **Extractor: 2LIS\_02\_ITM** (Purchasing Data - Item Level)

| **Field Name** | **Description** |
| --- | --- |
| `EBELN` | Purchase Document Number |
| `EBELP` | Item Number of Purchase Document |
| `MATNR` | Material Number |
| `WERKS` | Plant |
| `LIFNR` | Vendor Number |
| `MEINS` | Order Unit |
| `MENGE` | Purchase Order Quantity |
| `NETWR` | Net Order Value |
| `WAERS` | Document Currency |
| `DATUM` | Document Date |

#### **Extractor: 2LIS\_02\_HDR** (Purchasing Data - Header Level)

| **Field Name** | **Description** |
| --- | --- |
| `EBELN` | Purchase Document Number |
| `BSTYP` | Document Type |
| `BUKRS` | Company Code |
| `EKORG` | Purchasing Organization |
| `EKGRP` | Purchasing Group |
| `LIFNR` | Vendor Number |
| `DATUM` | Document Date |
| `WAERS` | Document Currency |

#### **Extractor: 2LIS\_03\_BF** (Goods Movement - Material Documents)

| **Field Name** | **Description** |
| --- | --- |
| `MATNR` | Material Number |
| `WERKS` | Plant |
| `LGORT` | Storage Location |
| `BWART` | Movement Type |
| `MBLNR` | Material Document Number |
| `MENGE` | Quantity |
| `MEINS` | Unit of Measure |
| `BUDAT` | Posting Date |
| `WAERS` | Document Currency |
| `DMBTR` | Amount in Local Currency |

#### **Extractor: 2LIS\_03\_UM** (Stock Revaluation Data)

| **Field Name** | **Description** |
| --- | --- |
| `MATNR` | Material Number |
| `WERKS` | Plant |
| `LGORT` | Storage Location |
| `BUDAT` | Posting Date |
| `BWART` | Movement Type |
| `MENGE` | Quantity |
| `DMBTR` | Amount in Local Currency |
| `WAERS` | Document Currency |

#### **Extractor: 2LIS\_03\_MATNR** (Stock Overview)

| **Field Name** | **Description** |
| --- | --- |
| `MATNR` | Material Number |
| `WERKS` | Plant |
| `LGORT` | Storage Location |
| `LABST` | Unrestricted Stock |
| `SPEME` | Special Stock |
| `DMBTR` | Value of Stock in Local Currency |
| `WAERS` | Document Currency |

These extractors provide comprehensive data for **MM master and transactional data**, supporting reporting and analytics for purchasing, inventory, and goods movement processes.

## Sales and Distribution

The SAP SD (Sales and Distribution) module is a key component of the SAP ERP system focused on managing sales, customer relationships, and distribution processes. It handles functions such as order management, pricing, shipping, billing, and credit management. SAP SD integrates seamlessly with other modules like MM (Materials Management), FI (Financial Accounting), and PP (Production Planning) to ensure efficient sales and delivery operations. This module enables organizations to streamline their sales processes, enhance customer satisfaction, and achieve better control over distribution networks.

### SD Master Data Extractors

![a](/img/Conections/estractores/master_sd.png)

#### **Extractor: 0CUSTOMER\_ATTR** (Customer Master Attributes)

| **Field Name** | **Description** |
| --- | --- |
| `KUNNR` | Customer Number |
| `BUKRS` | Company Code |
| `VKORG` | Sales Organization |
| `VTWEG` | Distribution Channel |
| `SPART` | Division |
| `NAME1` | Customer Name |
| `ORT01` | City |
| `PSTLZ` | Postal Code |
| `LAND1` | Country |
| `REGIO` | Region |
| `STRAS` | Street |
| `KTOKD` | Customer Account Group |
| `SPRAS` | Language Key |

#### **Extractor: 0CUSTOMER\_TEXT** (Customer Master Texts)

| **Field Name** | **Description** |
| --- | --- |
| `KUNNR` | Customer Number |
| `SPRAS` | Language Key |
| `NAME1` | Customer Name |

#### **Extractor: 0MATERIAL\_ATTR** (Material Master Attributes for SD)

| **Field Name** | **Description** |
| --- | --- |
| `MATNR` | Material Number |
| `VKORG` | Sales Organization |
| `VTWEG` | Distribution Channel |
| `SPART` | Division |
| `MATKL` | Material Group |
| `MEINS` | Base Unit of Measure |
| `MTART` | Material Type |
| `NTGEW` | Net Weight |
| `GEWEI` | Weight Unit |
| `BRGEW` | Gross Weight |

### SD Transactional Data Extractors

![a](/img/Conections/estractores/transaction_sd.png)

#### **Extractor: 2LIS\_11\_VAITM** (Sales Order Item Data)

| **Field Name** | **Description** |
| --- | --- |
| `VBELN` | Sales Document |
| `POSNR` | Sales Document Item |
| `MATNR` | Material Number |
| `WERKS` | Plant |
| `KUNNR` | Customer Number |
| `NETWR` | Net Value |
| `WAERK` | Currency |
| `KWMENG` | Cumulative Order Quantity |
| `VRKME` | Sales Unit |
| `SPART` | Division |
| `PSTYV` | Item Category |

#### **Extractor: 2LIS\_11\_VAHDR** (Sales Order Header Data)

| **Field Name** | **Description** |
| --- | --- |
| `VBELN` | Sales Document |
| `VKORG` | Sales Organization |
| `VTWEG` | Distribution Channel |
| `SPART` | Division |
| `AUART` | Sales Document Type |
| `KUNNR` | Sold-to Party |
| `NETWR` | Net Value |
| `WAERK` | Currency |
| `ERDAT` | Document Creation Date |
| `VKBUR` | Sales Office |

#### **Extractor: 2LIS\_12\_VCITM** (Delivery Item Data)

| **Field Name** | **Description** |
| --- | --- |
| `VBELN` | Delivery Document |
| `POSNR` | Delivery Item |
| `MATNR` | Material Number |
| `WERKS` | Plant |
| `LFIMG` | Delivered Quantity |
| `VRKME` | Sales Unit |
| `VSTEL` | Shipping Point |
| `KUNNR` | Ship-to Party |
| `SPART` | Division |

#### **Extractor: 2LIS\_12\_VCHDR** (Delivery Header Data)

| **Field Name** | **Description** |
| --- | --- |
| `VBELN` | Delivery Document |
| `VKORG` | Sales Organization |
| `VTWEG` | Distribution Channel |
| `SPART` | Division |
| `VSTEL` | Shipping Point |
| `KUNNR` | Ship-to Party |
| `ERDAT` | Document Creation Date |

#### **Extractor: 2LIS\_13\_VDITM** (Billing Document Item Data)

| **Field Name** | **Description** |
| --- | --- |
| `VBELN` | Billing Document |
| `POSNR` | Billing Item |
| `MATNR` | Material Number |
| `WERKS` | Plant |
| `FKIMG` | Billing Quantity |
| `VRKME` | Sales Unit |
| `NETWR` | Net Value |
| `WAERK` | Currency |
| `KUNNR` | Payer |

#### **Extractor: 2LIS\_13\_VDHDR** (Billing Document Header Data)

| **Field Name** | **Description** |
| --- | --- |
| `VBELN` | Billing Document |
| `VKORG` | Sales Organization |
| `VTWEG` | Distribution Channel |
| `SPART` | Division |
| `NETWR` | Net Value |
| `WAERK` | Currency |
| `KUNNR` | Payer |
| `ERDAT` | Document Creation Date |

## Production Planning

The SAP PP (Production Planning) module is a vital part of the SAP ERP system, designed to manage manufacturing processes efficiently. It covers areas such as production planning, scheduling, material requirements planning (MRP), capacity planning, and shop floor execution. SAP PP integrates with modules like MM (Materials Management), SD (Sales and Distribution), and FI/CO (Financial Accounting/Controlling) to ensure seamless coordination across supply chain and production activities. This module helps organizations optimize production workflows, reduce lead times, and align manufacturing processes with business goals.

### PP Master Data Extractors

![a](/img/Conections/estractores/master_pp.png)

#### **xtractor: 0MATERIAL\_ATTR** (Material Master Attributes for PP)

| **Field Name** | **Description** |
| --- | --- |
| `MATNR` | Material Number |
| `MTART` | Material Type |
| `MATKL` | Material Group |
| `MEINS` | Base Unit of Measure |
| `DISMM` | MRP Type |
| `DISPO` | MRP Controller |
| `WERKS` | Plant |
| `XCHPF` | Batch Management Indicator |
| `NTGEW` | Net Weight |
| `GEWEI` | Weight Unit |

---

#### **Extractor: 0PLANT\_ATTR** (Plant Attributes)

| **Field Name** | **Description** |
| --- | --- |
| `WERKS` | Plant |
| `NAME1` | Plant Name |
| `BWKEY` | Valuation Area |
| `SPRAS` | Language Key |
| `KOKRS` | Controlling Area |

---

#### **Extractor: 0WORKCENTER\_ATTR** (Work Center Attributes)

| **Field Name** | **Description** |
| --- | --- |
| `ARBPL` | Work Center |
| `WERKS` | Plant |
| `ARBPLNAME` | Work Center Name |
| `KAPAZ` | Capacity Category |
| `PERSK` | Person Responsible |

---

#### **Extractor: 0BOM\_ATTR** (Bill of Materials)

| **Field Name** | **Description** |
| --- | --- |
| `MATNR` | Material Number |
| `WERKS` | Plant |
| `STLNR` | BOM Number |
| `STLAL` | BOM Usage |
| `STLST` | BOM Status |
| `IDNRK` | Component Number |
| `MENGE` | Component Quantity |

---

#### **Extractor: 0ROUTING\_ATTR** (Routing Data)

| **Field Name** | **Description** |
| --- | --- |
| `PLNNR` | Routing Number |
| `WERKS` | Plant |
| `MATNR` | Material Number |
| `VORNR` | Operation/Activity Number |
| `ARBID` | Work Center |

### PP Transactional Data Extractors

![a](/img/Conections/estractores/transaction_pp.png)

#### **Extractor: 2LIS\_04\_P\_ARBPL** (Work Center Load)

| **Field Name** | **Description** |
| --- | --- |
| `ARBPL` | Work Center |
| `WERKS` | Plant |
| `MATNR` | Material Number |
| `PLNNR` | Routing Number |
| `VORNR` | Operation/Activity Number |
| `MENGE` | Quantity |
| `START_DATE` | Start Date |
| `END_DATE` | End Date |

---

#### **Extractor: 2LIS\_04\_P\_COMP** (Production Order Components)

| **Field Name** | **Description** |
| --- | --- |
| `AUFNR` | Production Order |
| `MATNR` | Material Number |
| `WERKS` | Plant |
| `IDNRK` | Component Number |
| `MENGE` | Component Quantity |
| `MEINS` | Unit of Measure |
| `RSNUM` | Reservation Number |

---

#### **Extractor: 2LIS\_04\_P\_MATNR** (Production Order - Material Data)

| **Field Name** | **Description** |
| --- | --- |
| `AUFNR` | Production Order |
| `MATNR` | Material Number |
| `WERKS` | Plant |
| `GAMNG` | Order Quantity |
| `MEINS` | Unit of Measure |
| `FTRMI` | Final Confirmation Date |

---

#### **Extractor: 2LIS\_04\_P\_ORDER** (Production Order Header)

| **Field Name** | **Description** |
| --- | --- |
| `AUFNR` | Production Order |
| `WERKS` | Plant |
| `MATNR` | Material Number |
| `GAMNG` | Order Quantity |
| `AUART` | Order Type |
| `ERDAT` | Creation Date |

---

#### **Extractor: 2LIS\_04\_PTDOC** (Production Document Data)

| **Field Name** | **Description** |
| --- | --- |
| `AUFNR` | Production Order |
| `MATNR` | Material Number |
| `WERKS` | Plant |
| `IDNRK` | Component Number |
| `RSNUM` | Reservation Number |
| `MEINS` | Unit of Measure |
| `MENGE` | Component Quantity |

---

#### **Extractor: 2LIS\_04\_PRC** (Production Confirmation)

| **Field Name** | **Description** |
| --- | --- |
| `AUFNR` | Production Order |
| `MATNR` | Material Number |
| `WERKS` | Plant |
| `VORNR` | Operation/Activity Number |
| `GAMNG` | Confirmed Quantity |
| `MEINS` | Unit of Measure |
| `END_DATE` | Confirmation Date |

## Project System

The SAP PS (Project System) module is a comprehensive tool within the SAP ERP system designed to manage projects across their entire lifecycle. It supports project planning, scheduling, budgeting, execution, and monitoring. SAP PS is ideal for industries where project management is critical, such as construction, engineering, and professional services. 

Key features include work breakdown structures (WBS), project cost and revenue tracking, milestone management, and integration with other SAP modules like FI (Financial Accounting), CO (Controlling), MM (Materials Management), and HR (Human Resources). This integration enables real-time data visibility, resource allocation, and efficient project execution while ensuring adherence to timelines and budgets.

### PS Master Data Extractors

![a](/img/Conections/estractores/master_ps.png)

#### **Extractor: 0PROJECT\_ATTR** (Project Attributes)

| **Field Name** | **Description** |
| --- | --- |
| `PSPNR` | Project Definition |
| `BUKRS` | Company Code |
| `PRART` | Project Type |
| `KOKRS` | Controlling Area |
| `PROFL` | Project Profile |
| `PSPID` | Project ID |
| `KTEXT` | Project Description |
| `DATBI` | Valid To Date |
| `GJAHR` | Fiscal Year |

---

#### **Extractor: 0WBS\_ATTR** (WBS Element Attributes)

| **Field Name** | **Description** |
| --- | --- |
| `PSPNR` | Project Definition |
| `POSID` | WBS Element |
| `PRART` | Project Type |
| `KOKRS` | Controlling Area |
| `AUFNR` | Order Number (if assigned) |
| `OBJNR` | Object Number |
| `POSKI` | WBS Element Hierarchy Level |
| `DATBI` | Valid To Date |
| `KTEXT` | WBS Element Description |

---

#### **Extractor: 0WBS\_TEXT** (WBS Element Texts)

| **Field Name** | **Description** |
| --- | --- |
| `PSPNR` | Project Definition |
| `POSID` | WBS Element |
| `SPRAS` | Language Key |
| `KTEXT` | WBS Element Description |

---

#### **Extractor: 0NETWORK\_ATTR** (Network Attributes)

| **Field Name** | **Description** |
| --- | --- |
| `AUFNR` | Network Number |
| `PSPNR` | Project Definition |
| `KOKRS` | Controlling Area |
| `OBJNR` | Object Number |
| `GSTRP` | Start Date |
| `GLTRP` | End Date |
| `KTEXT` | Network Description |

---

#### **Extractor: 0ACTIVITY\_ATTR** (Activity Attributes)

| **Field Name** | **Description** |
| --- | --- |
| `AUFNR` | Network Number |
| `VORNR` | Activity Number |
| `WERKS` | Plant |
| `ARBID` | Work Center |
| `GSTRP` | Start Date |
| `GLTRP` | Finish Date |
| `KTEXT` | Activity Description |

### PS Transactional Data Extractors

![a](/img/Conections/estractores/transaction_ps.png)

#### **Extractor: 2LIS\_13\_VDITM** (PS Billing: Line Item Data)

| **Field Name** | **Description** |
| --- | --- |
| `BELNR` | Billing Document |
| `BUKRS` | Company Code |
| `POSNR` | Item Number |
| `PSPNR` | Project Definition |
| `POSID` | WBS Element |
| `MATNR` | Material Number |
| `WRBTR` | Billing Amount |
| `WAERS` | Currency |

---

#### **Extractor: 0CO\_OM\_OPA\_6** (Actual Costs on Internal Orders)

| **Field Name** | **Description** |
| --- | --- |
| `AUFNR` | Internal Order or Network |
| `PSPNR` | Project Definition |
| `POSID` | WBS Element |
| `KSTAR` | Cost Element |
| `WERT1` | Actual Amount in Local Currency |
| `WAERS` | Currency |

---

#### **Extractor: 2LIS\_13\_VDKON** (PS Contract Conditions)

| **Field Name** | **Description** |
| --- | --- |
| `KONNR` | Contract Number |
| `BUKRS` | Company Code |
| `POSID` | WBS Element |
| `MATNR` | Material Number |
| `WRBTR` | Condition Amount |
| `WAERS` | Currency |

---

#### **Extractor: 0CO\_OM\_CCA\_1** (Cost Center Accounting: Actual Costs)

| **Field Name** | **Description** |
| --- | --- |
| `KOSTL` | Cost Center |
| `PSPNR` | Project Definition |
| `POSID` | WBS Element |
| `KSTAR` | Cost Element |
| `WERT1` | Actual Amount in Local Currency |
| `WAERS` | Currency |

---

#### **Extractor: 0PS\_C04** (Plan vs Actual Costs)

| **Field Name** | **Description** |
| --- | --- |
| `PSPNR` | Project Definition |
| `POSID` | WBS Element |
| `KSTAR` | Cost Element |
| `GJAHR` | Fiscal Year |
| `PLAN_VALUE` | Planned Cost |
| `ACTUAL_VALUE` | Actual Cost |
| `WAERS` | Currency |

---

#### **Extractor: 2LIS\_13\_VDHDR** (PS Billing: Header Data)

| **Field Name** | **Description** |
| --- | --- |
| `BELNR` | Billing Document |
| `BUKRS` | Company Code |
| `PSPNR` | Project Definition |
| `POSID` | WBS Element |
| `FKDAT` | Billing Date |
| `NETWR` | Net Billing Amount |
| `WAERS` | Currency |

## Controlling

The SAP CO (Controlling) module is a core component of the SAP ERP system, focused on managing and analyzing internal costs and financial performance. It supports processes like cost center accounting, profit center accounting, activity-based costing, product costing, and profitability analysis (CO-PA). 

SAP CO helps organizations monitor costs, allocate resources effectively, and assess profitability at various levels of the business. It integrates seamlessly with other modules like FI (Financial Accounting), MM (Materials Management), and PP (Production Planning), enabling real-time cost tracking and financial insights. This module is essential for supporting strategic decision-making and optimizing cost efficiency across operations.

### CO Master Data Extractors

![a](/img/Conections/estractores/master_co.png)

#### **Extractor: 0COSTCENTER\_ATTR** (Cost Center Attributes)

| **Field Name** | **Description** |
| --- | --- |
| `KOSTL` | Cost Center |
| `BUKRS` | Company Code |
| `KOKRS` | Controlling Area |
| `WERKS` | Plant |
| `PRCTR` | Profit Center |
| `GSBER` | Business Area |
| `VERAK` | Responsible Person |
| `KOSAR` | Cost Center Category |
| `DATBI` | Valid To Date |
| `KTEXT` | Cost Center Name |

---

#### **Extractor: 0COSTCENTER\_TEXT** (Cost Center Texts)

| **Field Name** | **Description** |
| --- | --- |
| `KOSTL` | Cost Center |
| `SPRAS` | Language Key |
| `KTEXT` | Cost Center Name |

---

#### **Extractor: 0PROFIT\_CTR\_ATTR** (Profit Center Attributes)

| **Field Name** | **Description** |
| --- | --- |
| `PRCTR` | Profit Center |
| `KOKRS` | Controlling Area |
| `BUKRS` | Company Code |
| `DATBI` | Valid To Date |
| `PTEXT` | Profit Center Name |

---

#### **Extractor: 0PROFIT\_CTR\_TEXT** (Profit Center Texts)

| **Field Name** | **Description** |
| --- | --- |
| `PRCTR` | Profit Center |
| `SPRAS` | Language Key |
| `PTEXT` | Profit Center Name |

---

#### **Extractor: 0COSTELMNT\_ATTR** (Cost Element Attributes)

| **Field Name** | **Description** |
| --- | --- |
| `KSTAR` | Cost Element |
| `LIFNR` | Vendor (if applicable) |
| `KOKRS` | Controlling Area |
| `MEINS` | Unit of Measure |
| `KTEXT` | Cost Element Name |

### CO Transactional Data Extractors

![a](/img/Conections/estractores/transaction_co.png)

#### **Extractor: 0CO\_OM\_CCA\_1** (Cost Center Accounting: Actual Costs)

| **Field Name** | **Description** |
| --- | --- |
| `KOKRS` | Controlling Area |
| `KOSTL` | Cost Center |
| `GJAHR` | Fiscal Year |
| `BUKRS` | Company Code |
| `LSTAR` | Activity Type |
| `KSTAR` | Cost Element |
| `MEGEB` | Quantity |
| `WKGEB` | Total Actual Costs |
| `WAERS` | Currency |

---

#### **Extractor: 0CO\_OM\_CCA\_9** (Cost Center Accounting: Planned Costs)

| **Field Name** | **Description** |
| --- | --- |
| `KOKRS` | Controlling Area |
| `KOSTL` | Cost Center |
| `GJAHR` | Fiscal Year |
| `KSTAR` | Cost Element |
| `MEGEB` | Planned Quantity |
| `WKGEB` | Total Planned Costs |
| `WAERS` | Currency |

---

#### **Extractor: 0CO\_PC\_ACT\_01** (Product Costing: Actual Costs)

| **Field Name** | **Description** |
| --- | --- |
| `KOKRS` | Controlling Area |
| `MATNR` | Material Number |
| `WERKS` | Plant |
| `KSTAR` | Cost Element |
| `MEGEB` | Actual Quantity |
| `WKGEB` | Total Actual Costs |
| `WAERS` | Currency |

---

#### **Extractor: 0CO\_PC\_PL\_01** (Product Costing: Planned Costs)

| **Field Name** | **Description** |
| --- | --- |
| `KOKRS` | Controlling Area |
| `MATNR` | Material Number |
| `WERKS` | Plant |
| `KSTAR` | Cost Element |
| `MEGEB` | Planned Quantity |
| `WKGEB` | Total Planned Costs |
| `WAERS` | Currency |

---

#### **Extractor: 0CO\_OM\_OPA\_6** (Internal Orders: Actual Costs)

| **Field Name** | **Description** |
| --- | --- |
| `AUFNR` | Internal Order |
| `KOKRS` | Controlling Area |
| `BUKRS` | Company Code |
| `KSTAR` | Cost Element |
| `WERT1` | Actual Amount in Local Currency |
| `MEGEB` | Actual Quantity |
| `WAERS` | Currency |

---





