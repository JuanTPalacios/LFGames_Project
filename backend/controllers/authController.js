const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { ACCESS_TOKEN_SECRET } = require("../config");
const blacklist = [];

// style
// add err logs
// write validation functions -- pw length and such
// check for existing username
// update bcrypt salt styling
// change 'existingUser' var name
// add err logging to err msgs
// move some of these functions to userController
// change to persistant blacklist

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
        const token = jwt.sign({ userId: user._id }, ACCESS_TOKEN_SECRET, {
          expiresIn: "7d",
        });
        return res.status(200).send({ token, user });
      }
    });
  } catch (err) {
    return res.status(422).send(err.message);
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
  signIn,
  getUser,
  signOutUser,
};

