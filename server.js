const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const dbConnect = require("./utils/dbConnect");
const userSchema = require("./models/user");
const bcrypt = require("bcrypt");
const Redis = require("ioredis");
const RedisStore = require("connect-redis")(session);
const cors = require("cors");
const { RedisClient } = require("redis");
const app = express();
require("dotenv").config();

const redisClient = new Redis();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnect();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    credentials: true,
    name: "sid",
    store: new RedisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.ENVIRONMENT === "production" ? "true" : "auto",
      httpOnly: true,
      sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
      maxAge: 1000 * 30 * 10, // session max age in miliseconds
    },
  })
);

app.get("/", (req, res) => {
  res.json({ message: "it worked" });
});

app.post("/signup", async (req, res) => {
  const { user_name, email, password, name } = req.body;
  // Checking if the user is already exist
  let isUserExist = await userSchema.exists({ user_name: user_name });
  if (isUserExist)
    return res.json({ loggedIn: false, message: "user is already exist" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userSchema.create({
      name: name,
      user_name: user_name,
      password: hashedPassword,
      email: email,
    });
    req.session.user = {
      name: user.name,
      email: user.email,
      role: user.role,
    };
    res.status(201).json({
      loggedIn: true,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.log("something went wrong");
    console.log(error);
    res.status(401).json({ message: "error happened" });
  }
});

app.get("/login", async (req, res) => {
  const { user } = req.session;
  console.log("from get login request: ", user);
  if (user && user.name) {
    return res.status(200).json({
      loggedIn: true,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    return res.json({ loggedIn: false });
  }
});

app.post("/login", async (req, res) => {
  console.log(req.session);
  const user = await userSchema.findOne({ user_name: req.body.user_name });
  if (!user) {
    return res.status(401).json({ message: "user not found" });
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      req.session.user = {
        name: user.name,
        email: user.email,
        role: user.role,
      };
      console.log(req.session.user);

      return res.status(200).json({
        loggedIn: true,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      return res
        .status(400)
        .json({ loggedIn: false, message: "Wrong username or password!" });
    }
  } catch (error) {
    console.error(error);
    console.log("login attempt failed");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    res.redirect("/");
  });
});

app.listen(3001, () => {
  console.log("server is listening at the port 3001");
});
