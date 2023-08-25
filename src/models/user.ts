  import {
    Attribute,
    AutoGenerateAttribute,
    AUTO_GENERATE_ATTRIBUTE_STRATEGY,
    Entity,
    INDEX_TYPE,
  } from '@typedorm/common';

  export enum USER_ROLE {
    SUADMIN = 'SUADMIN',
    ORGADMIN = 'ORGADMIN',
    READER = 'READER',
    APIUSER = 'APIUSER'
  }
 
  @Entity({
    name: 'user',
    primaryKey: {
      partitionKey: 'ORG#{{org_id}}', 
      sortKey: 'USER#{{id}}',
    },
    indexes: {
      GSI1: {
        type: INDEX_TYPE.GSI,
        partitionKey: 'USER#{{username}}',
        sortKey: 'USER#{{email}}',
      },
    },
  })
  export default class User {
    @AutoGenerateAttribute({
      strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.UUID4,
    })
    id: string;
  
    @Attribute()
    username!: string;

    @Attribute()
    email!: string;

    @Attribute()
    password!: string;

    @AutoGenerateAttribute({
        strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.EPOCH_DATE,
        autoUpdate: true, // this tells TypeDORM to auto update this attribute for each update operation on entity
      })
    date?: Date;

    @Attribute()
    org_id!: string;

    @Attribute({
      isEnum: true, // ATM, when using enum as type, this needs to be defined explicitly
    })
    role: USER_ROLE;
  }