var time = 75;
var startButton = document.getElementById("startBtn");
var questionContainerEl = document.getElementById("questions-container");
var startContainerEl = document.getElementById("starting-container");
var questionEl = document.getElementById("question");
var answerButtonsEl = document.getElementById("choice-buttons");

var shuffledQuestions, currentQuestions

startButton.addEventListener('click', startGame);

function startGame() {
    startButton.classList.add("hidden");
    startContainerEl.classList.add("hidden");
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove("hidden");
    startNextQuestion();
}

function startNextQuestion() {
    resetQuestion();
    displayQuestion(shuffledQuestnos[currentQuestionIndex]);
}

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
    while(answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonEl.firstChild)
    }
}