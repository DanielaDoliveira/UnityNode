
/** 
 * 
 * ROOT OF API
 * 
 * **/
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const validator = require('validator');
 const root = express.Router();


 //#region ------- GET -------
//ROOT
root.get('/',function(req,res){
  console.log("[root.js]Passando no : Entrando no GET/");
  res.send("<h1>Welcome to routes!</br> </h1> <h2>This is the Root.</h2>");
  
})

 module.exports = root;
