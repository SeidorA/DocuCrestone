import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from '@site/src/components/HomepageFeatures/styles.module.css';
import Heading from '@theme/Heading';
import { Brand, CaralIcon } from 'iconcaral2';


export type FeatureItem = {
  title: string;
  description: ReactNode;
  img?: string;
  link?: string;
  icon?: string;
  brand?: boolean;
};

function Icontrue(icon, brand) {
  return (
    <div
      className={clsx(styles.top_img_card)}
      style={{
        backgroundImage: `url(/img/explore/bg-${Math.floor(Math.random() * 7) + 1}.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {brand === true ? <Brand name={icon} size={50} /> : <CaralIcon name={icon} size={50} />}
    </div>
  );
};


export function Cardcre({ title, img, description, link, icon, brand }: FeatureItem) {
  return (
    <Link to={link}>
      <div className={styles.card}>
        {icon ? Icontrue(icon, brand) : <img src={`/img/explore/${img}.png`} alt={title} className={styles.featureImage} />}
        <div className="padding-horiz--md ">
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
}

export function Feature({ title, img, description, link, icon, brand }: FeatureItem) {

  return (
    <div className={clsx('col col--4 margin-bottom--lg')}>
      <Cardcre
        title={title}
        img={img}
        description={description}
        link={link}
        icon={icon}
        brand={brand} />
    </div>
  );
}


type TitleiconProps = {
  icon: string;
  children?: React.ReactNode;
};

export function Titleicon({ icon, children }: TitleiconProps) {
  // Only assign id if content is a string, otherwise omit id

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '20px 0' }}>
      <CaralIcon name={icon} />
      {children}
    </div>
  );
}