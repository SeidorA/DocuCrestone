import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Conections from '@site/src/components/Conections';
import FAQ from '@site/src/components/faq';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={(styles.heroBanner)}>
      <div className="container">
        <p className="hero__subtitle">Get started now</p>
        <Heading as="h1" className="hero__title">
          Help Center
        </Heading>
        
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} Docs`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        
        <HomepageFeatures />
        <Conections />
        <FAQ />
      </main>
    </Layout>
  );
}
