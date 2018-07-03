var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();

var fileUpload = require('express-fileupload');

var connection = require('./connection.js');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var fileRouter = require('./routes/file');
var requestRouter = require('./routes/request');

var fs = require('fs');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.post('/login',usersRouter);
app.post('/register',usersRouter);
app.post('/saveUsers',usersRouter);
app.post('/updateUser',usersRouter);
app.post('/profilePicUpdate',usersRouter);
app.post('/changePass',usersRouter);
app.post('/getallUsers',usersRouter);
app.post('/deleteUsers',usersRouter);
app.use('/getUsers', usersRouter);
app.post('/getAllMyRequests', usersRouter);

app.post('/uploadfile', fileRouter);
app.post('/getownfiles', fileRouter);
app.post('/deleteFile', fileRouter);
app.post('/searchFile', fileRouter);


app.post('/requestAccess', requestRouter);
app.post('/cancelRequest', requestRouter);
app.post('/acceptRequest', requestRouter);
app.post('/rejectRequest', requestRouter);

app.use(express.static(__dirname + '/public'));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
