// Update the import path below to the correct location of your cards module
import { CaralIcon } from 'iconcaral2';
import { FeatureItem, Feature, Titleicon, Cardcre } from '../../cards/cards';

import connectionsData from '../../../../../../../../../../seidor/portal/Portal/src/components/CrestoneConnections/connections.json';

const FeatureList: FeatureItem[] = connectionsData.origins.map((item) => ({
  title: item.title,
  icon: item.iconName,
  brand: item.useBrand,
  description: item.description,
  link: item.link,
}));

const DestinationList: FeatureItem[] = connectionsData.destinations.map((item) => ({
  title: item.title,
  icon: item.iconName,
  brand: item.useBrand,
  description: item.description,
  link: item.link,
}));


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