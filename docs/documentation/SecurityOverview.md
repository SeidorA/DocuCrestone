---
title: "Security Overview"
sidebar_position: 6
---

## 1. Introduction

This document describes the security model of CRESTONE, the SAP data extraction and integration platform developed by SEIDOR Analytics. It is intended for cybersecurity, architecture, and compliance teams of organizations evaluating or already using CRESTONE.

CRESTONE connects SAP systems (ECC, S/4HANA, BW, SAP Business One, and SAP Cloud products) with modern data destinations like Microsoft Fabric, Snowflake, Azure Data Lake, and AWS S3. The platform operates in two deployment models: SaaS (managed by SEIDOR Analytics) and On-Premise (installed and operated on the customer's infrastructure).

---

## 2. Platform Architecture

### 2.1 Main Components

CRESTONE is composed of the following functional components:

* **SAP Extraction Layer:** microservices that connect to SAP via RFC (Remote Function Call), OData via SAP Gateway (SEGW), ODP (Operational Data Provisioning), and CDS Views.
* **Orchestration Engine:** manages extraction, transformation, and load (ETL) pipelines, including execution scheduling, error handling, and delta logic.
* **Messaging Bus:** Apache Kafka acts as the internal transport layer for data transmission between components.
* **Metadata and Configuration Database:** PostgreSQL/Supabase stores connection configurations, extraction objects, execution logs, and platform status.
* **Administration API:** REST API that exposes platform configuration, monitoring, and management functions.
* **Web Interface:** web browser-accessible administration portal to configure extractors, view logs, and manage the pipeline lifecycle.

### 2.2 Deployment Models

| Aspect | SaaS | On-Premise |
| :--- | :--- | :--- |
| **Infrastructure** | Managed by SEIDOR Analytics (AWS / Azure) | Customer infrastructure |
| **Updates** | Applied by SEIDOR Analytics | Customer responsibility |
| **SAP Connectivity** | Requires open port to the SaaS platform | Internal communication on customer network |
| **Data in transit** | TLS 1.2+ encrypted to/from the cloud | Remains on customer internal network |
| **Administrative access** | SEIDOR Analytics with controlled access | Customer exclusive |

---

## 3. Data Security

### 3.1 Data in Transit

All communication between CRESTONE and target destinations (Microsoft Fabric, Snowflake, AWS S3, Azure Data Lake) is performed over encrypted channels using TLS 1.2 or higher.

Communication between CRESTONE and SAP via RFC uses the native transport mechanisms of the SAP JCo/ABAP protocol. In SaaS deployments, using a VPN or SAP Cloud Connector is recommended to protect this channel.

CRESTONE administration APIs operate exclusively over HTTPS.

### 3.2 Data at Rest

The metadata and configuration database (PostgreSQL) stores only operational metadata: connection configurations, extractor definitions, execution logs, and pipeline statuses.

CRESTONE does not persist SAP business data (transactional records, master data) in its internal database. Data flows from SAP to the configured destination without permanent intermediate storage.

In-transit messages in Kafka are transient. Topics are configured with minimal retention according to the extraction cycle.

Connection credentials (SAP users, destination tokens) are stored encrypted in the configuration database.

### 3.3 Data Flow

Data flow in CRESTONE is unidirectional: data is extracted from the source SAP system and written to the configured destination. CRESTONE does not modify, delete, or write data in the source SAP system.

| Source | CRESTONE Platform | Destination |
| :--- | :--- | :--- |
| **SAP ECC / S/4HANA / BW** | **Orchestration + metadata** | **Microsoft Fabric / Snowflake / Azure / AWS** |
| *Read-only (extraction)* | *No business persistence* | *Analytical data writing* |

---

## 4. Access Control

### 4.1 Authentication

Access to the CRESTONE web interface and API requires authentication. The platform supports integration with external identity providers (IdP) via standard protocols (OAuth 2.0 / OIDC) for enterprise environments.

Sessions have a configurable expiration time and are invalidated upon logout.

Access credentials to SAP systems and data destinations are managed as internal platform secrets, without exposure in user interfaces.

### 4.2 Authorization

CRESTONE implements role-based access control (RBAC). Roles determine what operations each user can perform: administration, extractor configuration, log viewing, etc.

Administrative access to the infrastructure (SaaS) is restricted to authorized SEIDOR Analytics personnel and is performed using SSH keys with MFA enabled.

### 4.3 SAP Connection User

CRESTONE connects to SAP using a system user (Background/Communication type), not a dialog user. This eliminates the risk of unauthorized interactive access to SAP.

The SAP user required by CRESTONE operates with read-only permissions on the objects configured for extraction. The customer defines and controls the exact permissions through the SAP role assigned to this user.

CRESTONE does not require SAP users with modification permissions, system administration, or access to sensitive transactions.

---

## 5. Infrastructure Security

### 5.1 SaaS Model

CRESTONE's SaaS infrastructure is deployed in cloud environments (AWS and Azure) with Ubuntu 24.04 LTS as the base operating system.

Operating system security patches are applied regularly. Ubuntu 24.04 LTS uses the patch backporting mechanism, meaning security fixes are incorporated without changing the package version.

Exposed network ports are limited to those strictly necessary for operation. SSH access to the infrastructure is restricted by access control lists (ACL) and requires key authentication.

Platform components run as Docker containers with minimum privileges and no root access to the host.

Infrastructure monitoring includes CPU, memory, disk metrics, and service availability via AWS CloudWatch / Azure Monitor.

### 5.2 On-Premise Model

In on-premise deployments, CRESTONE is installed on customer-managed servers using a distributed installer (`.sh`). The responsibility for host security (OS, network, physical access) lies with the customer.

SEIDOR Analytics provides hardening guides and recommended configurations for on-premise deployment.

CRESTONE's internal Docker network uses RFC 1918 IP address ranges, configurable to avoid conflicts with the customer's corporate network.

### 5.3 Vulnerability Management

SEIDOR Analytics actively monitors CVEs affecting the components used by CRESTONE (operating system, dependencies, libraries).

In the event of critical vulnerabilities, a patch or update is generated, and affected customers are notified with an impact analysis and recommended actions.

False positives generated by version scanning tools (frequent with Ubuntu due to the backporting mechanism) are documented and formally communicated to customer security teams.

---

## 6. Shared Responsibility Model

The security of a CRESTONE integration is a shared responsibility between SEIDOR Analytics and the customer. The following table describes the distribution of responsibilities based on the deployment model:

| Security Area | SaaS | On-Premise |
| :--- | :--- | :--- |
| **CRESTONE Infrastructure (OS, network, containers)** | SEIDOR Analytics | Customer |
| **CRESTONE updates and patches** | SEIDOR Analytics | Customer (with SEIDOR support) |
| **CRESTONE user management** | Shared | Customer |
| **Extraction SAP user permissions** | Customer | Customer |
| **Source SAP system security** | Customer | Customer |
| **Data destination security** | Customer | Customer |
| **SAP CRESTONE network connectivity** | Shared | Customer |
| **In-transit encryption (TLS)** | SEIDOR Analytics | Customer configuration |
| **Infrastructure backup and recovery** | SEIDOR Analytics | Customer |

---

## 7. Compliance and Auditing

### 7.1 Logs and Traceability

CRESTONE logs all extraction executions: extracted object, start and end timestamp, volume of processed records, status (success/error), and the user who initiated the execution (if applicable).

Platform access logs (authentication, configuration changes) are recorded and available for auditing.

In the SaaS model, infrastructure logs are centralized in cloud monitoring systems (CloudWatch, Azure Monitor) with configurable retention.

### 7.2 SAP Regulatory Compliance

CRESTONE operates in compliance with **SAP Note 3255746** (effective from June 2026), which regulates the use of ODP-RFC by third-party tools. The extraction mechanisms used by CRESTONE (OData via SEGW, direct RFC, CDS Views) remain within the limits of the customer's SAP license agreement.

CRESTONE does not require additional SAP licenses beyond those the customer already holds for business users accessing the data.

### 7.3 Personal Data Protection

CRESTONE is a data transport and extraction platform. The classification, identification, and protection of personal data (GDPR, local data protection laws) is the responsibility of the customer, who defines which SAP objects are extracted and to which destination.

SEIDOR Analytics does not access the content of the business data extracted by CRESTONE in the normal operational context.

---

## 8. Security Incident Management

SEIDOR Analytics has a defined security incident response process. Upon a confirmed incident affecting the SaaS platform, impacted customers are notified within a maximum of 72 hours from detection.

The channel for reporting security vulnerabilities in CRESTONE is the SEIDOR Analytics support team.

SEIDOR Analytics is committed to providing a root cause analysis (RCA) for security incidents affecting data or service availability.

---

## 9. Frequently Asked Questions - Cybersecurity Teams

| Question | Answer |
| :--- | :--- |
| **Does CRESTONE modify data in SAP?** | No. CRESTONE is exclusively read-only on the source SAP system. |
| **Is business data stored on the platform?** | No. Data flows directly from SAP to the configured destination. CRESTONE only persists operational metadata. |
| **What permissions does the SAP user require?** | Read-only on the objects configured for extraction. The customer defines and controls the SAP role. |
| **Which ports must be opened in the firewall?** | Depends on the modality. Specific port documentation is provided per deployment scenario. |
| **Does SEIDOR have security certifications?** | Yes. SEIDOR has ISO 27018 (cloud data protection), ISO 27701 (privacy management), ISO 27017 (cloud service security), ISO 42001 (AI management), ISO 15504 (software process maturity), and OCA NIS 2 certifications. Details available at: [https://www.seidor.com/es-es/certificaciones](https://www.seidor.com/es-es/certificaciones) |
| **How are SAP credentials managed?** | They are stored encrypted in the configuration database. They are not exposed in logs or user interfaces. |
| **What happens if a scanner detects component vulnerabilities?** | The real impact is analyzed, and a formal report is issued. Ubuntu 24.04 uses backporting, which generates common false positives in version scans. |

---

## 10. Contact

For additional queries related to security, architecture, or compliance of CRESTONE, contact the SEIDOR Analytics team through the usual support or commercial channels.

> *This document is confidential and intended exclusively for technical and security teams of organizations evaluating or using CRESTONE. It must not be distributed to third parties without express authorization from SEIDOR Analytics.*