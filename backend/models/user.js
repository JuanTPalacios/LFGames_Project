const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  games: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Games'

    }
  ]
});

module.exports = mongoose.model("User", userSchema);
