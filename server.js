const path = require("path");
const express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var bcrypt = require("bcryptjs");

console.log(process.env.DBHOST);
var connection = mysql.createConnection({
    host:process.env.DBHOST,
    user: process.env.DBUSER,
    password:process.env.DBPASSWORD,
    database: process.env.DB
});
var port = process.env.PORT || 8080;

var app = express();
app.set("view engine", "ejs");
const publicPath = path.join(__dirname, "public");

app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(session({secret: "**Dennis is cool*??",resave:true,saveUninitialized:true}));

connection.query("select * from user",function(err,results){
    if(err)
    {
        console.log("error",err);
    }
    else
    {
        console.log("results",results)
    }

});

app.listen(port, () => {
    console.log("Server is up on port : " + port);
});