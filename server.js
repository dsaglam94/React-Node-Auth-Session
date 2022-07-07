const express = require("express");
const mongoose = require("mongoose");
const dbConnect = require("./utils/dbConnect");
const userSchema = require("./models/user");
const bcrypt = require("bcrypt");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnect();

app.get("/test", (req, res) => {
  res.json({ message: "it worked" });
});

app.post("/signup", async (req, res) => {
  const { user_name, email, password, name } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userSchema.create({
      name: name,
      user_name: user_name,
      password: hashedPassword,
      email: email,
    });
    // res.status(200).json({ message: "success" });
    res.status(200).json({ user: user });
  } catch (error) {
    console.log("something went wrong");
    console.log(error);
    res.status(400).json({ message: "error happened" });
  }
});

app.post("/login", async (req, res) => {
  const user = await userSchema.findOne({ user_name: req.body.user_name });
  console.log(user.password);
  if (!user) {
    return res.status(400).json({ message: "user not found" });
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.status(200).json({
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(400).json({ message: "not allowed" });
    }
  } catch (error) {
    console.error(error);
    console.log("login attempt failed");
  }
});

app.listen(3001, () => {
  console.log("server is listening at the port 3001");
});
