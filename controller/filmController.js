var filmController = function(){
	
var self = this;
var mongoose = require('mongoose');
self.films = [];

mongoose.modele('film').find(function(err, movies){
	films = movies;
});

self.addFilm = function (filmToAdd){
	var film = new Film(filmToAdd);
	film.save(function(err){
		if (err) throw err;
	});
};
self.updateFilm = function(filmToUpdate){
	mongoose.modele('film').find(movieToUpdate, function(err, movie){
		films.pop(filmToUpdate);
		var film = new Film(filmToAdd);
		movie = film;
		movie.save(function(err){
			if (err) throw err;
		});
		films.push(movie);
	});
};
self.deleteFilm = function(filmToDelete){
		mongoose.modele('film').find(filmToDelete, function(err, movie){
		films.pop(filmToDelete);
		var film = new Film(movie);
		film.remove(function(err){
			if(err) throw err;
		});
	});
};
}