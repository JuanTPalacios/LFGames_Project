const mongoose = require("mongoose");
const { MONGOURI } = require('./config');

mongoose.connect(MONGOURI);

mongoose.connection.on("connected", () => {
  console.log("connected to MongoDb");
});
mongoose.connection.on("error", () => {
  console.log("Error connecting to MongoDb");
});

module.exports = mongoose;
