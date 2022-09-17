

/** 
 * 
 * SERVER MODULE
 * 
 * **/

const express = require('express');
let root = require('../project_modules/root');
let routes_loginUser = require('../project_modules/loginUser');
let routes_registerUser = require('../project_modules/registerUser');





//#region ------- SETTINGS -------
const bodyParser = require('body-parser');
let port = process.env.port || 3000;
const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//#region ------- FOLDER [project_modules] -------
  app.use(root);
  app.use(routes_loginUser);
  app.use(routes_registerUser);

//#endregion

//#endregion





app.listen(port,()=>{
  console.log(`[server.js]Escutando na porta ${port}`);
})