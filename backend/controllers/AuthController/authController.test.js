import express from 'express';
import supertest from 'supertest';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const router = require('../../routes/authRoutes');
const User = require('../../models/user');
const cfg = require('../../config');

const validUser = {
  userName: 'timboslice',
  userPassword: 'wowhesacoolguy',
  userEmail: 'timbo@slice.com'
};

describe ('Authcontroller tests', () => {
  const app = express();
  app.use(express.json());
  app.use(router);
  const request = supertest(app);
  
  beforeAll(async () => {
    mongoose.connect(cfg.MONGOURI, { useNewURlParser: true });
    await User.create({
      userName: 'timboslice',
      email: 'timbo@slice.com',
      password: bcrypt.hashSync(validUser.userPassword, 10)
    });
  });
  
  afterAll(async () => {
    await User.deleteMany();
    mongoose.connection.close();
  });
  
  describe('Login', () => {
    it('should sign in valid users', async () => {
      //await User.create({
      //  userName: 'timboslice',
      //  email: 'timbo@slice.com',
      //  password: bcrypt.hashSync(validUser.userPassword, 10)
      //});
      const res = await request.post('/signin').send(validUser);
      expect(res.status).toBe(200);
    });

    it('should reject invalid passwords', async () => {
      //await User.create({
      //  userName: 'timboslice',
      //  email: 'timbo@slice.com',
      //  password: bcrypt.hashSync(validUser.userPassword, 10)
      //});
      const res = await request.post('/signin').send({
        userEmail: 'timbo@slice.com',
        userName: 'whocares',
        userPassword: 'fuck'
      });
      expect(res.status).toBe(422);
    });

    it('should reject requests with missing fields', async () => {
      const form1 = {
        userEmail: 'poo@poo.com',
        userName: 'woeifjwoeifj',
      };
      const form2 = {
        userName: 'owiejfoiwejf',
        userPassword: 'woiefjwoeifj'
      };
      const form3 = {
        userEmail: 'poo@poo.com',
        userPassword: 'pickleRickhahahaha'
      };
      const form4 = {};
      const res1 = await request.post('/signin').send(form1);
      const res2 = await request.post('/signin').send(form2);
      const res3 = await request.post('/signin').send(form3);
      const res4 = await request.post('/signin').send(form4);
      expect(res1.status).toBe(422);
      expect(res2.status).toBe(422);
      expect(res3.status).toBe(422);
      expect(res4.status).toBe(422);
    });
  });
});