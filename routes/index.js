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
  var date = dateFormat(now, "dd-mm-yyyy");
  
  sessions.findOne({ date: date }).then(function (doc) {
    
    if (doc) {
      
      if (doc.status === "inactive") {
        res.send('Sessie is niet gestart. Start de sessie op de applicatie.');
      } else {
        res.send('Sessie is gestart.');
      }
      
    } else {
  
      var id = randomstring.generate(10);

      sessions.insert({ status: 'inactive', date: date, id: id });
      res.send('Arduino van Milan Passchier heeft verbinding gemaakt. Start de sessie op de applicatie.');
      
    }
    
  })
  
});

router.get('/session/find', function(req, res, next) {
  
  var now = new Date();
  var date = dateFormat(now, "dd-mm-yyyy");
  
  sessions.findOne({ date: date }).then(function (doc) {
    
    res.json(doc);
    
  })
  
});

router.get('/session/start', function(req, res, next) {
  
  sessions.findOneAndUpdate({ date: req.query.date, id: req.query.id}, {$set: {status: "active"}}).then((updated) => {
    
    res.json(updated);
    
  })
  
});

module.exports = router;
