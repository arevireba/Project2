var path = require("path");
// This is for the MySQL connection
var connection = require("./connection.js");

module.exports = function(app) {
  // This defaults to the home page if the user types in a bad webpage
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/results/:id", function(req, res) {
    const id = req.params.id;
    connection.query(`SELECT * FROM all_Computers WHERE id=${id}`, function(
      err,
      result
    ) {
      if (err) {
        throw err;
      }
      const data =  { computer: result[0] };
      console.log(data);

      res.render("results", data);
    });
  });

  // This gets all the computers in the array
  // app.get("/api", function(req, res) {
  //   var queryString = "SELECT * FROM all_Computers;";
  //   connection.query(queryString, function(err, result) {
  //     if (err) {
  //       throw err;
  //     }
  //     return res.json(result);
  //   });
  // });
};
