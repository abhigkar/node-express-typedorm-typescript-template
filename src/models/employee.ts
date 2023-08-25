import {
    Attribute,
    AutoGenerateAttribute,
    AUTO_GENERATE_ATTRIBUTE_STRATEGY,
    Entity,
    INDEX_TYPE,
  } from '@typedorm/common';
  
  @Entity({
    name: 'employee',
    primaryKey: {
      partitionKey: 'EMPLOYEE#{{id}}',
      sortKey: 'EMPLOYEE#{{id}}',
    },
    indexes: {
      GSI1: {
        type: INDEX_TYPE.GSI,
        partitionKey: 'REPORTS_TO#{{reportsTo}}',
        sortKey: 'HIRE_DATE#{{hireDate}}',
      },
    },
  })
  export default class Employee {
    @AutoGenerateAttribute({
      strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.UUID4,
    })
    id: string;
  
    @Attribute()
    reportsTo: string;
  
    @AutoGenerateAttribute({
      strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.EPOCH_DATE,
      autoUpdate: true, // this tells TypeDORM to auto update this attribute for each update operation on entity
    })
    updatedAt: Date;

    @Attribute()
    hireDate: string;
    
    //... other attributes
  }