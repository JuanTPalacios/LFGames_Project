const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const blacklist = [];

// style
// add err logs
// write validation functions -- pw length and such
// check for existing username
// update bcrypt salt styling
// change 'existingUser' var name
// replace process.env.secret
// add err logging to err msgs
// move some of these functions to userController


const signUp = async (req, res) => {
  try {
    const { userEmail, userPassword, userName } = req.body;
    if (!userEmail || !userPassword || !userName) {
      return res.status(422).send({ error: "Must provide email and password" });
    }
    const user = await User.findOne({ email: userEmail });
    if (user) {
      return res
        .status(422)
        .send({ error: "Email already exists, Try again" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(userPassword, salt);

    const existingUser = await User.create({
      userName,
      email: userEmail,
      password: hash,
    });
    const token = jwt.sign({ userId: existingUser._id }, process.env.SECRET);
    res.status(200).send({ user: existingUser, token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
};

const signIn = async (req, res) => {
  const { userEmail: email, userPassword: password, userName } = req.body;

  if (!email || !password || !userName) {
    return res.status(422).send({ error: "Must provide email and password" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: "Email not found" });
    }

    bcrypt.compare(password, user.password, (err, isValid) => {
      if (err) {
        return res.status(422).send({ error: "Invalid email or password" });
      }
      if (isValid) {
        const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
          expiresIn: "7d",
        });
        return res.status(200).send({ token, user });
      }
    });
  } catch (err) {
    return res.status(422).send(err.message);
  }
};

const getUser = async (req, res) => {
  try {
    const { _id } = req.user;
    const token = req.token;
    const user = await User.findById(_id);
    if (!user) res.send(422).send({ error: "No user found" });
    return res.status(200).send({ user, token });
  } catch {
    return res.status(404).send({ error: "Resource not found" });
  }
};

const signOutUser = async (req, res) => {
  try{

    const { _id } = req.user;
    const token = req.token;
    const user = await User.findById(_id);
    if (!user) return res.status(422).send({ error: "Must be signed In" });
    blacklist.push(token)
    return res.status(200).send({message: 'Successfully signed out'});
  } catch (err) {
    res.status(422).send({error: err.message})
  }
};

module.exports = {
  signUp,
  signIn,
  getUser,
  signOutUser,
  blacklist,
};

