const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
  if(username.length<8){
    return true
  }else{
    return false
  }
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
  
  let validUsers=users.filter((users)=>users.username===username && users.password===password)
  if(validUsers.length>0){
    return true
  }else{
    return false
  }
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  console.log("hello");
  const username = req.body.username;
  const password = req.body.password;
  console.log("hello");

  if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });
    req.session.authorization = {
      accessToken,username
  }
    return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }

  });

// Add a book review
// regd_users.put("/auth/review/:isbn", (req, res) => {
//   //Write your code here

//   let review=req.params.review
//   return res.status(300).json({message: "Yet to be implemented"});
// });

regd_users.delete("/auth/review/:isbn", (req, res) => {
  let userName=req.body.userName
  let isbn=req.params.isbn
  let filtered_user=users.filter((users)=>users.userName===userName)
  if(filtered_user.length){
    delete filtered_user.books[isbn];
    res.send("Reviews for the isbn"+(req.params.isbn)+"posted by time user test deleted");
  }else{
    res.send("user not found")
  }
});
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
