require("dotenv").config();
const express = require("express");
const app = express();

const port = process.env.PORT || 8000;
require("./db/db"); // connecting the database
const router = require("./routers/routes"); // all the routers are in this file

app.use(router);

app.listen(port, () => console.log(`Connected to port: ${port}`));
