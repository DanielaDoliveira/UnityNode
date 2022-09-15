
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const validator = require('validator');
module.exports
{
   function LoginValidationController(msg_text, status_code, error){
    console.log("Passando no : Entrando no GET/LOGIN");
    let msg_res = {};
     msg_res.status = 200;
     msg_res.message = "";
  
    let login_temp = {};
     login_temp.email = req.params.email;
     login_temp.password = req.params.password;
  
     let error = false;
  
     let status_code = 200;
     let msg_text = "";
    console.log(login_temp);
  
  if(!validator.isEmail(login_temp.email)){
    console.log("Passando no : Login > Validação de formato de E-Mail");
    status_code = 400;
    msg_text = "Invalid E-Mail format";
    error = true;
  
  }
  
  if(!error){
  login_select(login_temp)
  .then((result)=>{
  console.log("Passando no: Login> login_select.Then()")
  
  // Caso não retorne dados compatíveis com e-mail e senha:
  if(parseInt(result.length)== 0){
    console.log("Passando no: Login > login_select.Then() > Verifica resultado = 0");
    status_code = 400;
    msg_text = "Login or Password incorrect,check the data";
  }
  //Se o sistema deixar passar registros duplicados
  if(parseInt(result.length)== 0){
    console.log("Passando no: Login > login_select.Then() > Verifica resultado maior que 1");
    status_code = 400;
    msg_text = "There are problem with your data, please enter in contact with support";
  }
  
  msg_res.status = status_code;
  msg_res.message = msg_text;
  
  //Retorno da mensagem com o status e mensagem 
  res.status(msg_res.status).json(msg_res);
  })
  
  
  .catch((e)=>{
    console.log('Passando no : Login > login_select.Catch()');
    if(e){
      msg_res.status = e.status_code;
      msg_res.message = e.msg_text;
    }
    else{
      msg_res.status = 500;
      msg_res.message = "Unable to perform action. try again soon!";
    }
  
    console.log('===> LOGIN - catch - Erro '+ msg_res.message);
    res.status ( msg_res.status).json(msg_res);
  })  
  }
  else{
    msg_res.status = status_code;
    msg_res.message = msg_text;
    res.status(msg_res.status).json(msg_res);
  }
  
}
}

