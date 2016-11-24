var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/BD_Films', function(err){
mongoose.connect('mongodb://vtidb:xV1zCzNzwNSuvRYVi2Di33sRF9J8TissXZVPto5y0upA0p5C7c8ifr8hugV5X40h6YAOYqeigpOfXPllR6LLYg==@vtidb.documents.azure.com:10250/BD_Films/?ssl=true', function(err){
  if (err) throw err;
});

