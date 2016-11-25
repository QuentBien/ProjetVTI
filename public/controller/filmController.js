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
var showDeleteModal = function(idFilm){
	document.querySelector('dialog').style.display="block";
	document.getElementById('cancel').addEventListener('click', function() {
	  document.querySelector('dialog').style.display="none";
      document.querySelector('dialog').close();
    });
	document.getElementById('confirm').addEventListener('click', function() {
      deleteFilm(idFilm);
	  document.querySelector('dialog').style.display="none";
	  document.querySelector('dialog').close();
	  var snackbarContainer = document.querySelector('#demo-toast-example');
	  var showToastButton = document.querySelector('#demo-show-toast');
      var data = {message: 'Le film a bien été supprimé'};
      snackbarContainer.MaterialSnackbar.showSnackbar(data);
    });
	document.querySelector('dialog').showModal();
};
var deleteFilm = function(filmToDelete){
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("DELETE", './films/'+filmToDelete, true);
	xmlHttp.send();
	document.getElementById(filmToDelete).remove();
};