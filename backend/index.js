const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const gameRouter = require("./routes/gamesRoutes");
const userRouter = require('./routes/userRoutes');
const app = express();
const { PORT } = require('./config');
const db = require('./db');

// implement cors

app.use(express.json());
app.use(authRouter);
app.use(gameRouter);
app.use(userRouter);
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
