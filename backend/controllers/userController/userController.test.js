import express from 'express';
const router = require('../../routes/userRoutes');
import supertest from 'supertest';
const User = require('../../models/user');
const cfg = require('../../config');
import mongoose from 'mongoose';
import { JsonWebTokenError } from 'jsonwebtoken';
import { afterAll, it } from 'jest-circus';

const validUser = {
  userEmail: 'idiot@idiot.com',
  userName: 'billyBob',
  userPassword: 'bob1232394898'
};

describe ('Integration tests', () => {
  const app = express();
  app.use(express.json());
  app.use(router);
  const request = supertest(app);
  
  beforeAll(() => {
    mongoose.connect(cfg.MONGOURI, { useNewURlParser: true });
  });
  
  afterEach(async () => {
    await User.deleteMany();
  });
  
  afterAll((done) => {
    mongoose.connection.close();
    done();
  });
  
  it('should save a user to the database', (done) => {
    (async () => {
      await request.post('/user').send(validUser)
      const user = await User.findOne({ email: validUser.userEmail });
      expect(user.email).toBe(validUser.userEmail);
      done();
    })();
  });
  
  it('should not allow duplicate email addresses', (done) => {
    (async () => {
      await request.post('/user').send(validUser);
      const res = await request.post('/user').send({ 
        userName: 'fuck', 
        userEmail: 'idiot@idiot.com',
        userPassword: 'fuck javascript123'});
        expect(res.body.error).toBe('Email already exists, Try again');
      const users = await User.find({ email: validUser.userEmail });
      expect(users.length).toBe(1);
      done();
    })();
  });
  
  it('should only accept requests with all fields', (done) => {
    (async () => {
      const res = await request.post('/user').send({
        fuck: 'the police',
        poo: 'stinky',
        userEmail: 'stinky@poo.com',
        userPassword: 'helloWorld'
      });
      expect(res.body.error).toBe('Must provide email and password');
      
      const res2 = await request.post('/user').send({});
      expect(res2.body.error).toBe('Must provide email and password');
      
      const res3 = await request.post('/user').send({
        userPassword: 'woeifjqpwoeifjwef'
      });
      expect(res3.body.error).toBe('Must provide email and password');
      
      const user = await User.find({ email: 'stinky@poo.com'});
      expect(user.length).toBe(0);
      done();
    })();
  });

  it('should only accept passwords of eight or more characters', (done) => {
    (async () => {
      const res = await request.post('/user').send({
        userName: 'bigloser',
        userEmail: 'email@email.com',
        userPassword: 'badpass'
      });
      const newUser = await User.find({ email: 'email@email.com' });
      expect(res.status).toBe(422);
      expect(newUser.length).toBe(0);
      done();
    })();
  });
  
  it('should hash user passwords', (done) => {
    (async () => {
      await request.post('/user').send(validUser);
      const user = await User.find({ email: validUser.email });
      expect(user.userPassword).toBe(5);
      done();
    })();
  });
});