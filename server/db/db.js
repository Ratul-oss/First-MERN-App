const mongoose = require("mongoose");

const db = process.env.DATABASE_URL;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connection Successful"))
  .catch((err) => console.log("No connection"));
