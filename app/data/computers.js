$( document ).ready(function() {

    // This makes the computer model flash/blink in the results
    function blinker() {
        $("#match").fadeOut(500);
        $("#match").fadeIn(500);
    }
    setInterval(blinker, 1000);

    var allComputers = {};
    var newComputer = {};
    $("#newSearch").hide();
    $("#imgMatch").hide();

    // This is when the user clicks the submit button for the survey page
    $("#submit1").on("click", function() {
        var link = "";
        var answeredQuestions = 0;
        newComputer = {
            computer_name: $("#icon_prefix_name").val(),
            computer_photo: $("#icon_prefix_photo").val(),
            scores: [$("#q1").val(), $("#q2").val(), $("#q3").val(), $("#q4").val()]
        }
        // This checks to make sure every question is answered and the link is valid
        for (var i = 0; i < 10; i++) {
            // This checks to make sure the link is valid
            if (/^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test($("#icon_prefix_photo").val())) {
                link = "valid";
            } else {
                alert("Sorry, but that is an invalid URL, please enter a valid link");
                break;
            }
            if (newComputer.scores[i] === null || newComputer.name === "" || newComputer.photo === "") {
                alert("Sorry, but you didn't answer a question.");
                break;
            }
            answeredQuestions += 1;
        }
        
        // If all conditions are met, then this will run
        if (answeredQuestions === 4 && link === "valid") {
            $.post("/api", newComputer).done(function(data) {
                alert("Adding a computer to the list.");
                // This opens the results page to display the best search
                window.location = "results";
            });
        }
    });

    // This runs when the results page is loaded.  It loads once the user submits the survey.
    if (top.location.pathname === '/results')
    {
        getAllComputerInfo();
    }

    // This loads all of the info for the existing computers from the api
    function getAllComputerInfo () {
        $.get("/api", function(data) {
            allComputers = data;
            newComputer = data[(data.length - 1)];
            totalComputers = data.length;
            checkOtherComputerScores();
        });
    }

    // This function will go through all of the computers in the api, and add a score to an array for each computer.
    // The lowest score in the array is the closest match to the user.
    function checkOtherComputerScores() {
        var scoreArray = [];

        // This will go through every computer except the last one, since the user is the last person in allComputers
        for (var i = 0; i < (allComputers.length - 1); i++) {
            var diff = 0;
                // This calculates the difference of each question's score and adds the difference
                diff += Math.abs(allComputers[i].computer_q1 + newComputer.computer_q1);
                diff += Math.abs(allComputers[i].computer_q2 + newComputer.computer_q2);
                diff += Math.abs(allComputers[i].computer_q3 + newComputer.computer_q3);
                diff += Math.abs(allComputers[i].computer_q4 + newComputer.computer_q4);
            // This pushes the total difference score into an array
            // The lowest score in the array is the computer (allComputers[]) they are best matched with
            scoreArray.push(diff);
        }

        indexofSmallestNumber();

        // This will determine the position in the array of the lowest score.  That position is the closest match from the allComputers api.
        function indexofSmallestNumber() {
            var min = scoreArray[0];
            var minIndex = 0;
            for (var i = 0; i < scoreArray.length; i++) {
                if (scoreArray[i] < min) {
                    minIndex = i;
                    min = scoreArray[i];
                }
            }

            $("#match").text(allComputers[minIndex].computer_name);
            $("#userName").text(allComputers[(allComputers.length-1)].computer_name);
            $("#imgMatch").show();
            $("#imgMatch").attr("src", allComputers[minIndex].computer_photo);
        }
    }

    // It will run a search for matches in the computers api
    $("#newSearch").on("click", function() {
        $.get("/api", function(data) {
            var allComputers = data;
            var scoreArray = [];
            var diff = 0;

            // This will go through every computer
            for (var i = 0; i < (data.length); i++) {
                if (i != (position - 1)) {
                    console.log(newComputer);
                    console.log(allComputers);
                    
                    // This calculates the difference of each question's score and adds the difference
                    diff += Math.abs(allComputers[i].computer_q1 + newComputer.computer_q1);
                    diff += Math.abs(allComputers[i].computer_q2 + newComputer.computer_q2);
                    diff += Math.abs(allComputers[i].computer_q3 + newComputer.computer_q3);
                    diff += Math.abs(allComputers[i].computer_q4 + newComputer.computer_q4);

                    
                    // This pushes the total difference score into an array
                    // The lowest score in the array is the computer (allComputers[]) they are best matched with
                    scoreArray.push(diff);
                    diff = 0;
                // This is when it gets to the current user's position and will add 1000 to the array
                } else { scoreArray.push(1000);
                }
            }
            console.log(scoreArray);
            indexofSmallestNumber();

            // This runs through the array of numbers to check for the lowest score and what position it is.
            function indexofSmallestNumber() {
                var min = scoreArray[0];
                var minIndex = 0;
                for (var k = 0; k < scoreArray.length; k++) {
                    if (scoreArray[k] < min) {
                        minIndex = k;
                        min = scoreArray[k];
                    }
                }
                $("#searchAgainSubmit").show();
                $("#newSearch").hide();
                $("#searchResult").show();
                $("#searchResult").text("Your best computer is " + allComputers[minIndex].computer_name);
                $("#imgMatch").show();
                $("#imgMatch").attr("src", allComputers[minIndex].computer_photo);
            }
        });
    });
});