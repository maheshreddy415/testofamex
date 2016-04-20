
var upload = require('../helpers/imageuploader.js').upload;
var mysql  = require('../helpers/dboperations.js');

module.exports = function(app) {
	
	app.get('/', function(req, res) {
		res.render('index.html');
	});

	app.get('/addcontact', function(req, res) {
		res.render('addcontact.html');
	});

	app.get('/editcontact', function(req, res) {
		res.render('editcontact.html');
	});
	
	app.post('/addcontact/add', upload.single('image'), function(req, res, next){
		res.end('i am here');
	});
}





