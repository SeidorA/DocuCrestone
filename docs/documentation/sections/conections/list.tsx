// Update the import path below to the correct location of your cards module
import { CaralIcon } from 'iconcaral2';
import { FeatureItem, Feature, Titleicon, Cardcre } from '../../cards/cards';

const FeatureList: FeatureItem[] = [
  {
    title: 'SAP ABAP',
    icon: 'SAP',
    brand: true,
    description: (
      <>
        Direct integration with classic SAP ECC or S/4HANA systems using custom or standard function modules (RFC/BAPI) for structured data extraction. Ideal for high-performance access to core SAP tables and reports.

      </>
    ),
    link: '/docs/documentation/sections/conections/source/sapabap',
  },

  {
    title: 'SAP 4Hanna',
    icon: 'SAP',
    brand: true,
    description: (
      <>
        <b>  (Core Data Services – CDS) </b>
        Enables access to advanced data models built with CDS views. Offers semantic-rich, optimized queries for modern S/4HANA deployments.
      </>
    ),
    link: '/docs/documentation/sections/conections/source/sap4hanna',
  }, {
    title: 'SAP OData',
    icon: 'SapOdata',
    description: (
      <>
        Connects via OData services to expose business data through RESTful APIs. Suitable for scenarios that require loosely coupled, service-oriented access to SAP entities.
      </>
    ),
    link: '/docs/documentation/sections/conections/source/sapodata',
  },

];

const DestinationList: FeatureItem[] = [
  {
    title: "AWS S3",
    icon: "AWS",
    brand: true,
    link: '/docs/documentation/sections/conections/detinations/aws',
    description: (
      <>
        Object storage destination for raw or transformed SAP data. Useful for data lake architectures and integration with AWS analytics tools.

      </>
    ),
  }, {
    title: "Snowflake",
    icon: "Snowflake",
    link: '/docs/documentation/sections/conections/detinations/snowflafe',
    brand: true,
    description: (
      <>
        Cloud-native data warehouse optimized for performance and concurrency. Ideal for advanced analytics, reporting, and machine learning workloads.

      </>
    ),
  }, {
    title: 'Azure',
    icon: 'Azure',
    brand: true,
    link: '/docs/documentation/sections/conections/detinations/Azure',
    description: (
      <>
        Scalable storage for big data workloads. Facilitates integration with Azure Synapse, Databricks, and other Microsoft services.

      </>
    ),
  }, {
    title: 'Azure SQL',
    icon: 'AzureSql',
    link: '/docs/documentation/sections/conections/detinations/AzureSQL',
    brand: true,
    description: (
      <>
        Managed relational database service on Azure. Recommended for structured data ingestion and operational reporting.
      </>
    )
  }, {
    title: 'Teradata',
    icon: 'Teradata',
    link: '/docs/documentation/sections/conections/detinations/teradata',
    brand: true,
    description: (
      <>
        Enterprise-grade analytical platform. Suitable for organizations with existing Teradata ecosystems and large-scale processing requirements.

      </>
    ),
  }, {
    title: 'Databricks',
    icon: 'Databricks',
    link: '/docs/documentation/sections/conections/detinations/databricks',
    brand: true,
    description: (
      <>
        Unified data analytics platform based on Apache Spark. Enables direct export of SAP data into Delta Lake for real-time analytics and machine learning.

      </>
    ),
  }, {
    title: 'Google Cloud Platform',
    icon: 'GoogleStorage',
    link: '/docs/documentation/sections/conections/detinations/gcp',
    brand: true,
    description: (
      <>
        Google Cloud Platform is a suite of cloud computing services offered by Google that provides a series of modular cloud services including computing, data storage, data analytics, and machine learning.
      </>
    ),
  }, {
    title: 'Windows file server',
    icon: 'file',
    link: '/docs/documentation/sections/conections/detinations/fileserver',
    description: (
      <>
        Centralized storage solution that allows users on a network to access and share files.
      </>
    ),
  }
]


export function SourceList() {
  return (
    <>
      <div className="row">
        {FeatureList.map((props, idx) => (
          <Feature key={idx} {...props} />
        ))}
      </div>
    </>
  )
}

export function Destinationlist() {
  return (
    <>
      <div className="row">
        {DestinationList.map((props, idx) => (
          <Feature key={idx} {...props} />
        ))}
      </div>
    </>
  )
}

export function CardList() {
  return (
    <Cardcre
      title="Rapid deployment"
      description="Rapid Deployments are predefined templates that leverage SAP modules to automatically generate extraction nodes and a corresponding job in Crestone. Designed to accelerate implementation, these blueprints simplify setup by preconfiguring technical parameters, source logic, and execution flows—enabling faster time-to-value for common SAP data scenarios."
      icon="bolt"
      brand={false}
      link='rd'
    />
  )
}