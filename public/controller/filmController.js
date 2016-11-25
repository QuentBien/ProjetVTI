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
var id, title;
var showDeleteModal = function(idFilm, titleFilm){
	id=idFilm;
	title=titleFilm;
	document.getElementById('diag').innerHTML="Voulez-vous vraiment supprimer le film "+title+" ?";
	document.querySelector('dialog').style.display="block";
	document.getElementById('cancel').addEventListener('click', cancelDeleteHandler);
	document.getElementById('confirm').addEventListener('click', confirmDeleteHandler);
	document.querySelector('dialog').showModal();
};
var confirmDeleteHandler = function(){
	deleteFilm(id);
	  document.querySelector('dialog').style.display="none";
	  document.querySelector('dialog').close();
	  var snackbarContainer = document.querySelector('#demo-toast-example');
	  var showToastButton = document.querySelector('#demo-show-toast');
      var data = {message: 'Le film '+title+' a bien été supprimé'};
      snackbarContainer.MaterialSnackbar.showSnackbar(data);
	  document.getElementById('confirm').removeEventListener('click', confirmDeleteHandler);
}
var cancelDeleteHandler = function(){
	  document.querySelector('dialog').style.display="none";
      document.querySelector('dialog').close();
	  document.getElementById('cancel').removeEventListener('click', cancelDeleteHandler);
}
var deleteFilm = function(filmToDelete){
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("DELETE", './films/'+filmToDelete, true);
	xmlHttp.send();
	document.getElementById(filmToDelete).remove();
};