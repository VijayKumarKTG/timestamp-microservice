var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  let absolutePath = __dirname + '/views/index.html';
  res.sendFile(absolutePath);
});

app.get('/api/timestamp/', (req, res) => {
  let date = new Date();
  res.json({ unix: parseInt(date.getTime()), utc: date.toUTCString() });
});

app.get('/api/timestamp/:date_string?', (req, res) => {
  let dateString = req.params.date_string;
  let date;
  if (dateString.split('-').length === 1) {
    dateString = parseInt(dateString);
  }
  date = new Date(dateString);
  if (date.toUTCString() !== 'Invalid Date') {
    res.json({ unix: parseInt(date.getTime()), utc: date.toUTCString() });
  } else {
    res.json({ error: date.toUTCString() });
  }
});

// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

module.exports = app;
