const express = require("express");
const router = express.Router();
const UserData = require("../Model/userSchema");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());

router.get("/", (req, res) => {
  res.status(200).send("Hi there.");
});
router.get("/about", (req, res) => {
  res.status(200).send("Hi guys");
});
router.get("/contact", (req, res) => {
  res.status(200).send("Yo");
});
router.get("/signIn", (req, res) => {
  res.status(200).send("hi there");
});
router.get("/signup", (req, res) => {
  res.status(200).send("yo");
});

// * the registration route
router.post("/register", async (req, res) => {
  try {
    // getting all the typed infos from the user
    const typedName = req.body.name;
    const typedMail = req.body.email;
    const userGender = req.body.gender;
    const typedPhone = req.body.phone;
    const typedPassword = req.body.password;
    const userCountry = req.body.country;
    const typedProfession = req.body.profession;

    // checking if the user has filled all the fields
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
    // inserting the data's
    const userInfo = new UserData({
      name: typedName,
      email: typedMail,
      gender: userGender,
      phone: typedPhone,
      password: typedPassword,
      country: userCountry,
      profession: typedProfession,
    });

    const checkEmail = await UserData.findOne({ email: typedMail }); // checking if the email already exists
    // generating an auth token
    const token = await userInfo.generateToken();

    if (checkEmail) {
      res.status(400).json({ err: "Email already exists" });
    }

    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true,
    });

    await userInfo.save();
    res.status(200).json({ success: "Your account has been registered" });
    //
  } catch (err) {
    res.status(400).send(err);
  }
});

// * the login route
router.post("/login", async (req, res) => {
  try {
    // getting all the typed values from the user
    const typedMail = req.body.email; // the email which the user have typed in the email field
    const typedPassword = req.body.password; // the password which the user have typed in the password field

    const data = await UserData.findOne({ email: typedMail }); // checking if the email exists
    const isMatched = await bcrypt.compare(typedPassword, data.password); // checking if the password matches

    if (isMatched) {
      // genarating an auth token
      const token = await data.generateToken();

      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

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
