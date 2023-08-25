import 'dotenv/config';

import compression from 'compression';
import cors from 'cors';

import express from 'express';
import passport from 'passport';

import initPassport from '../config/passport';
import userRoutes from '../routes/users';
import orgRoutes from '../routes/organisation';

import { connect } from './database';

// Instantiate express
const server = express();
server.use(compression());

// Passport Config
initPassport(passport);
server.use(passport.initialize());

// Connect to sqlite
if (process.env.NODE_ENV !== 'test') {
  connect();
}

server.use(cors());
server.use(express.json());

// Initialize routes middleware
server.use('/api/users', userRoutes);
server.use('/api/organisations',orgRoutes);
//server.use('/api/airquality', airQualityRoute);

export default server;
