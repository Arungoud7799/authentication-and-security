require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const md5 = require("md5")
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://Arun:Arun@mycluster.e1duqc1.mongodb.net/userDB", {useNewUrlParser : true});

const userSchema = new mongoose.Schema({
    email : String,  
    password : String
});


console.log(md5("aarun"))

const User = new mongoose.model("User", userSchema)



app.get("/", (req, res)=>{
    res.render("home");
})

app.get("/login", (req, res)=>{
    res.render("login")
})

app.get("/register", (req, res)=>{
    res.render("register")
})

app.post("/register", (req, res) => {
    const newUser = new User({
      email: req.body.username,
      password: md5(req.body.password)
    });
    
    newUser.save()
      .then(() => {
        res.render("secrets");
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = md5(req.body.password);
    
    User.findOne({ email: username })
      .then((foundUser) => {
        if (foundUser) {
          if (foundUser.password === password) {
            res.render("secrets");
          } else {
            res.send("Incorrect password");
          }
        } else {
          res.send("User not found");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  

app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000");
  });
  
