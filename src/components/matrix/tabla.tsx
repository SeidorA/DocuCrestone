import { useState } from "react";
import { CaralIcon } from "iconcaral2";
import style from "./index.module.css"


interface FrameProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  isSearchOpen: boolean;
  onToggleSearch: () => void;
  title?: string;
}

function Frame({ searchTerm, onSearchChange, isSearchOpen, onToggleSearch, title }: FrameProps) {
  return (
    <div className={style.frame} >
      <div className={style.flexRow}>
        <div className={style.borderBox}>
          <div className={style.toprow}>
            {title === "Source" ? (
                <CaralIcon name="planeDeparture"  size={34} />
            ) : title === "Destination" ? (
                <CaralIcon name="planeArrival"  size={34} />
            ) : null}
            <p>{title}</p>
        </div>

          <div className={style.flexRow}>
            {isSearchOpen && (
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Buscar..."
                className={style.inputse}
                autoFocus
              />
            )}
            <button
              onClick={onToggleSearch}
              className={style.buttonsearch}
              aria-label={isSearchOpen ? "Cerrar búsqueda" : "Abrir búsqueda"}
            >
              {isSearchOpen ? (
                <CaralIcon name="x"  />
              ) : (
                <CaralIcon name="search"  />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface TableRowData {
  id: number;
  sourceType: string;
  iconType: string;
  version: string;
  supportPackage: string;
}

interface TableRowProps {
  data: TableRowData;
  rowIndex: number;
}

function TableRow({ data, rowIndex }: TableRowProps) {
  const gridRow = rowIndex + 2; // +2 because row 1 is header
  
  return (
    <>
      <div className={style.tableCell} style={{ gridArea: `${gridRow} / 1` }}>
        <div className={style.flexRow}>
          <div className={style.cellContent}>
            <span style={{ color: "var(--ifm-color-gray-hard)" }}>
              <CaralIcon name={data.iconType} />
            </span>
            <p className={style.cellText}>
              {data.sourceType}
            </p>
          </div>
        </div>
        <div className={style.cellBorder} />
      </div>
      
      <div className={style.tableCell} style={{ gridArea: `${gridRow} / 2` }}>
        <div className={style.flexRow}>
          <div className={style.cellContent}>
            <p className={style.cellText}>
              {data.version}
            </p>
          </div>
        </div>
        <div className={style.cellBorder} />
      </div>
      
      <div className={style.tableCell} style={{ gridArea: `${gridRow} / 3` }}>
        <div className={style.flexRow}>
          <div className={style.cellContent}>
            <p className={style.cellText}>
              {data.supportPackage}
            </p>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none" />
        <div className={style.cellBorder} />
      </div>
    </>
  );
}

// Table data
const tableData: TableRowData[] = [
  {
    id: 1,
    sourceType: "SAP HANA",
    iconType: "SAP",
    version: "V1",
    supportPackage: "SPS 04, SPS 06, SPS 07, SPS 08, SPS 09, SPS 10, SPS 11, SPS 12"
  },
  {
    id: 2,
    sourceType: "SAP HANA",
    iconType: "SAP",
    version: "V2",
    supportPackage: "SPS 00,SPS 01, SPS 02, SPS 03, SPS 04, SPS 05, SPS 06, SPS 07, SPS 08"
  },
  {
    id: 3,
    sourceType: "SAP ABAP",
    iconType: "SAP",
    version: "V1",
    supportPackage: "SAP NetWeaver 7.0, 7.01, 7.02, 7.31, 7.40, 7.50"
  },
  {
    id: 4,
    sourceType: "ODATA",
    iconType: "OData",
    version: "V1",
    supportPackage: "OData 2.0"
  },
  {
    id: 5,
    sourceType: "ODATA",
    iconType: "OData",
    version: "V2",
    supportPackage: "OData 4.0"
  },
  {
    id: 6,
    sourceType: "ODATA SAP ERP",
    iconType: "SapOdata",
    version: "V1",
    supportPackage: "SAP NetWeaver Gateway 2.0 (SP 07 – SP 17)"
  },
  {
    id: 7,
    sourceType: "ODATA SAP Business One",
    iconType: "SapOdata",
    version: "V1",
    supportPackage: "SAP Business One 9.2 PL04 – 10.0 FP 2302"
  },
  {
    id: 8,
    sourceType: "ODATA SAP ByDesign",
    iconType: "SapOdata",
    version: "V1",
    supportPackage: "SAP Business ByDesign 2105 – 2408"
  },
  {
    id: 9,
    sourceType: "SAP S/4HANA Cloud Public Edition",
    iconType: "SAPHanaC",
    version: "V1",
    supportPackage: "2308, 2402, 2408 (quarterly releases)"
  }
];


const tableDataDestination: TableRowData[] =[
  {
    id: 1,
    sourceType: "Amazon S3",
    iconType: "S3",
    version: "V1",
    supportPackage: "API REST (Signature v2, v4)"
  },
  {
    id: 2,
    sourceType: "Amazon S3",
    iconType: "S3",
    version: "V2",
    supportPackage: "AWS SDK for Java v2 – Multi-Region Access Points"
  },
  {
    id: 3,
    sourceType: "Snowflake",
    iconType: "Snowflake",
    version: "V1",
    supportPackage: "Snowflake JDBC 3.x / SnowSQL 1.x"
  },
  {
    id: 4,
    sourceType: "Snowflake",
    iconType: "Snowflake",
    version: "V2",
    supportPackage: "Snowflake JDBC 3.14+ / API v2 (OAuth 2.0, External Browser Auth)"
  },
  {
    id: 5,
    sourceType: "Azure Storage",
    iconType: "Azure",
    version: "V1",
    supportPackage: "Blob Service REST API 2019-02-02 a 2021-08-06"
  },
  {
    id: 6,
    sourceType: "Azure SQL Server",
    iconType: "AzureSql",
    version: "V1",
    supportPackage: "Microsoft SQL Server 2012–2019 / Azure SQL Database v11-v12"
  },
  {
    id: 7,
    sourceType: "Microsoft SQL Server",
    iconType: "MSSQL",
    version: "V1",
    supportPackage: "JDBC/ODBC SQL Server 2008 – 2022"
  },
  {
    id: 8,
    sourceType: "Databricks",
    iconType: "Databricks",
    version: "V1",
    supportPackage: "JDBC 2.6 – 3.0 / Databricks Runtime 7.x – 14.x"
  },
  {
    id: 9,
    sourceType: "Google Cloud Storage",
    iconType: "GoogleStorage",
    version: "V1",
    supportPackage: "XML & JSON API (compatibles con S3 SDK v2)"
  },
  {
    id: 10,
    sourceType: "Google BigQuery",
    iconType: "GoogleBigquery",
    version: "V1",
    supportPackage: "BigQuery API v2 / Standard SQL Dialect"
  },
  {
    id: 11,
    sourceType: "Windows File Server",
    iconType: "file",
    version: "V1",
    supportPackage: "SMB 2.0 – 3.1.1 / NTLM Auth v2"
  },
  {
    id: 12,
    sourceType: "Amazon Redshift",
    iconType: "AWS",
    version: "V1",
    supportPackage: "Redshift JDBC 4.2 Driver 2.x / API Cluster v1"
  },
  {
    id: 13,
    sourceType: "Teradata",
    iconType: "Teradata",
    version: "V1",
    supportPackage: "Teradata JDBC 16.x – 17.x / TD SQL Engine 16.20+"
  }
]



interface Frame1Props {
  filteredData: TableRowData[];
}

function Frame1({ filteredData }: Frame1Props) {
  const totalRows = filteredData.length + 1; // +1 for header
  
  return (
    <div 
      className={style.tableContainer}
      style={{
        gridTemplateRows: `repeat(${totalRows}, minmax(0px, 1fr))`,
        height: `${totalRows * 60.3}px`
      }}
    >
      <div className={style.tableCell} style={{ gridArea: '1 / 2' }}>
        <div className={style.flexRow}>
          <div className={style.cellContent}>
            <p className={style.headerText}>Version</p>
          </div>
        </div>
        <div className={style.cellBorder} />
      </div>

      <div className={style.tableCell} style={{ gridArea: '1 / 3' }}>
        <div className={style.flexRow}>
          <div className={style.cellContent}>
            <p className={style.headerText}>Support package</p>
          </div>
        </div>
        <div className={style.cellBorder} />
      </div>

      <div className={style.tableCell} style={{ gridArea: '1 / 1' }}>
        <div className={style.flexRow}>
          <div className={style.cellContent}>
            <p className={style.headerText}>Source type</p>
          </div>
        </div>
        <div className={style.cellBorder} />
      </div>

      {filteredData.map((row, index) => (
        <TableRow key={row.id} data={row} rowIndex={index} />
      ))}
    </div>
  );
}

interface TablaProps {
  tipe: string;
}

export default function Tabla({ tipe }: TablaProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const handleToggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      // Clear search when closing
      setSearchTerm("");
    }
  };
  
  const currentData = tipe === "source" ? tableData : tableDataDestination;
  
  const filteredCurrentData = currentData.filter(row => {
    const searchLower = searchTerm.toLowerCase();
    return (
      row.sourceType.toLowerCase().includes(searchLower) ||
      row.version.toLowerCase().includes(searchLower) ||
      row.supportPackage.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className={style.mainContainer} data-name="Tabla">
      <div className={style.innerContainer}>
        <Frame 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm}
          isSearchOpen={isSearchOpen}
          onToggleSearch={handleToggleSearch}
          title={tipe === "source" ? "Source" : "Destination"}
        />
        <Frame1 filteredData={filteredCurrentData} />
      </div>
      <div className={style.mainBorder} />
    </div>
    
  );
}


