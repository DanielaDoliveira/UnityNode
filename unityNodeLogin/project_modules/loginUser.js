
/** 
 * 
 * LOGIN MODULE
 * 
 * **/

const express = require('express');
const validator = require('validator');
const routes_loginUser = express.Router();
const db = require('../project_modules/database')
 //LOGIN 




//#region ####### LOGIN GET #######
routes_loginUser.get('/login/:email/:password',function(req,res){
  console.log("[loginUser.js]Passando no : Entrando no GET/LOGIN");

  let msg_res = {};

  msg_res.status = 200;
  msg_res.message = "";

  let login_temp = {};

  login_temp.email = req.params.email;
  login_temp.password = req.params.password;

  let error = false;

  var status_code = 200;
  var msg_text = "";

  console.log(login_temp);

  if (!validator.isEmail(login_temp.email)) {

    console.log("[loginUser.js]Passando no : Login > Validação de formato de E-Mail");
    status_code = 400;
    msg_text = "Invalid E-Mail format";
    error = true;

  }

  if (!error) {
    login_select(login_temp).then((result) => {
      console.log("[loginUser.js]Passando no: Login> login_select.Then()")

      // Caso não retorne dados compatíveis com e-mail e senha:
      if (parseInt(result.length) == 0) {
        console.log("[loginUser.js]Passando no: Login > login_select.Then() > Verifica resultado = 0");
        status_code = 400;
        msg_text = "Login or Password incorrect,check the data";

      }
      //Se o sistema deixar passar registros duplicados
      if (parseInt(result.length) > 1) {
        console.log("[loginUser.js]Passando no: Login > login_select.Then() > Verifica resultado maior que 1");
        status_code = 400;
        msg_text = "There are problem with your data, please enter in contact with support";
      }

      msg_res.status = status_code;
      msg_res.message = msg_text;
      //Retorno da mensagem com o status e mensagem 
      res.status(msg_res.status).json(msg_res);
    }).catch((error) => {
      console.log('[loginUser.js]Passando no : Login > login_select.Catch()');
      if (error) {
        msg_res.status = status_code;
        msg_res.message = msg_text;
      }
      else {
        msg_res.status = 500;
        msg_res.message = "Unable to perform action. try again soon!";
      }

      console.log('[loginUser.js]===> LOGIN - catch - Erro ' + msg_res.message);
      res.status(msg_res.status).json(msg_res);
    })
  }
  else {
    msg_res.status = status_code;
    msg_res.message = msg_text;
    res.status(msg_res.status).json(msg_res);
  }

  
})
//#endregion


//#region ####### LOGIN SELECT #######
function login_select(login_temp){
  return new Promise((resolve, reject)=>{
    db.query
    (
      `
      SELECT * FROM login 
      WHERE email = '${login_temp.email}' and password = '${login_temp.password}'
      `,
      function(error, results){

        let obj_error = { };
        obj_error.msg_text = "===> login_select - Ainda não entrou em Error";

        if(error){
          console.log('[loginUser.js]Error : login_select dentro da PROMISE' + error);
          obj_error.status_code = 400;
          obj_error.msg_text = error;
          reject(obj_error);
        }

        else{
          console.log('[loginUser.js]Dentro da PROMISE -> Selecionado: ' + results.length);
          resolve(results);
        }

      }
    );
  })
} 
//#endregion



module.exports = routes_loginUser;
