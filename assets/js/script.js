var timeLeft = 75;

var timerEl = document.getElementById("timer");
var startButton = document.getElementById("startBtn");
var nextButton = document.getElementById("next-btn")
var questionContainerEl = document.getElementById("questions-container");
var startContainerEl = document.getElementById("starting-container");
var questionEl = document.getElementById("question");
var answerButtonsEl = document.getElementById("choice-buttons");
var checkAnswerEl = document.getElementById("check-answer");
var viewHighScores = document.getElementById("highscores-link");
var submitButton = document.getElementById("submit-btn");
var clearScoreButton = document.getElementById("clear");
var initialsField = document.getElementById("player-name");
var restartButton = document.getElementById("restart");
var scoreField = document.getElementById("player-score");
var scores = JSON.parse(localStorage.getItem("scores")) || [];

var shuffledQuestions, currentQuestions;



startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    startNextQuestion();
});

function countdown() {
    timeLeft--;
    timerEl.textContent = "time:" + timeLeft;
    if (timeLeft <=0) {
        saveScore();
    }
};
//start the game
function startGame() {
timerID = setInterval(countdown, 1000);
    startContainerEl.classList.add("hidden");
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove("hidden");
    countdown();
    startNextQuestion();
};
//go to next question
function startNextQuestion() {
    resetQuestion();
    displayQuestion(shuffledQuestions[currentQuestionIndex]);
};
//display questions
function displayQuestion(question) {
    questionEl.innerText = question.question;
    question.answers.forEach(answer => {
        var button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", chooseAnswer);
        answerButtonsEl.appendChild(button);
    })
};

function resetQuestion() {
    nextButton.classList.add("hidden");
    checkAnswerEl.classList.add("hidden");
    while(answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild);
    }
};

function chooseAnswer(e) {
var selectedButton = e.target;
var correct = selectedButton.dataset.correct;
checkAnswerEl.classList.remove("hidden")

if (correct) {
    checkAnswerEl.innerHTML = "That is the Right Answer!";
} else {
    

    checkAnswerEl.innerHTML = "Sorry that was Incorrect.";
    if (timeLeft <= 10) {
        timeLeft = 0;
    } else {
        // If the aswer is wrong, deduct time by 10
        timeLeft -= 10;
    }
}

Array.from(answerButtonsEl.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
})
if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hidden");
    checkAnswerEl.classList.remove("hide");
} else {
    startButton.innetText = "Restart"
    startButton.classList.remove("hidden");
    saveScore();
}
};

function setStatusClass(element, correct) {
    clearStatusClass(element)
    console.log(correct)
    if (correct) {
        element.classList.add("correct");

    } else {

        element.classList.add("wrong");

    }
};

function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
};

function saveScore() {
    clearInterval(timerID);
    timerEl.tectContent = "Time:", + timeLeft;
    setTimeout(function() {
        questionContainerEl.classList.add("hide");
        document.getElementById("score-container").classList.remove("hide");
        document.getElementById("your-score").textContent = "Your final score is " + timeLeft;
    }, 2000)
    
};

var loadScores = function() {

    if (!savedScores) {
        return false;
    }

    savedScores = JSON.parse(savedScores);
    var initials = document.querySelector("#initials-field").value;
    var newScore = {
        score: timeLeft,
        initials: initials
    }
    savedScores.push(newScore);
    console.log(savedScores)


    savedScores.forEach(score => {
        initialsField.innerText = score.initials
        scoreField.innerText = score.score
    })
};


function showHighScores(initials) {
    document.getElementById("highscores").classList.remove("hidden");
    document.getElementById("score-container").classList.add("hide");
    startContainerEl.classList.add("hidden")
    questionContainerEl.classList.add("hidden");
    if (typeof initials == "string") {
        var score = {
            initials, timeLeft
        }
        scores.push(score)
    }
    var highScoreEl = document.getElementById("highscore");
    highScoreEl.innerHTML = "";
    for (i = 0; i < scores.length; i++) {
        var div1 = document.createElement("div");
        div1.setAttribute("class", "name-div");
        div1.innerText = scores[i].initials;
        var div2 = document.createElement("div");
        div2.setAttribute("class", "score-div");
        div2.innerText = scores[i].timeLeft;
        var highScoreEl = document.getElementById("highscore");
        highScoreEl.appendChild(div1);
        highScoreEl.appendChild(div2);
    }

    localStorage.setItem("scores", JSON.stringify(scores));

  };

  viewHighScores.addEventListener("click", showHighScores);
submitButton.addEventListener("click", function (event) {
  event.preventDefault()
  var initials = document.querySelector("#initials-field").value;
  showHighScores();
});

//refreshing the page
restartButton.addEventListener("click", function() {
    WritableStreamDefaultController.location.reload();
});

clearScoreButton.addEventListener("click", function () {
    localStorage.clear();
    document.getElementById("highscore").innerHTML = "";
}
);