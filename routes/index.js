var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res, next) {
  
  console.log(req.query)
  
  res.send('ontvangen')
  
});

module.exports = router;
