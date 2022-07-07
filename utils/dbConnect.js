const mongoose = require("mongoose");
const MONGO_URI =
  "mongodb+srv://auth-test:81883288@cluster0.kccslk3.mongodb.net/auth-test?retryWrites=true&w=majority";
const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }
  console.log("Connecting to the Database");
  const db = await mongoose.connect(MONGO_URI, {
    UseNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.isConnected = db.connections[0].readyState;
  console.log("Connected to the Database");
}

module.exports = dbConnect;
