const express = require("express");
const router = express.Router();
const UserData = require("../Model/userSchema");
const bcrypt = require("bcrypt");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

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
    const typedName = req.body.name;
    const typedMail = req.body.email;
    const userGender = req.body.gender;
    const typedPhone = req.body.phone;
    const typedPassword = req.body.password;
    const userCountry = req.body.country;
    const typedProfession = req.body.profession;

    if (
      !typedName ||
      !typedMail ||
      !userGender ||
      !typedPhone ||
      !typedPassword ||
      !userCountry ||
      !typedProfession
    ) {
      res.status(400).json({ err: "Please fill all the fields properly" });
    }

    const userInfo = new UserData({
      name: typedName,
      email: typedMail,
      gender: userGender,
      phone: typedPhone,
      password: typedPassword,
      country: userCountry,
      profession: typedProfession,
    });

    const checkEmail = await UserData.findOne({ email: typedMail });
    const token = await userInfo.generateToken();

    if (checkEmail) {
      res.status(400).json({ err: "Email already exists" });
    }

    res.cookie("jwt", token);
    await userInfo.save();
    res.status(200).json({ success: "Your account has been registered" });
    //
  } catch (err) {
    res.status(400).send(err);
  }
});
router.post("/login", async (req, res) => {
  try {
    const typedMail = req.body.email;
    const typedPassword = req.body.password;
    const data = await UserData.findOne({ email: typedMail });
    const isMatched = await bcrypt.compare(typedPassword, data.password);

    if (isMatched) {
      const token = await data.generateToken();
      res.cookie("jwt", token);
      res
        .status(200)
        .json({ success: `Successfuly logged in. ${data.name} ${data.email}` });
    } else {
      res.status(400).json({ err: "Your login details are incorrect" });
    }
  } catch (err) {
    res.status(400).json({ err: "Your login details are incorrect" });
  }
});

module.exports = router;
