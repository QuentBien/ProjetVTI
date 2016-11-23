var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'), //parses information from POST
  methodOverride = require('method-override'), //used to manipulate POST
  path = require('path');

//Any requests to this controller must pass through this 'use' function
//Copy and pasted from method-override
router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
}))


router.route('/')
  .get(function(req, res, next) {
	require('../controller/filmController');  
	res.render(path.join(__dirname + '/views/films.ejs'));
})}
);
module.exports = router;