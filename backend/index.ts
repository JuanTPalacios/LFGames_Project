import express from 'express';
import authRouter from './routes/authRoutes';
import gameRouter from './routes/gamesRoutes';
import userRouter from './routes/userRoutes';
import cfg from './config';
import db from './db';

const app = express();

app.use(express.json());
app.use(authRouter);
app.use(gameRouter);
app.use(userRouter);
app.listen(cfg.PORT, () => {
  console.log(`Server listening on port ${cfg.PORT}`);
});
