// Require the Friends JS file
var computers = require('../data/computers.js');

// Runs the exports function from Friends JS as with app below to get and pull requests
module.exports = function(app){

	// Get Requests
	app.get('/api/computers', function(req, res){
		res.json(computers);
	});

	// Post Requests
	app.post('/api/computers', function(req, res){


// Creates a variable called bestFriends to hold name and photo info from responses
		var computerMatch = {
			name: "",
			photo: "",
			friendDifference: 1000
		};

// Captures all data from the surveys
		var userData 	= req.body;
		var userName 	= userData.name;
		var userPhoto 	= userData.photo;
		var userScores 	= userData.scores;
// Creates notCommon variable to compare all friend results
		var notCommon = 0;

		// Loop through all the survey results
		for  (var i=0; i< computers.length; i++) {

			console.log(computers[i].name);
			notCommon = 0;

			// Loop through all the scores of each friend
			for (var j=0; j< computers[i].scores[j]; j++){

				// Calculates difference between the scores and plugs them into the notCommon variable
				notCommon += Math.abs(parseInt(userScores[j]) - parseInt(computers[i].scores[j]));

				// If the sum of differences is less then the differences of the current closestMatch
				if (notCommon <= computerMatch.computerDifference){

					// Reset the closestMatch to be the new friend. 
					computerMatch.name = computers[i].name;
					computerMatch.photo = computers[i].photo;
					computerMatch.computerDifference = notCommon;
				}
			}
		}

		// Saves info to DB
		computers.push(userData);

		// Result of closestMatch
		res.json(closestMatch);

	});

}
