const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  phone: { type: String, required: true },
});

const Contact = new mongoose.model("Contact", dataSchema);

module.exports = Contact;
