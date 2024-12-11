const express = require("express");
const app = express();
// const port = 7000;
const path = require("path");
var bodyParser = require('body-parser')
const cors = require("cors");
app.use(cors());
app.use(express.static("public"));

const connectDb = require("./Config/DBconncection");
// const firebaseAdmin = require("firebase-admin");
// const serviceAccount = require("./config/firebase-adminsdk.json");

// Connect Database
connectDb();
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
// Init Middleware
app.use(express.json({ extended: true }));

//production used area [start]
app.use(express.static(path.join("public")));
//production used area [end]

// Define Routes
app.use("/users", require("./modules/Users/user.route"));
app.use("/expenses", require("./modules/Expense/Expense.router"));

// app.listen(port, () => console.log(`Server started on port ${port}`));// app.use("/authors", require("./modules/AuthorModel/author.router"));
//   if (res.headerSent) {
//     return next(error);
//   }
//   res.status(500);
//   res.json({ message: error.message || "An unknown error occurred!" });
module.exports = app;
