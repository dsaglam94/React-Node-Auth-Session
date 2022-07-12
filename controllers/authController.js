const User = require("../models/user");
const bcrypt = require("bcrypt");

// Handle errors
// const handleErrors = (error) => {};

module.exports.signup_post = async (req, res) => {
  const { user_name, email, password, name } = req.body;
  // Checking if the user is already exist
  let isUserExist = await User.exists({ user_name: user_name });
  if (isUserExist)
    return res.json({ loggedIn: false, message: "user is already exist" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
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
};

module.exports.login_post = async (req, res) => {
  console.log(req.session);
  const user = await User.findOne({ user_name: req.body.user_name });
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
};

module.exports.login_get = async (req, res) => {
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
};

module.exports.logout_get = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    res.redirect("/");
  });
};
