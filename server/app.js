const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');
const alpha = require('alphavantage')({ key: 'S7JDVTFR1AM335UC'});
const indexRouter = require('./routes/index');
const uploadRoute = require('./api/routes/upload/uploadRoutes');
const fileRoute = require('./api/routes/files');
const userRoute = require('./api/routes/userRoute');
const authRoute = require('./api/routes/auth');
const prodRoute = require('./api/routes/ProdRoutes/pRoute');

//event controller
const eventCtrl = require("./api/controllers/events/eventCtrl");
//alpa vantage key S7JDVTFR1AM335UC
mongoose.connect('mongodb://192.168.68.81:27017/NS?retryWrites=true&w=majority', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("we're connected");
});
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/build', express.static(path.join(__dirname, './build')))
app.use('/assets', express.static(path.join(__dirname, '../client/ys-enhance/src/assets')));
app.use('/static', express.static(path.join(__dirname, './build/static')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('files', express.static(path.join(__dirname, '../files')));
app.use('/api/auth', authRoute);
app.use('/api', prodRoute);
app.use('/api', fileRoute);
app.use('/api', userRoute);
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '../client/ys-enhance/public/index.html'));
});

//eventCtrl.newEvent(testObj);



app.param('id', function(req, res, next, id){
  req.id = req.params.id;
  console.log(req.id);
  next();
});

app.post('/event' , function(req, res, next){
  console.log(req.body);
  eventCtrl.newEvent(req.body, res, next);
  
});
app.put('/event:id', (req, res, next) => {
console.log(req.body.params.id);
var docUp = {
  id: req.body.params.id,
  data: req.body
};

eventCtrl.updateEvent(docUp, res, next);
});

app.delete('/event:id', (req, res, next) => {
 
  eventCtrl.removeEvent(req.query.id, res, next);
  
});
app.get('/events', function(req, res, next){
   eventCtrl.getEvents(res, next);
   
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
