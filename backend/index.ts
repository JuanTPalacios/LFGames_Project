import express, { Router } from 'express';
//import cors from 'cors';
import authRouter from './routes/authRoutes';
import gameRouter from './routes/gamesRoutes';
import userRouter from './routes/userRoutes';
import cfg from './config';
const db = require('./db');
const app = express();

app.use(express.json());
app.use(authRouter);
app.use(gameRouter);
app.use(userRouter);
app.listen(cfg.PORT, () => {
  console.log(`Server listening on port ${cfg.PORT}`);
});

