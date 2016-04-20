var express = require('express');
var ejs     = require('ejs');
var app     = express();
var mysql   = require('mysql');
var fs      = require('fs');

//Creating the 'contactimages' folder to upload images.
fs.existsSync("./public/contactimages") || fs.mkdirSync("./public/contactimages");

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.engine('html', ejs.__express);

require('./routes/main')(app);

app.listen(3000, function(){
	console.log('Listening to port : 3000');
});