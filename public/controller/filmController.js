/*var addFilm = function (filmToAdd){
	var film = new Film(filmToAdd);
	film.save(function(err){
		if (err) throw err;
	});
}
var updateFilm = function(filmToUpdate){
	mongoose.modele('film').find(movieToUpdate, function(err, movie){
		var film = new Film(filmToAdd);
		movie = film;
		movie.save(function(err){
			if (err) throw err;
		});
	});
}*/
var deleteFilm = function(filmToDelete){
	var xmlHttp = new XMLHttpRequest();
	console.log(JSON.stringify(filmToDelete));
	xmlHttp.open("DELETE", 'http://localhost:3000/films', true);
	xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xmlHttp.send();
	document.getElementById(filmToDelete.title).innerHTML="";
};