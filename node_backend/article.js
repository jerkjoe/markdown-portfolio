const express = require('express');
const Router = express.Router()
var bodyParser = require('body-parser');
var connection = require('./connection')

const josnParser = bodyParser.json()
Router.post('/create', josnParser, function(req, res) {
    var uuid = new Date().getTime()
    var username = req.body.username
    var title = req.body.title
    var article = req.body.article
    
    console.log(req.body)
    
    var sql = "INSERT INTO articles (username, uuid, title, article) VALUES ('" + username +"', '"+ uuid +"', '"+ title +"', '"+ article +"')";
    // var sql = "INSERT INTO users (username, uuid password) VALUES ('jerkjoe', '123123')";
    // var sql = 'SELECT * FROM users WHERE username = "jerkjoe" '
    connection.query(sql, function(err, result) {
        if (err) {
            res.send({
                error: true,
                message: "Sorry, we cannot process your request right now."
            })
            throw err;
        } else {
            res.send({
                error: false,
                message: 'New article created',
            })
            console.log(result)
        }
    });
    
    
})

Router.post('/update', josnParser, function(req, res) {
    var oldUuid = req.body.uuid
    var uuid = new Date().getTime()
    var username = req.body.username
    var title = req.body.title
    var article = req.body.article
    
    console.log(req.body)
    
    var sql = "UPDATE articles SET uuid = '" + uuid + "', article = '" + article + "', title = '" + title + "' WHERE uuid = '"+ oldUuid +"'";
    // var sql = "INSERT INTO articles (username, uuid, title, article) VALUES ('" + username +"', '"+ uuid +"', '"+ title +"', '"+ article +"')";
    // var sql = "INSERT INTO users (username, uuid password) VALUES ('jerkjoe', '123123')";
    // var sql = 'SELECT * FROM users WHERE username = "jerkjoe" '
    connection.query(sql, function(err, result) {
        if (err) {
            res.send({
                error: true,
                message: "Sorry, we cannot process your request right now." + err
            })
            throw err;
        } else {
            res.send({
                error: false,
                message: 'Article updated',
            })
            console.log(result)
        }
    });
    
    
})

Router.post('/delete', josnParser, function(req, res) {
    var uuid = req.body.uuid
    
    console.log(req.body)
    
    var sql = "DELETE FROM articles WHERE uuid = '"+ uuid +"'";
    // var sql = "INSERT INTO articles (username, uuid, title, article) VALUES ('" + username +"', '"+ uuid +"', '"+ title +"', '"+ article +"')";
    // var sql = "INSERT INTO users (username, uuid password) VALUES ('jerkjoe', '123123')";
    // var sql = 'SELECT * FROM users WHERE username = "jerkjoe" '
    connection.query(sql, function(err, result) {
        if (err) {
            res.send({
                error: true,
                message: "Sorry, we cannot process your request right now." + err
            })
            throw err;
        } else {
            res.send({
                error: false,
                message: 'Article deleted successfully',
            })
            console.log(result)
        }
    });
    
    
})

Router.get('/all', josnParser, function(req, res){
    var username = req.body.username
    var sql = username ? 'SELECT * FROM articles WHERE username = "' + username + '"' : 'SELECT * FROM articles'
    connection.query(sql, function(err, result) {
        if (err) {
            res.send({
                error: true,
                message: "Sorry, we cannot process your request right now."
            })
            throw err;
        } else {
            res.send({
                error: false,
                message: 'All articles for ' + username,
                result: result
            })
            console.log(result)
        }
    });
})

module.exports = Router
