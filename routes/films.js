var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'), //parses information from POST
  methodOverride = require('method-override'), //used to manipulate POST
  path = require('path'),
  moment = require('moment');

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

/* GET New Film page. */
router.get('/new', function(req, res) {
    res.render('films/new', { title: 'Ajouter un film' });
});

// route middleware to validate :id
router.param('id', function(req, res, next, id) {
    //console.log('validating ' + id + ' exists');
    //find the ID in the Database
    mongoose.model('film').findById(id, function (err, film) {
        //if it isn't found, we are going to repond with 404
        if (err) {
            console.log(id + ' was not found');
            res.status(404)
            var err = new Error('Not Found');
            err.status = 404;
            res.format({
                html: function(){
                    next(err);
                 },
                json: function(){
                       res.json({message : err.status  + ' ' + err});
                 }
            });
        //if it is found we continue on
        } else {
            //uncomment this next line if you want to see every JSON document response for every GET/PUT/DELETE call
            console.log(film);
            // once validation is done save the new item in the req
            req.id = id;
            // go to the next thing
            next(); 
        } 
    });
});

/*router.route('/')
  .get(function(req, res, next) {
	//var filmController = require('../controller/filmController');
  var films;
  mongoose.model('film').find({}, function(err, movies){
	films = movies;
  });
   res.render('films', {
          tagline: 'All my films',
          "films": films
      });
});*/

//build the REST operations at the base for blobs
//this will be accessible from http://127.0.0.1:3000/blobs if the default route for / is left unchanged
router.route('/')
    //GET all blobs
    .get(function(req, res, next) {
        //retrieve all blobs from Monogo
        mongoose.model('film').find({}, function (err, films) {
              if (err) {
                throw err;
              } else {
                  //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
                  res.format({
                      //HTML response will render the index.jade file in the views/blobs folder. We are also setting "blobs" to be an accessible variable in our jade view
                    html: function(){
                        res.render('films', {
                              tagline: 'All my films',
                              "films" : films,
							  "moment" : moment
                          });
                    },
                    //JSON response will show all blobs in JSON format
                    json: function(){
                        res.json(films);
                    }
                });
              }     
        });
    });
router.route('/:id')
	.delete(function(req, res) {
        mongoose.model('film').findById(req.params.id, function(err, film){
			if (err) {
                throw err;
            } else {
				film.remove(function(err){
					if (err) throw err;
				});
				res.send('OK');
			}
		});
    });
module.exports = router;