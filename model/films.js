var mongoose = require('mongoose');  
var filmSchema = new mongoose.Schema({  
  _id: String,
  title: String,
  year: Date,
  genre : String,
  summary : String,
  country : String,
  director : {
	  last_name : String,
	  first_name : String,
	  birth_date : Date,
	  role : String
  },
  actors : [{
	  last_name : String,
	  first_name : String,
	  birth_date : Date,
	  role : String
  }]  
});
mongoose.model('film', filmSchema, 'film');





