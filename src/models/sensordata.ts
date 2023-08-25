import {
    Attribute,
    AutoGenerateAttribute,
    AUTO_GENERATE_ATTRIBUTE_STRATEGY,
    Entity,
  } from '@typedorm/common';
  
  @Entity({
    name: 'employee',
    primaryKey: {
      partitionKey: 'POD#{{podId}}',
      sortKey: 'SENSORDATA#{{podId}}',
    },
  })
  export default class SensorData {
    @AutoGenerateAttribute({
      strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.UUID4,
    })
    id: string;
  

    @Attribute()
    sensorData: String;

    @Attribute()
    podId: string;
  
    @AutoGenerateAttribute({
      strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.EPOCH_DATE,
      autoUpdate: true,
    })
    insertedAt: Date;
  }