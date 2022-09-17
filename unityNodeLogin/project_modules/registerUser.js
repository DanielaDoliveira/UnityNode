/** 
 * 
 * REGISTER MODULE
 * 
 * **/
const express = require('express');
const validator = require('validator');
const routes_registerUser = express.Router();
const db = require('../project_modules/database')


//#region ------- REGISTER POST -------
routes_registerUser.post('/register',function(req,res){
  console.log("Passando no : Entrando no POST/REGISTER");

  let error = false;
  let msg_res = {};

  msg_res.status = 200;
  msg_res.message = "";

  let register_temp = {};
  register_temp = req.body;

  let status_code = 200;
  let msg_text = "";


  // register_temp.email = req.body.email;
  //register_temp.password = req.body.password;

  console.log(register_temp);
  if (!validator.isEmail(register_temp.email)) {
    console.log("Passando no : Login > Validação de formato de E-Mail");
    status_code = 400;
    msg_text = "Invalid E-Mail format";
    error = true;
  }
  if (!error) {
    register_select(register_temp)
      .then((result) => {
        //Verify if e-mail exists on Database
        if(result.length > 0) {
          console.log("[registerUser.js]Passando no : Register > register_select.Then() > Verifica resultado > 0");
          status_code = 400;
          msg_text = "This e-mail already exists"

          msg_res.status = status_code;
          msg_res.message = msg_text;

          res.status(msg_res.status).json(msg_res);
        }
        //If not exists, include in Database
        else{
          register_insert(register_temp).then((resultInsert)=>{
            console.log("[registerUser.js]Passando no Register > registter_insert.Then()")
            msg_res.status = status_code;
            msg_res.message = msg_text;
            res.status(msg_res.status).json(msg_res);            

          })
          .catch((errorInsert)=>{
            console.log("[registerUser.js]Passando no : Register > register_insert.Catch()");
            msg_res.status = errorInsert.status_code;
            msg_res.message = errorInsert.msg_text;
  
            console.log("REGISTER INSERT - CATCH - ERRO - " + msg_res.message);

            res.status(msg_res.status).json(msg_res);

          });

        }
      }).catch((error) => {
        console.log('[registerUser.js]Passando no : Register > register_select.Catch()');
        if (error.status_code) {
          msg_res.status = error.status_code;
          msg_res.message = error.msg_text;
        }
        else {
          msg_res.status = 500;
          msg_res.message = "[registerUser.js] - Register - register_select - Catch = Erro no Then disparou o Catch ...  ";
        }
        console.log('[registerUser.js]Register Select - catch - Erro: ' + msg_res.message);
        res.status(msg_res.status).json(msg_res);

      });


  }
  else {
    msg_res.status = status_code;
    msg_res.message = msg_text;
    res.status(msg_res.status).json(msg_res);
  }




})

//#endregion


//#region -------REGISTER SELECT -------

function register_select(register_temp) {
  return new Promise((resolve, reject) => {
    db.query
      (
        `
      SELECT * FROM login 
      WHERE email = '${register_temp.email}'
      `,
        function (error, results) {

          let obj_error = {};
          obj_error.msg_text = "[registerUser.js]===> register_select - Ainda não entrou em Error";

          if (error) {
            console.log('[registerUser.js]Error : register_select dentro da PROMISE' + error);
            obj_error.status_code = 400;
            obj_error.msg_text = error;
            reject(obj_error);
          }

          else {
            console.log('[registerUser.js]Dentro da PROMISE -> Selecionado: ' + results.length);
            resolve(results);
          }

        }
      );
  })
}
//#endregion

//#region ------- REGISTER INSERT -------

function register_insert(register_temp) {
  return new Promise((resolve, reject) => {
    db.query
      (
        `
     INSERT INTO login(email,password) VALUES 
      ('${register_temp.email}', '${register_temp.password}')
      `,
        function (error, results) {

          let obj_error = {};
          obj_error.msg_text = "[registerUser.js]===> register_insert - Ainda não entrou em Error";

          if (error) {
            console.log('[registerUser.js]Error : register_insert dentro da PROMISE' + error);
            obj_error.status_code = 400;
            obj_error.msg_text = error;
            reject(obj_error);
          }

          else {
            console.log('[registerUser.js]Dentro da PROMISE -> Linhas afetadas: ' + results.length + ' | ID: ' + results.insertId);
            resolve(results);
          }

        }
      );
  })
}

//#endregion

module.exports = routes_registerUser;