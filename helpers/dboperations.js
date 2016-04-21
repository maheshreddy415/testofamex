var mysql   = require('mysql');
var config  = require('../config/config.json');

var db_config = {
    host     : config.host,
    user     : config.user,
    password : config.password,
    database : config.database
};


var connection;
 
function handleDisconnect() {
    connection = mysql.createConnection(db_config); // Recreate the connection, since
    // the old one cannot be reused.
 
    connection.connect(function(err) { // The server is either down
        if(err) { // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        } // to avoid a hot loop, and to allow our node script to
    }); // process asynchronous requests in the meantime.
    // If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect(); // lost due to either server restart, or a
        } else {   // connnection idle timeout (the wait_timeout
            throw err; // server variable configures this)
        }
    });
}
 
//and then call this method 
handleDisconnect();


module.exports = {
    insertContact : function(data, callback) {
        var sql = "INSERT INTO contacts (name, email, phone, image) VALUES (" + mysql.escape(data.name) + ", " + mysql.escape(data.email) + ", \n\
                                                                            " + mysql.escape(data.phone) + ", " + mysql.escape(data.image) + ")";
        connection.query(sql, function(err, rows){
            if(err) {
                console.log(err);
            } else {
                console.log(rows);
                callback();
            }
            
        });
    },
    
    deleteContact : function(id, callback) {
        var sql = "DELETE FROM contacts WHERE id = " + mysql.escape(id);
        connection.query(sql, function(err, rows){
            if(err) {
                console.log(err);
            } else {
                console.log(rows);
                callback();
            }
        });
    },
    
    updateContact : function(data, callback) {
        var sql = "UPDATE contacts SET name  = " + mysql.escape(data.name) + ",\n\
                                       email = " + mysql.escape(data.email) + ",\n\
                                       phone = " + mysql.escape(data.phone) + ",\n\
                                       image = " + mysql.escape(data.image) + "\n\
                   WHERE id = " + mysql.escape(data.id);
        connection.query(sql, function(err, rows){
            if(err) {
                console.log(err);
            } else {
                console.log(rows);
                callback();
            }
        });
    },
    
    fetchOneContact : function(id, callback) {
        var sql = "SELECT id, name, email, phone, image FROM contacts WHERE id = "+mysql.escape(id);
        var query = connection.query(sql), contacts = [];
        query.on('error', function(err) {
            console.log(err);
        })
        .on('result', function(eachRow) {
            contacts.push(eachRow);
        })
        .on('end', function() {
            callback(contacts[0]);
        });
    },
    
    fetchContacts : function(callback) {
        var sql = "SELECT id, name, email, phone, image FROM contacts ORDER BY id DESC";
        var query = connection.query(sql), contacts = [];
        query.on('error', function(err) {
            console.log(err);
        })
        .on('result', function(eachRow) {
            contacts.push(eachRow);
        })
        .on('end', function() {
            callback(contacts);
        });
    }
}