const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const blacklist = [];

const signUp = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;
    console.log(req.body);
    if (!userEmail || !userPassword) {
      return res.status(422).send({ error: "Must provide email and password" });
    }
    const user = await User.findOne({ email: userEmail });
    if (user) {
      return res
        .status(422)
        .send({ error: "Email Adress already exists, Try again" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(userPassword, salt);

    const existingUser = await User.create({
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
  const { userEmail: email, userPassword: password } = req.body;

  if (!email || !password) {
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
    console.log(user);
    if (!user) res.status(422).send({ error: "Must be signed In" });
    res.status(200).send({message: 'Successfully signed out'});
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
