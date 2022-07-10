const express = require("express");
const authRoutes = require("./routes/authRoutes");
const session = require("express-session");
const mongoose = require("mongoose");
const dbConnect = require("./utils/dbConnect");
const Redis = require("ioredis");
const RedisStore = require("connect-redis")(session);
const cors = require("cors");
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

dbConnect()
  .then((result) => app.listen(3001))
  .catch((err) => console.log(err));

app.use(authRoutes);
