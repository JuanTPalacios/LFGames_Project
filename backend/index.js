const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const gameRouter = require("./routes/gamesRoutes");
const app = express();
const { PORT } = require('./config');

// implement cors

app.use(express.json());
app.use(authRouter);
app.use(gameRouter);
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
