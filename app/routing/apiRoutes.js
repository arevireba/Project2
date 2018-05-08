// This is for the MySQL connection
var connection = require("../routing/connection.js");

module.exports = function(app) {

    // This will post (add) to the new array
    app.post("/api", function(req, res) {
        console.log(req.body.scores[0]);
        var queryString = "INSERT INTO all_Computers (computer_name, computer_photo, computer_q1, computer_q2, computer_q3, computer_q4, computer_specs, computer_website) VALUES ('";
        queryString += req.body.name + "', '" + req.body.photo + "', '" + req.body.scores[0] + "', '";
        queryString += req.body.scores[1] + "', '" + req.body.scores[2] + "', '" + req.body.scores[3] + "', '";
        queryString += req.body.specs + "', '" + req.body.website;
        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            return res.json(result);
        });
    });
}