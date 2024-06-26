const express = require("express");
const mongoDbConnection = require("./connection");
const path = require("path");
const cookieParser = require("cookie-parser");
const {restrictToLoggedinUserOnly} = require("./middlewares/auth");

// const staticRoute = require("./routes/staticRoute");
// const urlRoute = require("./routes/url");
// const userRoute = require("./routes/user");

const app = express();
PORT = 4001;

//mongodb connection
mongoDbConnection("mongodb://127.0.0.1:27017/short-url")
.then(() => console.log("connected to mongoDB"))
.catch(err => console.log("Error", err))

//set views
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middlewares
app.use(express.json({extended: false}))
app.use(express.urlencoded({extended: false}))
app.use(cookieParser());

//api route
app.use("/url", restrictToLoggedinUserOnly, require("./routes/url"));
app.use("/user", require("./routes/user"));

//static route for html page 
app.use("/", require("./routes/staticRoute"));

//listen server
app.listen(PORT, ()=> console.log( `server runnung on port ${PORT}`));