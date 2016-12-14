var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    path = require('path');

router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method
        delete req.body._method
        return method
    }
}))

/* GET New Film page. */
router.get('/new', function (req, res) {
    res.render('films/new', { title: 'Ajouter un film' });
});

router.param('id', function (req, res, next, id) {
    mongoose.model('film').findById(id, function (err, film) {
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
        } else {
            //uncomment this next line if you want to see every JSON document response for every GET/PUT/DELETE call
            //console.log(film);
            // once validation is done save the new item in the req
            req.id = id;
            next();
        }
    });
});

router.route('/')
    .get(function (req, res, next) {
        mongoose.model('film').find({}, function (err, films) {
            if (err) {
                throw err;
            } else {
                res.format({
			html: function () {
                        res.render('films', {
                            tagline: 'All my films',
                            "films": films
                        });
                    },
                    json: function () {
                        res.json(films);
                    }
                });
            }
        });
    })
    .post(function (req, res) {
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
        mongoose.model('film').find({}, function (err, films) {
            if (err) {
                console.log(err);
                res.send("There was a problem adding the information to the database.");
            } else {
                films.sort(compare);
                var movie_id = films[films.length - 1]._id;
                console.log(movie_id);
                var id = parseInt(movie_id.split(":")[1]) + 1;
                console.log(id);
                var _id = "movie:" + id;
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
                        console.log('POST creating new film: ' + film);
                        res.format({
                            html: function () {
                                res.location("films");
                                res.redirect("/films");
                            },
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
			search["$where"] = "function() { return this.year.toString().match(/"+req.body.rechercher+"/) != null; }";
		} else {
			search[req.body.options] = new RegExp('.*'+req.body.rechercher+'.*','i');
		}
		console.log(search);
        mongoose.model('film').find(search, function (err, films) {
            if (err) {
                throw err;
            } else {
                res.format({
                    html: function () {
                        res.render('films', {
                            tagline: 'All my films',
                            "films": films
                        });
                    },
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

function compare(a, b) {
    if (a._id < b._id)
        return -1;
    if (a._id > b._id)
        return 1;
    return 0;
}

router.route('/update')
    .post(function (req, res) {
        var _id = req.body._id;
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
        mongoose.model('film').find({}, function (err, films) {
            if (err) {
                console.log(err);
                res.send("There was a problem updating the information to the database.");
            } else {
                mongoose.model('film').update({
                    _id: _id
                },{$set : {
                    title: title,
                    year: year,
                    genre: genre,
                    summary: summary,
                    country: country,
                    director: director,
                    actors: actors
                }}, function (err, film) {
                    if (err) {
                        console.log(err);
                        res.send("There was a problem updating the information to the database.");
                    } else {
                        console.log('PATCH updating new film: ' + film);
                        res.format({
                            html: function () {
                                res.location("films");
                                res.redirect("/films");
                            },
                            json: function () {
                                res.json(film);
                            }
                        });
                    }
                });
            }
        });
    });
module.exports = router;
