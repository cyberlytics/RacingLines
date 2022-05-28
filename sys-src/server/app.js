var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const Score = require('./models/score')

//connect to mongodb
const dbURI = 'mongodb+srv://rluser:***REMOVED***@cluster0.vehm5.mongodb.net/RacingLinesDatabase?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then(() => console.log('connected to db'))
    .catch((err) => console.log(err));



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/hello', (req, res) => {
  res.send('Hello World!')
})

app.get('/add-score', (req, res) => {
  const score = new Score({
    roomID: 'new scoreID',
    playerID: 'new playerID',
    score: 20
  });

  score.save()
      .then((result) => {
        res.send(result)
      })
      .catch((err) => {
        console.log(err);
      });
})

app.get('/all-scores', (req, res) => {
  Score.find()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      })
})

app.get('/single-score', (req, res) => {
  Score.findById('62925edd58c810164db79158')
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      })
})

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