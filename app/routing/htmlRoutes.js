// Requires the Path
var path = require('path');

// Runs the exports function from Computers JS as with app below to get and pull requests

module.exports = function(app){

//Get info from survey html webpage
	app.get('/survey', function(req, res){
		res.sendFile(path.join(__dirname + '/../public/survey.html'));
	});

	app.use(function(req, res){
		res.sendFile(path.join(__dirname + '/../public/home.html'));
	});

}