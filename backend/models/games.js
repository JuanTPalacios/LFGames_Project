const mongoose = require("mongoose");
const User = require('./user')


const gameSchema = new mongoose.Schema({
  gameId: {
    type: Number
  },
  name: {
    type: String,
  },
  'cover.url': {
    type: String
  },
  total_rating: {
    type: Number,
  },
  cover_image_id: {
    type: String
  },
  genres: {
    type: Array
  },
  platforms: {
    type: Array
  },
  first_release_date: {
    type: Number
  },
  completed: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Games", gameSchema);

// user: user ref
// find out where we're getting these games
// user -> users? array?
// relational db migrate?
// look into changing cover.url for sake of consistency