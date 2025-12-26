import { ReactNode } from "react";
import { Brand, CaralIcon  } from 'iconcaral2';
import Link from '@docusaurus/Link';


type BrandItem = {
    name: string;
    link: string;
};
const BrandList: BrandItem[] = [
    {
        name: 'SAP',
        link: 'https://www.sap.com/index.html'
    },
    {
        name: 'AWS',
        link: 'https://aws.amazon.com/pt/'
    },
    {
        name: 'Google',
        link: 'https://cloud.google.com/?hl=pt'
    },
    {
        name: 'Azure',
        link: 'https://azure.microsoft.com/pt-br/'
    },{
        name: 'Databricks',
        link: 'https://www.databricks.com/'
    },{
        name: 'snowflake',
        link: 'https://www.snowflake.com/en/'
    },{
        name: 'AzureSql',
        link: 'https://azure.microsoft.com/pt-br/products/sql-database/'
    },{
        name: 'Redshift',
        link: 'https://aws.amazon.com/redshift/'
    },{
        name: 'CloudStorage',
        link: 'https://aws.amazon.com/s3/'
    },{
        name: 'GoogleStorage',
        link: 'https://cloud.google.com/storage?hl=pt'
    },{
        name: 'Teradata',
        link: 'https://www.teradata.com/'
    },{
        name: 'Cloudera',
        link: 'https://www.cloudera.com/'
    }
];

function BrandCre({ name, link }: BrandItem) {
    return (
        <div className="col col--2 text--center margin-bottom--lg">
            <Link to={link} >
                <Brand name={name} size={50}/>
            </Link>

        </div>
    );
}

export default function Conections(): ReactNode {
    return(
        <div style={{ backgroundColor: 'var(--ifm-color-gray-medium)', padding: '2em' }}>
            <div className="container">
                <h1 style={{ color: 'var(--ifm-color-gray-carbon)' }}className="margin-bottom--lg">Connections</h1>
                <div className="row center">
                        {BrandList.map((props, idx) => (
                            <BrandCre key={idx} {...props} />
                        ))}
                    <div className="col col--2 text--center margin-bottom--lg">
                        <Link to='/' >
                            <CaralIcon name='OData' size={50} color="#F88A00"/>
                        </Link>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}