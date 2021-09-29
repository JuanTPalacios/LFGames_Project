const express = require("express");

const mongoose = require("mongoose");


const authMiddleWare = require("../Middlewares/authMiddleware");
const gameController = require('../controllers/gameController')
const router = express.Router();




router.post("/addGame", authMiddleWare, gameController.addGameToList);
router.get("/games", authMiddleWare, gameController.getAllGames);


module.exports = router;
