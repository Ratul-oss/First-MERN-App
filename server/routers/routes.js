const express = require("express");
const router = express.Router();
const UserData = require("../Model/userSchema");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const auth = require("../auth");
const Contact = require("../Model/contactData");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());

router.get("/about", auth, (req, res) => {
  try {
    res.status(200).send(req.user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// for logging out the use
router.get("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    res.clearCookie("jwt");
    await req.user.save();
    res.status(200).send("Succefuly logged out");
  } catch (err) {
    res.status(400).send("Fu!");
  }
});

router.post("/contact_me", async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const message = req.body.message;

    const data = new Contact({
      name,
      email,
      phone,
      message,
    });

    if ((!name, !email, !phone, !message)) {
      res.status(404).send("Please fill all the fields properly");
    }

    await data.save();

    res.status(200).send("Message has been sent");
  } catch (err) {
    res.status(400).send(err);
  }
});

// the user api.
router.get("/users", async (req, res) => {
  try {
    const data = await UserData.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});
// the user api for single user.
router.get("/singleUser/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const data = await UserData.findOne({ _id: id });

    res.status(200).send(data);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// * the registration route
router.post("/register", async (req, res) => {
  try {
    // getting all the typed infos from the user
    const name = req.body.name;
    const email = req.body.email;
    const gender = req.body.gender;
    const phone = req.body.phone;
    const password = req.body.password;
    const country = req.body.country;
    const profession = req.body.profession;

    // checking if the user has filled all the fields
    if (
      !name ||
      !email ||
      !gender ||
      !phone ||
      !password ||
      !country ||
      !profession
    ) {
      res.status(422).send({ err: "Please fill all the fields properly" });
    }
    // inserting the data's
    const userInfo = new UserData({
      name,
      email,
      gender,
      phone,
      password,
      country,
      profession,
    });

    await userInfo.save();
    res.status(200).send({ success: "Your account has been registered" });
    //
  } catch (err) {
    res.status(400).send({ err: "Email already exists" });
  }
});

// * the login for logging in the user
router.post("/user_login", async (req, res) => {
  try {
    // getting all the typed values from the user
    const email = req.body.email; // the email which the user have typed in the email field
    const password = req.body.password; // the password which the user have typed in the password field

    const data = await UserData.findOne({ email: email }); // checking if the email exists
    const isMatched = await bcrypt.compare(password, data.password); // checking if the password matches

    if (isMatched) {
      // genarating an auth token
      const token = await data.generateToken();

      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      // * the success message
      res.status(200).json({ success: `Welcome back ${data.name}` });
    } else {
      // ! the error message if the details are not correct
      res.status(400).json({ err: "Your login details are incorrect" });
    }
  } catch (err) {
    res.status(400).json({ err: "Your login details are incorrect" });
  }
});

module.exports = router;
