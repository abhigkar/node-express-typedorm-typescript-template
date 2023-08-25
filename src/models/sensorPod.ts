import {
    Attribute,
    AutoGenerateAttribute,
    AUTO_GENERATE_ATTRIBUTE_STRATEGY,
    Entity,
  } from '@typedorm/common';
  
  @Entity({
    name: 'sensorpod',
    primaryKey: {
      partitionKey: 'ORG#{{orgId}}',
      sortKey: 'PDD#{{id}}',
    },
  })
  export default class SensorPOD {
    @AutoGenerateAttribute({
      strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.UUID4,
    })
    id: string;
  
    @Attribute()
    name: string;

    @Attribute()
    orgId: string;

    @Attribute()
    lat: string;
   
    @Attribute()
    long: string;

    @AutoGenerateAttribute({
      strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.EPOCH_DATE,
      autoUpdate: true,
    })
    updatedAt: Date;
  }