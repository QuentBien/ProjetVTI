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
	document.getElementById('form-delete').style.display="block";
	document.getElementById('cancel').addEventListener('click', cancelDeleteHandler);
	document.getElementById('confirm').addEventListener('click', confirmDeleteHandler);
	document.getElementById('form-delete').showModal();
};
var confirmDeleteHandler = function(){
	deleteFilm(id);
	  document.getElementById('form-delete').style.display="none";
	  document.getElementById('form-delete').close();
	  var snackbarContainer = document.querySelector('#demo-toast-example');
	  var showToastButton = document.querySelector('#demo-show-toast');
      var data = {message: 'Le film '+title+' a bien été supprimé'};
      snackbarContainer.MaterialSnackbar.showSnackbar(data);
	  document.getElementById('confirm').removeEventListener('click', confirmDeleteHandler);
}
var cancelDeleteHandler = function(){
	  document.getElementById('form-delete').style.display="none";
      document.getElementById('form-delete').close();
	  document.getElementById('cancel').removeEventListener('click', cancelDeleteHandler);
}
var deleteFilm = function(filmToDelete){
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("DELETE", './films/'+filmToDelete, true);
	xmlHttp.send();
	document.getElementById(filmToDelete).remove();
};

/* FORMULAIRE AJOUT */

var showAjoutForm = function(){
	document.getElementById('form-ajout').style.display="block";
	document.getElementById('cancel-ajout').addEventListener('click', cancelAjout);
	document.getElementById('confirm-ajout').addEventListener('click', confirmAjout);
	document.getElementById('form-ajout').showModal();
};

var confirmAjout = function(){
	//deleteFilm(id);
	  document.getElementById("formAddFilm").submit();
	  document.getElementById('form-ajout').style.display="none";
	  document.getElementById('form-ajout').close();
	  var snackbarContainer = document.querySelector('#demo-toast-example');
	  var showToastButton = document.querySelector('#demo-show-toast');
      //var data = {message: 'Le film '+title+' a bien été supprimé'};
      snackbarContainer.MaterialSnackbar.showSnackbar(data);
	  document.getElementById('confirm-ajout').removeEventListener('click', confirmAjout);
}
var cancelAjout = function(){
	  document.getElementById('form-ajout').style.display="none";
      document.getElementById('form-ajout').close();
	  document.getElementById('cancel-ajout').removeEventListener('click', cancelAjout);
}