const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/user");
require("dotenv").config();
const { blacklist } = require('../controllers/authController')

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ error: "you must be logged in" });
  }
  const token = authorization.replace("Bearer ","");
  if (blacklist.includes(token)) {
   return res.status(402).send({message: 'Unverified'})
  } 

  jwt.verify(token, process.env.SECRET, async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: "you must be logged in" });
    }
    const { userId } = payload;
    const user = await User.findById(userId);
    if(!user) return res.status(422).send({error: 'Could not find an existing account'})
    req.user = user;
    req.token = token;
    next();
  });
};


