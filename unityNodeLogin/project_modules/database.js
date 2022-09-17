/** 
 * 
 * DATABASE MODULE
 * 
 * **/
const mysql = require('mysql');


function ConnectDB(){
  const connection =  mysql.createConnection({

    host: 'db4free.net',
    user:  'nodeunitza',
    password: 'nodeunitza',
    database: 'nodeunitza',
    port: 3306
    //ssl: true
  })
  console.log('[Database.js]Conexao estabelecida com banco de dados');

  connection.connect(function(err) {
    if(err) {
      console.log("Error connecting..."+err.stack);
      return;
    }
    console.log("[Database.js]Conectado com o ID : " + connection.threadId);
  
  })


  
  return connection;

}
module.exports = ConnectDB();
  
 