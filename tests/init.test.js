import dotenv from 'dotenv';
import path from 'path';
import supertest from 'supertest';
import chai from 'chai';
import api from '../server';

// Load test environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env.test') });

global.app = api;
global.request = supertest(api);
global.expect = chai.expect;
global.assert = chai.assert;
