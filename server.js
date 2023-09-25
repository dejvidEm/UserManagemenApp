const express = require("express");     // all imports
const dotenv = require("dotenv");       
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");

const connectDB = require("./server/database/connection");

const app = express();      // creating server

dotenv.config({ path: `config.env` });      // specifying path to my .env variables
const PORT = process.env.PORT || 8080       // choosing base port to run my server on

// log request
app.use(morgan("tiny"));

// mongoDB connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");
// app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

// load routers
app.use("/", require("./server/routes/router"));

app.listen(PORT, () => {        // setting my base port with variable from .env file
    console.log(`Server is running on port http://localhost:${PORT}`);
});