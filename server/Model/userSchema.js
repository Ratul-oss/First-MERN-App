const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const dataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Your email is invalid");
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
    minlength: 7
  },
  country: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
});

// * hashing the password
dataSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const UserData = new mongoose.model("UserData", dataSchema);

module.exports = UserData;
