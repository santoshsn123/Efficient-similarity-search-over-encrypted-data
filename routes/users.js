var express = require('express');
var router = express.Router();
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();
var fs = require('fs');
// var mongo = require("mongoose");  
var connection = require('../connection.js');

router.post('/login', function (req, res) {
  connection.query('SELECT * FROM users where u_username=? AND u_password=? ', [req.body.username, req.body.password], function (err, result, row) {
    if (err) { throw err; }
    // console.log(result);
    if (result.length > 0) {
      res.send({ status: true, message: 'Login Successfull', user: result[0] });
    }
    else {
      res.send({ status: false, message: 'Username / Password is wrong !' });
    }
  });
});

router.post('/register', function (req, res) {
  connection.query('INSERT INTO users set ?', req.body, function (err, result) {
    if (err) { throw err; }

    if (result.affectedRows > 0) {
      res.send({ status: true, message: 'Registration Successfull', user: result.insertId });
    }
    else {
      res.send({ status: false, message: 'Something is wrong !' });
    }
  });
});

router.post('/updateUser', function (req, res) {
  connection.query('UPDATE users set ? WHERE u_id =?', [req.body, req.body.u_id], function (err, result) {
    if (err) { throw err; }

    if (result.affectedRows > 0) {
      res.send({ status: true, message: 'Record Updated Successfull' });
    }
    else {
      res.send({ status: false, message: 'Something is wrong !' });
    }
  });
});

router.post('/profilePicUpdate', multipartyMiddleware, function (req, res) {
  var file = req.files.file;
  var sp = req.files.file.originalFilename.split('.');
  var ext = sp[sp.length - 1];
  var fileName = "ProfilePic_" + req.body.user.u_id + '_.' + ext;
  var copy = fs.createReadStream(file.path).pipe(fs.createWriteStream('./public/upload/' + fileName));
  copy.on('close', function (ex) {
    connection.query('UPDATE users set u_profilePic=? WHERE u_id=?', [fileName, req.body.user.u_id], function (err, result) {
      if (err) { throw err; }
      res.send({ status: true, message: 'Profile Pic Updated Successfull',profilePic: fileName});
    });
  });
});

router.post('/changePass', function (req, res) {
  req.body.password;
  req.body.user;
  connection.query('SELECT * FROM users u_password=? AND u_id =?', [req.body.password.oldpass, req.body.u_id], function (err, result) {
    if(result.length>0)
    {
      connection.query('UPDATE users SET u_password=? WHERE u_id =?',[req.body.password.oldpass,req.body.u_id],function(err,result){
        if(err){throw err;}
        res.send({ status: true, message: 'Password Updated Successfully!'});
      });
    }
    else{
      res.send({ status: false, message: 'Old Password is wrong!'});
    }
  });
});

router.post('/getallUsers', function (req, res) {
 console.log(req.body.user.u_id);
  connection.query('SELECT  * FROM users LEFT JOIN request ON users.u_id = request.r_to AND request.r_by=? AND u_id!=? ',[req.body.user.u_id,req.body.user.u_id],function(err,result){
    if(err){throw err;}
    res.send({ status: true, message: 'Users Fetched Successfully!',user:result});
  });
});



router.post('/getAllMyRequests', function (req, res) {
  connection.query('SELECT  * FROM request LEFT JOIN users ON request.r_by = users.u_id WHERE request.r_to=? ',[req.body.user.u_id],function(err,result){
    if(err){throw err;}
    res.send({ status: true, message: 'Users Fetched Successfully!',user:result});
  });
});


router.post('/saveUsers', function (req, res) {
  // var user = new model(req.body);
  // user.save(function(err,data){

  // });
  // res.send({status:true,message:'User Registered Successfully !!'}); 
});

router.post('/deleteUsers', function (req, res) {
  // //  console.log("Delete Id is here :- ",req.body);
  // model.find({_id: req.body._id}).remove().exec();
  // res.send({status:true,message:'Removed'});
});




module.exports = router;
