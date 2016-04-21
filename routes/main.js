var upload  = require('../helpers/imageuploader.js').upload;
var mysql   = require('../helpers/dboperations.js');
var ejs     = require('ejs');

module.exports = function(app) {
	
    app.get('/', function(req, res) {            
        mysql.fetchContacts(function(data){
            res.render('index.html', {data:data});
        });
    });

    app.get('/addcontact', function(req, res) {
        res.render('addcontact.html');
    });

    app.get('/editcontact', function(req, res) {
        mysql.fetchOneContact(req.query.a, function(data) {
            res.render('editcontact.html', {data:data});
        });
    });

    app.post('/deletecontact', function(req, res) {
        mysql.deleteContact(req.query.a, function() {
            res.send('Success');
        });
    });

    app.post('/editcontact/edit', upload.single('image'), function(req, res, next){
        var body = req.body, image;
        if(req.file && req.file.filename != undefined && req.file.filename != '') {
            image = req.file.filename;
        } else {
            if(body.preimage != '' && body.preimage != undefined) {
                image = body.preimage;
            } else {
                image = '';
            }
        }
        var data = {id:body.a, name:body.name, email:body.email, phone:body.phone, image:image};
        mysql.updateContact(data, function() {
            res.send('Success');
        });
    });

    app.post('/addcontact/add', upload.single('image'), function(req, res, next){
        var body = req.body, image;
        if(req.file && req.file.filename != undefined && req.file.filename != '') {
            image = req.file.filename;
        } else {
            image = '';
        }
        var data = {name:body.name, email:body.email, phone:body.phone, image:image};
        mysql.insertContact(data, function() {
            res.send('Success');
        });
    });
}





