var dotenv = require("dotenv")
var AWS = require('aws-sdk');
import {dynamoDBSampleAppTable} from './table';
//import Employee from '../models/employee';
import User from '../models/user';
import ActiveSession from '../models/activeSession';
import Organisation from '../models/organisation'
import SensorPOD from '../models/sensorPod'
import SensorData from '../models/sensordata'


//import Product from './entity/product';
import {Connection, createConnection} from '@typedorm/core';
dotenv.config();

AWS.config.update({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region: process.env.region,
    endpoint: process.env.endpoint,
});

export let connection : Connection | undefined;

export const connect = async (): Promise<Connection | undefined> => {
    try {
      const db = new AWS.DynamoDB.DocumentClient({convertEmptyValues: true});
      const conn = await createConnection({
        table: dynamoDBSampleAppTable,
        entities: [Organisation, User, ActiveSession, SensorPOD, SensorData], //Employee,,,,
        documentClient: db,
    });
      connection = conn;
      console.log(`Database connection success.`);
    } catch (err) {
      console.log(err);
    }
    return undefined;
  };
