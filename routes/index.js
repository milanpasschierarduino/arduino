var express = require('express');
var router = express.Router();
const db = require('monk')('mongodb://milanarduino:detering1@ds159293.mlab.com:59293/milanarduino')
const sessions = db.get('sessions')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/session/new', function(req, res, next) {
  
  console.log(req.body);
  sessions.insert({ name: 'Tobi' });
  
  res.send('ontvangen');
  
});

module.exports = router;
