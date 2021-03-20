const express = require("express");
const router = express.Router();
const UserData = require("../Model/userSchema");
const bcrypt = require("bcrypt");
const cookierParser = require("cookie-parser");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(cookierParser());

router.get("/", (req, res) => {
  res.send("Hi there.");
});
router.get("/about", (req, res) => {
  res.send("Hi guys");
});
router.get("/contact", (req, res) => {
  res.send("Yo");
});
router.get("/signIn", (req, res) => {
  res.send("hi there");
});
router.get("/signup", (req, res) => {
  res.send("yo");
});

router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      gender,
      phone,
      password,
      country,
      profession,
    } = req.body;

    const response = await UserData.findOne({ email: email });
    if (response) {
      res.status(400).json({ error: "Email already exists" });
    }

    const userData = new UserData({
      name,
      email,
      gender,
      phone,
      password,
      country,
      profession,
    });

    const data = await userData.save();

    if (data) {
      res.status(200).json({ success: "Registrations successful" });
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await UserData.findOne({ email });
    const isMatched = await bcrypt.compare(password, data.password);

    if (isMatched) {
      res
        .status(200)
        .send(
          `Log In success your name is ${data.name} and your email is ${data.email}`
        );
    } else {
      res.send("Your log in details are incorrect");
    }
  } catch (err) {
    res.status(400).send("Your log In details are incorrect");
  }
});

module.exports = router;
