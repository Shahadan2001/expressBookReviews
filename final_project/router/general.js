const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code her
  let userName=req.body.userName
  let password=req.body.password
  console.log(password)
  if(userName && password){
    let filtered_users=users.filter((users)=>users.userName===userName)
    if(filtered_users.length===0){
      users.push({"userName":userName,"password":password})
      res.status(200).json({message:"The user successfully added"})
    }else{
      res.status(404).json({message:"User already exist"})
    }
  }else{
    res.status(404).json({message:"User name or password is not provided"})
  }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {

   res.end(JSON.stringify(books));

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn=req.params.isbn
  res.end(JSON.stringify(books[isbn]))
  

  // return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {

  let author=req.params.author
  var books_new=[]
  for(var key in books){
    books_new.push(key);
  }

  for(var i in books_new){
    if(books[books_new[i]].author===author){
       res.write(JSON.stringify(books[books_new[i]]))
    
    }
  }
  res.end()
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  let title=req.params.title
  var books_new=[]
  for(var key in books){
    books_new.push(key);
  }

  for(var i in books_new){
    if(books[books_new[i]].title===title){
       res.write(JSON.stringify(books[books_new[i]]))
    
    }
  }
  res.end()
 
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {

  let isbn=req.params.isbn
  return res.end(JSON.stringify(books[isbn].reviews))

});

//task 11
// //Creating a promise method. The promise will get resolved when timer times out after 6 seconds.
let myPromise10 = new Promise((resolve,reject) => {
  setTimeout(() => {
      console.log(books)
    resolve("Promise resolved")
  },6000)})

//Console log before calling the promise
console.log("Before calling promise");

//Call the promise and wait for it to be resolved and then print a message.
myPromise10.then((successMessage) => {
  console.log("From Callback " + successMessage)
})

//Console log after calling the promise
console.log("After calling promise");

// task 11
// Creating a promise method. The promise will get resolved when timer times out after 6 seconds.
let myPromise11 = new Promise((resolve,reject) => {
  let isbn=1
  setTimeout(() => {
      console.log(books[isbn])
    resolve("Promise resolved")
  },6000)})

//Console log before calling the promise
console.log("Before calling promise");

//Call the promise and wait for it to be resolved and then print a message.
myPromise11.then((successMessage) => {
  console.log("From Callback " + successMessage)
})

//Console log after calling the promise
console.log("After calling promise");

//task 12
// Creating a promise method. The promise will get resolved when timer times out after 6 seconds.
let myPromise12 = new Promise((resolve,reject) => {
  author="Chinua Achebe"
  setTimeout(() => {
    var books_new=[]
    for(var key in books){
      books_new.push(key);
    }
  
    for(var i in books_new){
      if(books[books_new[i]].author===author){
        console.log(books[books_new[i]])
      }
    }
    resolve("Promise resolved")
  },6000)})

//Console log before calling the promise
console.log("Before calling promise");

//Call the promise and wait for it to be resolved and then print a message.
myPromise12.then((successMessage) => {
  console.log("From Callback " + successMessage)
})

//Console log after calling the promise
console.log("After calling promise");

//task 13

//Creating a promise method. The promise will get resolved when timer times out after 6 seconds.
let myPromise13 = new Promise((resolve,reject) => {
  setTimeout(() => {
    let title="One Thousand and One Nights"
    var books_new=[]
    for(var key in books){
      books_new.push(key);
    }
  
    for(var i in books_new){
      if(books[books_new[i]].title===title){
         console.log(books[books_new[i]])
      
      }
    }
    resolve("Promise resolved")
  },6000)})

//Console log before calling the promise
console.log("Before calling promise");

//Call the promise and wait for it to be resolved and then print a message.
myPromise13.then((successMessage) => {
  console.log("From Callback " + successMessage)
})

//Console log after calling the promise
console.log("After calling promise");

module.exports.general = public_users;
