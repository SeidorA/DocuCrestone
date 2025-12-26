import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';

type FeatureItem = {
  title: string;
  description: ReactNode;
  img: string;
  link?: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Create a source',
    img: 'source',
    description: (
      <>
        Connect to your SAP system in just a few steps.
      </>
    ),
    link: 'docs/documentation/intro',
  }, {
    title: 'Create a destination',
    img: 'Destination',
    description: (
      <>
        Configure where you want to send the data extracted from SAP.
      </>
    ),
    link: 'docs/documentation/intro',
  },
  {
    title: 'Create a Node',
    img: 'Node',
    description: (
      <>
        Define what data to extract and how to process it before sending it.
      </>
    ),
    link: '/docs/documentation/sections/nodes/',
  },
  {
    title: 'Create a Job',
    img: 'Job',
    description: (
      <>
        Orchestrate the execution of multiple nodes and destinations with customized rules.
      </>
    ),
    link: '/docs/documentation/sections/jobs',
  },
  {
    title: 'Workspaces',
    img: 'WorkSpace',
    description: (
      <>Organize your connections, nodes and jobs in collaborative environments. </>
    ),
    link: 'docs/documentation/sections/settings#1-add-new-workspace',
  },
  {
    title: 'Monitor',
    img: 'Monidor',
    description: (
      <>
        Monitor the status and results of each run in real time.
      </>
    ),
    link: 'docs/documentation/sections/monitor',
  },
];

function Feature({ title, img, description, link }: FeatureItem) {

  return (

    <div className={clsx('col col--4 margin-bottom--lg')}>
      <Link to={link} >
        <div className={styles.card} >
          <div className="text--center">
            <img src={`./img/explore/${img}.png`} alt="" />
          </div>
          <div className="padding-horiz--md ">
            <Heading as="h3">{title}</Heading>
            <p>{description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <section className={styles.features}>
      <div className="container">
        <h1>{siteConfig.title} Docs</h1>
        <p>Crestone is an innovative data integration software designed for companies looking for an efficient solution to synchronize, transform and transfer data between diverse business systems, such as ERP, CRM, databases and data analysis platforms.</p>
        <p>This product is designed to offer an intuitive user experience, allowing non-technical users to manage complex data flows with ease.</p>
        <h1>Discover {siteConfig.title}</h1>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
