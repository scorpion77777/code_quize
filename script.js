var questions = [
    
    {
        title: 'Which of the following is not a primitive type?', 
        choice: ["String", "Number", "Boolean", "Object"],
        answer: "Object",
    },

    {
        title: 'What syntax is utilized to initiate a loop command?',
        choice: ["for", "if", "else", "var"],
        answer: "for",
    },

    {
        title: 'String values need to be enclosed with that notation to be assigned',
        choice: ["parenthesis's", "quotations", "curly bracket", 'bracket'],
        answer: "quotations",
    },

]

var score = 0;
var questionsIndex = 0;
var cardEl = document.getElementById('#card')
var questionsDiv = document.querySelector('#questionsDiv')
var startQuizEl = document.querySelector('#startQuiz')
var timer = document.querySelector('#timer')
var secondsLeft = 100;
var intervalTime = 0;
var penalty = 10;
var ulCreate = document.createElement("ul")


startQuizEl.addEventListener("click", function () {
    if (intervalTime === 0) {
        intervalTime = setInterval(function () {
            secondsLeft--;
            timer.textContent = "Time Remaining: " + secondsLeft;

            if (secondsLeft === 0) {
                clearInterval(intervalTime);
                allDone();
                timer.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionsIndex);
});


function render(questionsIndex) {
 
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
   
    for (var i = 0; i < questions.length; i++) {
        
        var userQuestion = questions[questionsIndex].title;
        var userChoices = questions[questionsIndex].choice;
        questionsDiv.textContent = userQuestion;
    }
 
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.setAttribute("class", "btn btn-primary list-group-item")
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
    
     
        if (element.textContent == questions[questionsIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionsIndex].answer;
           
        } else {
           
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionsIndex].answer;
        }

    }
  
    questionsIndex++;

    if (questionsIndex >= questions.length) {
    
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionsIndex);
    }
    questionsDiv.appendChild(createDiv);

}

function allDone() {
    questionsDiv.innerHTML = "";
    timer.innerHTML = "";

  
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionsDiv.appendChild(createH1);

    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

  
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(intervalTime);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.setAttribute("id", "exampleInputEmail1")
    createInput.setAttribute("placeholder", "Enter Initials")
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);


    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.setAttribute("class", "btn btn-primary")
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);

    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
          
            window.location.replace("./highscores.html");
        }
    });

}
