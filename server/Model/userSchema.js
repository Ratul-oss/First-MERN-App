const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// TODO: Create a schema
// TODO: Then create a collection
// TODO: After that create middleware which will hash the password
// TODO: Then add another middleware which will generate and add auth tokens

const dataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // checking if the email is not valid
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Your email is not valid");
      }
    },
  },
  gender: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
  },
  country: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
});

// generating auth token
dataSchema.methods.generateToken = async function () {
  try {
    const token = jwt.sign({ id: this._id.toString() }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    res.status(500).json({ err: "Something went wrong" });
  }
};

// hashing the password before save
dataSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// creating the collection/ model
const UserData = new mongoose.model("User", dataSchema);

module.exports = UserData;
