const express = require("express");

const authMiddleWare = require("../Middlewares/authMiddleware");
const gameController = require('../controllers/gameController')
const router = express.Router();

//change endpoints to /games for both

router.post("/addGame", authMiddleWare, gameController.addGameToList);
router.get("/games", authMiddleWare, gameController.getAllGames);


module.exports = router;
