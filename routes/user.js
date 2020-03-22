const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../validation");
const User = require("../model/User");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if the name already exists
  const nameExists = await User.findOne({ name: req.body.name });
  if (nameExists) return res.status(400).send("Name already taken!");

  // Check if the email already exists
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already taken!");

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create new User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if the user already exists
  const user = await User.findOne({ name: req.body.name });
  if (!user) return res.status(400).send("Your name or password is wrong!");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("Your name or password is wrong!");

  // Create and assing token
  const token = jwt.sign(
    {
      _id: user.id
    },
    process.env.TOKEN_SECRET
  );

  res.header("auth-token", token).send(token);
});

router.get("/get", async (req, res) => {
  const user = await User.findOne({ _id: req.body.id });
  if (!user) res.status(401).send("User not avaible");

  res.send(user);
});

router.get("/get/all", async (req, res) => {
  User.find({}, (error, users) => {
    if (error) res.status(401).send(error);
    res.send(users);
  });
});

router.post("/delete", async (req, res) => {
  const user = await User.findOne({ _id: req.body.id });
  if (!user) res.status(401).send("User is not avaible");

  user.remove();
  res.send("deleted");
});

router.post("/delete/all", async (req, res) => {
  await User.find({}, (error, users) => {
    if (error) res.status(401).send(error);
    users.forEach(user => {
      user.remove();
    });
  });
  res.send("Deleted");
});

module.exports = router;
