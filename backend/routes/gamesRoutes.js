const express = require("express");

const mongoose = require("mongoose");

const Games = require("../models/games");
const User = require("../models/user");
const authMiddleWare = require("../Middlewares/authMiddleware");
const router = express.Router();

router.use(authMiddleWare);

router.get("/games", async (req, res) => {
  console.log('called')
  const { _id } = req.user;
  const user = await User.findById(_id)
  const games = user.games

  res.status(200).send({games });
});



router.post("/addGame", async (req, res) => {
  try {
    const { _id } = req.user;
  const {name, id: gameId, cover, total_rating, genres, platforms, completed, first_release_date } = req.body
  const url = cover.url;
  const image_id = cover.image_id

  const game = await Games.create({name, gameId, 'cover.url': url, first_release_date, cover_image_id: image_id, total_rating, completed})
  const user = await User.findById(_id)
  user.games = game
  await game.save()
  await user.save()
  res.status(200).send({ user , game});

  } catch (err) {
    console.log(err)
  }
});

module.exports = router;
