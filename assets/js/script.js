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
var clearScoreButton = document.getElementById("clear")
var restartButton = document.getElementById("restart")

var shuffledQuestions, currentQuestions;

function timer() {
    var timeInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = "Time: " + timeLeft;
        if (timeLeft <= 0) {
            timerEl.textContent = "";
            clearInterval(timeInterval);
           // saveScore();
        }
    }, 1000);
  //  return timeLeft;
};

startButton.addEventListener('click', startGame);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    startNextQuestion();
});
//start the game
function startGame() {

    startContainerEl.classList.add("hidden");
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove("hidden");
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
    checkAnswerEl.innerHTML = "You got it right!";
} else {
    
    timeLeft -= 10;
    checkAnswerEl.innerHTML = "Sorry that was not the correct answer.";
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
    questionContainerEl.classList.add("hidden");
    document.getElementById("score-container").classList.remove("hidden");
    document.getElementById("your-score").textContent =  "Your final score is " + timeLeft
    
};

function showHighScores(initials) {
    document.getElementById("highscores").classList.remove("hidden");
    document.getElementById("score-container").classList.add("hide");
    startContainerEl.classList.add("hidden")
    questionContainerEl.classList.add("hide");

    var initials = localStorage.getItem("initials");
    var score = localStorage.getItem("timeLeft");
    var initialsField = document.getElementById("player-name");
    var scoreField = document.getElementById("playerscore");

    initialsField.textContent = initials;
    scoreField.textContent = timeLeft;

    if (initials == null || timeLeft == null) {
        document.getElementById("no-scores").classList.remove("hidden");
      }
  };

  viewHighScores.addEventListener("click", showHighScores);
submitButton.addEventListener("click", function (event) {
  event.preventDefault()
  var initials = document.querySelector("#initials-field").value;
  localStorage.setItem("initials", initials);
  localStorage.setItem("timeLeft", timeLeft);
  showHighScores();
});

//refreshing the page
restartButton.addEventListenrr("click", function() {
    WritableStreamDefaultController.location.reload();
});

clearScoreButton.addEventListener("click", function () {
    localStorage.clear();
}
);