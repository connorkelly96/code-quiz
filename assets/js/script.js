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

var shuffledQuestions, currentQuestions

function timer() {
    var timeInterval = setInterval(function () {
        timerEl.textContent = "Time: " + timeLeft;
        timeLeft--;
        if (timeLeft <= 0) {
            console.log("You are out of time");
            timerEl.textContent = "";
            clearInterval(timeInterval);
            saveScore();
        }
    }, 1000);
}

startButton.addEventListener('click', startGame);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    startNextQuestion();
})
//start the game
function startGame() {

    startContainerEl.classList.add("hidden");
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove("hidden");
    startNextQuestion();
}
//go to next question
function startNextQuestion() {
    resetQuestion();
    displayQuestion(shuffledQuestions[currentQuestionIndex]);
}
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
        answerButtinEl.appendChild(button);
    })
}

function resetQuestion() {
    nextButton.classList.add("hidden");
    checkAnswerEl,classList.add("hidden");
    while(answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonEl.firstChild);
    }
}

function chooseAnswer(e) {
var selectedButton = e.target;
var correct = selectedButton.dataset.correct;

Array.from(answerButtonsEl.children).forEach(button => {
    setStatuClass(button, button.dataset.correct);
})
if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hidden");
    checkAnswerEl.classList.remove("hide");
} else {

    startButton.classList.remove("hidden");
}
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct");
        document.querySelector("#check-answer").textContent = "Correct!";
    } else {
        timeLeft -= 10;
        element.classList.add("wrong");
        document.querySelector("#check-answer").textContent = "Wrong!";
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}

function saveScore() {
    document.getElementById("score-container").style.display = "inline-block";
    document.getElementById("your-score").textContent =  score + " out of " + shuffledQuestions.length + " questions correct.";
    
}