var mongoose = require('mongoose');  
var filmSchema = new mongoose.Schema({  
  Titre: String,
  date_de_sortie: String,
  duree : String,
  realisateur : String,
  casting : [String],
  genre : String,
  nationalite : String,
  note : String
});
mongoose.model('film', filmSchema);

// test de la connection

mongoose.connect('mongodb://localhost:27017/BD_Films', function(err){
  if (err) throw err;
});
