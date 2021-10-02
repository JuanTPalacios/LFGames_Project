const express = require("express");

const authMiddleWare = require("../Middlewares/authMiddleware");
const gameController = require('../controllers/GameController/gameController');
const router = express.Router();


router.post("/games", authMiddleWare, gameController.addGameToList);
router.get("/games", authMiddleWare, gameController.getAllGames);


module.exports = router;
