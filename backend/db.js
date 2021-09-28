const mongoose = require("mongoose");

const mongoUri = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.ngetw.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;

mongoose.connect(mongoUri);

mongoose.connection.on("connected", () => {
  console.log("connected to MongoDb");
});
mongoose.connection.on("error", () => {
  console.log("Error connecting to MongoDb");
});

module.exports = mongoose;
