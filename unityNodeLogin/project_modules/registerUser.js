/** 
 * 
 * REGISTER MODULE
 * 
 * **/
const express = require('express');
const validator = require('validator');
const routes_registerUser = express.Router();
const db = require('../project_modules/database')


//#region ------- POST -------
routes_registerUser.post('/register',function(req,res){
  console.log("Passando no : Entrando no POST/REGISTER");

  let error = false;
  let status_code = 200;
  let msg_text = "";

  let msg_res = {};
   msg_res.status = 200;
   msg_res.message = "";

  let login_temp = {};
  login_temp = req.body;
   login_temp.email = req.body.email;
   login_temp.password = req.body.password;
  console.log(login_temp);
  if(!validator.isEmail(login_temp.email)){
    console.log("Passando no : Login > Validação de formato de E-Mail");
    status_code = 400;
    msg_text = "Invalid E-Mail format";
    error = true;
  }
  if(!error) {

  }
  msg_res.status = status_code;
  msg_res.message = msg_text;

  

   res.status(msg_res.status).json(msg_res);
})

//#endregion

module.exports = routes_registerUser;