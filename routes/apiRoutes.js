// This is for the MySQL connection
var connection = require("./connection.js");

module.exports = function(app) {
  // This will post (add) to the new array
  app.post("/api/computer", function(req, res) {
    const scores = req.body.scores;
    connection.query("SELECT * FROM all_Computers", function(err, result) {
      if (err) {
        throw err;
      }

      var computer = checkOtherComputerScores(result, scores);
      res.send(computer);
    });
  });
};

function checkOtherComputerScores(allComputers, newComputer) {
  var scoreArray = [];

  // This will go through every computer except the last one, since the user is the last person in allComputers
  for (var i = 0; i < 2; i++) {
    var diff = 0;
    // This calculates the difference of each question's score and adds the difference
    diff += Math.abs(parseInt(allComputers[i].computer_q1) + parseInt(newComputer[0]));
    diff += Math.abs(parseInt(allComputers[i].computer_q2) + parseInt(newComputer[1])); 
    diff += Math.abs(parseInt(allComputers[i].computer_q3) + parseInt(newComputer[2])); 
    diff += Math.abs(parseInt(allComputers[i].computer_q4) + parseInt(newComputer[3]));
    // This pushes the total difference score into an array
    // The lowest score in the array is the computer (allComputers[]) they are best matched with
    scoreArray.push(diff);
  }

  // This will determine the position in the array of the lowest score.  That position is the closest match from the allComputers api.
  var min = scoreArray[0];
  var minIndex = 0;
  for (var i = 0; i < scoreArray.length; i++) {
    if (scoreArray[i] < min) {
      minIndex = i;
      min = scoreArray[i];
    }
  }
  return allComputers[min];
}
