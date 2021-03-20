require("dotenv").config();
const express = require("express");
const app = express();

const port = process.env.PORT || 8000;
require("./db/db");
const router = require("./routers/routes");

app.use(router);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => console.log(`Connected to port: ${port}`));
