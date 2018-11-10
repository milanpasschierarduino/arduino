var express = require('express');
var router = express.Router();
const db = require('monk')('mongodb://milanarduino:detering1@ds159293.mlab.com:59293/milanarduino')
const sessions = db.get('sessions')
var dateFormat = require('dateformat');
var randomstring = require("randomstring");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/session/new', function(req, res, next) {
  
  var now = new Date();
  var date = dateFormat(now, "dd, mm, yyyy");
  var id = randomstring.generate(10);
  
  sessions.insert({ status: 'inactive', date: date, id: id });
  res.send('ontvangen');
  
});

module.exports = router;
