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
}
    

describe ('Authcontroller tests', () => {
  const app = express();
  app.use(express.json());
  app.use(router);
  const request = supertest(app);
  
  beforeAll(() => {
    mongoose.connect(cfg.MONGOURI, { useNewURlParser: true });
  });
  beforeEach(async () => {
    await User.create({
      userName: 'timboslice',
      password: bcrypt.hashSync('wowhesacoolguy', 10),
      email: 'timbo@slice.com' 
    });
  });
  
  afterEach(async () => {
    await User.deleteMany();
  });
  
  afterAll((done) => {
    mongoose.connection.close();
    done();
  });
  
  
  describe('Login', () => {
    it('should sign in valid users', async () => {
      const res = await request.post('/signin').send(validUser);
      expect(res.status).toBe(200);
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
      const res5 = await request.post('/signin').send(validUser);
      expect(res1.status).toBe(422);
      expect(res2.status).toBe(422);
      expect(res3.status).toBe(422);
      expect(res4.status).toBe(422);
      expect(res5.status).toBe(200);
    });

  });
});