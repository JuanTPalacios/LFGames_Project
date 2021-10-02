import express from 'express';
import supertest from 'supertest';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const router = require('../../routes/gamesRoutes');
const userRouter = require('../../routes/gamesRoutes');
const Games = require('../../models/games');
const User = require('../../models/user');
const cfg = require('../../config');
const jwt = require('jsonwebtoken');



const validGame = {game: {
    name: 'PONG',
    gameId: 1,
    cover: 'pong-cover.png',
    first_release_date: 1972,
    image_id: 'pong-img.png',
    total_rating: 10,
    platforms: ['Atari'],
    genres: ['Sports'],
    completed: true,
  }
};

describe('gameController tests', () => {
  const app = express();
  app.use(express.json());
  app.use(router);
  app.use(userRouter);
  const request = supertest(app);

  beforeAll( async () => {
    mongoose.connect(cfg.MONGOURI, { useNewURlParser: true });
    await User.create({
      userName: 'Jimboslice',
      email: 'Jimbo@slice.com',
      password: bcrypt.hashSync('password', 10)
    });
  });

  afterEach(async () => {
    await Games.deleteMany();
  });
  
  afterAll( (done) => {
    (async () => {await User.deleteMany();})
    mongoose.connection.close();
    done();
  });

  describe('Add a game', () => {
    it('should save a game to the database', async () => {
      const user = await User.findOne({ email: 'Jimbo@slice.com' });
      const token = await jwt.sign({ userId: user._id }, cfg.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d'
      });
      await request.post('/games').send(validGame).set(
        'Authorization',
        `Bearer ${token}`
      );
      const game = await Games.findOne({ gameId: validGame.gameId });
      expect(game.gameId).toBe(validGame.gameId);
    });

    it('should not allow game duplicates', async () => {
      const user = await User.findOne({ email: 'Jimbo@slice.com' });
      const token = await jwt.sign({ userId: user._id }, cfg.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d'
      });
      await request.post('/games').send(validGame).set(
        'Authorization',
        `Bearer ${token}`
      );
      const res = await request.post('/games').send(validGame).set(
        'Authorization',
        `Bearer ${token}`
      );
      expect(res.body.error).toBe('Already owned!');
      const games = await Games.find({ gameId: validGame.gameId });
      expect(games.length).toBe(1);
    });

    it('should have all necessary fields', async () => {
      const user = await User.findOne({ email: 'Jimbo@slice.com' });
      const token = await jwt.sign({ userId: user._id }, cfg.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d'
      });
      const res = await request.post('/games').send({
        gameId: 1,
        cover: 'pong-cover.png',
        first_release_date: 1972,
        image_id: 'pong-img.png',
        total_rating: 10,
        platforms: ['Atari'],
        genres: ['Sports'],
        completed: true,
        }).set(
        'Authorization',
        `Bearer ${token}`
      );
      expect(res.body.error).toBe('Error found @ gameController');
    });

    it('user should be logged in', async () => {
      const res = await request.post('/games').send(validGame);
      expect(res.status).toBe(401);
      expect(res.body.error).toBe("you must be logged in");
    });

    it('token should match a valid user', async () => {
      const token = await jwt.sign({ userId: 1 }, cfg.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d'
      });
      const res = await request.post('/games').send(validGame).set(
        'Authorization',
        `Bearer ${token}`
      );
      expect(res.status).toBe(500);
      expect(res.body.error).toBe('Error validating user');
    });
  });
});


