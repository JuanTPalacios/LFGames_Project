const { ACCESS_TOKEN_SECRET } = require('../config');
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// add some user functions here
// make changeUserNameOrEmail either nonexistent or practical
// tell ppl to fuck off if they want to change their email

const updateUser = async (req, res) => {
  try {
    const { _id } = req.user;
    const {userName, userEmail } = req.body
    const user = await User.findById(userEmail)
    if(!user) return res.status(422).send({error: 'Must be signed in'})
    const updatedUser = User.findByIdAndUpdate(userEmail, {userName, userEmail})
    await updatedUser.save()
    return res.status(200).send({user});
  } catch (err) {
    console.log(err)
    res.send(500).send(err.message);
  }
};

const createUser = async (req, res) => {
  try {
    const { userEmail, userPassword, userName } = req.body;
    if (!userEmail || !userPassword || !userName) {
      return res.status(422).send({ error: "Must provide email and password" });
    }

    // TODO: fix to check for existing userName? or allow duplicate usernames?
    const user = await User.findOne({ email: userEmail });
    if (user) {
      return res.status(422).send({ error: "Email already exists, Try again" });
    }

    const hashedPassword = bcrypt.hashSync(userPassword, 10);
    const newUser = await User.create({
      userName,
      email: userEmail,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: newUser._id }, ACCESS_TOKEN_SECRET);
    res.status(200).send({ user: existingUser, token });
  } catch (err) {
    console.log(err);
    return res.status(422).send(err.message);
  }
};

const getUser = async (req, res) => {
  try {
    // TODO: fix unused token here.
    const { _id } = req.user;
    const token = req.token;
    const user = await User.findById(_id);
    if (!user) res.send(422).send({ error: "No user found" });
    return res.status(200).send({ user, token });
  } catch {
    console.log(err);
    return res.status(404).send({ error: "Resource not found" });
  }
};

module.exports = {
  updateUser,
  createUser,
  getUser
};