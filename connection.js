// var mongo = require("mongoose");  
// var db = mongo.connect("mongodb://localhost:27017/project1", function(err, response){  
//    if(err){ console.log( err); }  
//    else{ 
//        console.log('Connected to ', db ); 
//     }  
// }); 


var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root@123",
  database: "project1"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


module.exports = con;