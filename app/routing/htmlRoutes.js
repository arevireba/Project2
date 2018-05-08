var express = require("express");
var path = require("path");
var mysql = require("mysql");

// This is for the MySQL connection
var connection = require("../routing/connection.js");

module.exports = function(app) {

    // This allows the js to be loaded
    app.use(express.static(path.join(__dirname, "/../")));

    app.get("/results", function(req, res) {
        res.sendFile(path.join(__dirname, "/../public/results.html"));
    });

    // This gets all the computers in the array
    app.get('/api', function (req, res) {
        var queryString = "SELECT * FROM all_Computers;";
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            return res.json(result);
        });
    });

    // This defaults to the home page if the user types in a bad webpage
    app.use(function(req, res) {
        res.sendFile(path.join(__dirname, "/../public/home.html"));
    });

};