import {
  Attribute,
  AutoGenerateAttribute,
  AUTO_GENERATE_ATTRIBUTE_STRATEGY,
  Entity,
} from '@typedorm/common';

@Entity({
  name: 'activeSession',
  primaryKey: {
    partitionKey: 'ACTIVESESSION#{{token}}',
    sortKey: 'ACTIVESESSION#{{token}}',
  },
})

export default class ActiveSession {
  @Attribute()
  token!: string;

  @Attribute()
  userId!: string;

  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.EPOCH_DATE,
    autoUpdate: true, // this tells TypeDORM to auto update this attribute for each update operation on entity
  })
  createDate?: Date;
}

