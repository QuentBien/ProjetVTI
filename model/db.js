var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/BD_Films', function(err){
  if (err) throw err;
});

