var mongoose = require('mongoose');  
var filmSchema = new mongoose.Schema({  
  _id: String,
  title: String,
  year: String,
  genre : String,
  summary : String,
  country : String,
  director : {
	  last_name : String,
	  first_name : String,
	  birth_date : String,
	  role : String
  },
  actors : [{
	  last_name : String,
	  first_name : String
  }]  
});
mongoose.model('film', filmSchema, 'film');





