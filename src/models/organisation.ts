import {Attribute, Entity, AutoGenerateAttribute,INDEX_TYPE} from '@typedorm/common';
import {AUTO_GENERATE_ATTRIBUTE_STRATEGY} from '@typedorm/common';

@Entity({
  name: 'organisation',
  primaryKey: {
    partitionKey: 'ORG#{{id}}',
    sortKey: 'ORG#{{id}}',
  },
  indexes: {
    GSI1: {
      type: INDEX_TYPE.GSI,
      partitionKey: 'ORG#{{orgName}}',
      sortKey: 'ORG#{{active}}',
    },
  },
})
export default class Organisation {
  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.UUID4,
  })
  id: string;

  @Attribute()
  orgName: string;

  @Attribute()
  status: string;

  @Attribute()
  active: boolean;

  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.EPOCH_DATE,
    autoUpdate: true,
  })
  updatedAt: Date;
}