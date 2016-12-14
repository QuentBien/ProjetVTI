var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'), //used to manipulate POST
    path = require('path');

//Any requests to this controller must pass through this 'use' function
//Copy and pasted from method-override
router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}))

/* GET New Film page. */
router.get('/new', function (req, res) {
    res.render('films/new', { title: 'Ajouter un film' });
});

// route middleware to validate :id
router.param('id', function (req, res, next, id) {
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
                html: function () {
                    next(err);
                },
                json: function () {
                    res.json({ message: err.status + ' ' + err });
                }
            });
            //if it is found we continue on
        } else {
            //uncomment this next line if you want to see every JSON document response for every GET/PUT/DELETE call
            //console.log(film);
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
    .get(function (req, res, next) {
        //retrieve all blobs from Monogo
        mongoose.model('film').find({}, function (err, films) {
            if (err) {
                throw err;
            } else {
                //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
                res.format({
                    //HTML response will render the index.jade file in the views/blobs folder. We are also setting "blobs" to be an accessible variable in our jade view
                    html: function () {
                        res.render('films', {
                            tagline: 'All my films',
                            "films": films
                        });
                    },
                    //JSON response will show all blobs in JSON format
                    json: function () {
                        res.json(films);
                    }
                });
            }
        });
    })
    .post(function (req, res) {
        // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
        var _id;
        var title = req.body.title;
        var year = req.body.year;
        var genre = req.body.genre;
        var summary = req.body.resume;
        var country = req.body.nationalite;

        var director = {
            last_name: req.body.directorLastname,
            first_name: req.body.directorFirstname,
            birth_date: req.body.directorBirth_date,
        };

        var actorsString = req.body.actorsList;
        var acteurs = actorsString.split(";");
        var actors = [];
        var temp;
        acteurs.forEach(function (acteur) {
            temp = acteur.split(" ");
            actors.push({ last_name: temp[1], first_name: temp[0] });
        }, this);
        //call the create function for our database
        mongoose.model('film').find({}, function (err, films) {
            if (err) {
                console.log(err);
                res.send("There was a problem adding the information to the database.");
            } else {
                films.sort(compare);
                var movie_id = films[films.length-1]._id;
                console.log(movie_id);
                var id = parseInt(movie_id.split(":")[1])+1;
                console.log(id);
                var _id = "movie:"+id;
                mongoose.model('film').create({
                    _id: _id,
                    title: title,
                    year: year,
                    genre: genre,
                    summary: summary,
                    country: country,
                    director: director,
                    actors: actors
                }, function (err, film) {
                    if (err) {
                        console.log(err);
                        res.send("There was a problem adding the information to the database.");
                    } else {
                        //Film has been created
                        console.log('POST creating new film: ' + film);
                        res.format({
                            //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
                            html: function () {
                                // If it worked, set the header so the address bar doesn't still say /adduser
                                res.location("films");

                                // And forward to success page
                                res.redirect("/films");
                            },
                            //JSON response will show the newly created blob
                            json: function () {
                                res.json(film);
                            }
                        });
                    }
                });
            }
        });

    });
router.route('/search')
	.post(function (req, res) {
        var search = new Object();
		if(req.body.options == "year") {
			search[req.body.options] = parseInt(req.body.rechercher);
		} else {
			search[req.body.options] = new RegExp('.*'+req.body.rechercher+'.*','i');
		}
		console.log(search);
        mongoose.model('film').find(search, function (err, films) {
            if (err) {
                throw err;
            } else {
                //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
                res.format({
                    //HTML response will render the index.jade file in the views/blobs folder. We are also setting "blobs" to be an accessible variable in our jade view
                    html: function () {
                        res.render('films', {
                            tagline: 'All my films',
                            "films": films
                        });
                    },
                    //JSON response will show all blobs in JSON format
                    json: function () {
                        res.json(films);
                    }
                });
            }
        });
    });
router.route('/:id')
    .delete(function (req, res) {
        mongoose.model('film').findById(req.params.id, function (err, film) {
            if (err) {
                throw err;
            } else {
                film.remove(function (err) {
                    if (err) throw err;
                });
                res.send('OK');
            }
        });
    });

function compare(a,b) {
  if (a._id < b._id)
    return -1;
  if (a._id > b._id)
    return 1;
  return 0;
}

module.exports = router;