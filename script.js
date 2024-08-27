
const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');

const questions = [
    { question: 'What does the `typeof` operator do in JavaScript?', answers: [{ text: 'Returns the type of a variable', correct: true }, { text: 'Checks if a variable is defined', correct: false }, { text: 'Converts a variable to a string', correct: false }, { text: 'Deletes a variable', correct: false }] },
    { question: 'How do you declare a variable in JavaScript?', answers: [{ text: 'variable myVar;', correct: false }, { text: 'var myVar;', correct: true }, { text: 'let myVar;', correct: true }, { text: 'const myVar;', correct: true }] },
    { question: 'What is the result of `2 + \'2\'` in JavaScript?', answers: [{ text: '4', correct: false }, { text: '22', correct: true }, { text: 'NaN', correct: false }, { text: 'undefined', correct: false }] },
    { question: 'What is a JavaScript function?', answers: [{ text: 'A block of code that performs a task', correct: true }, { text: 'A type of variable', correct: false }, { text: 'A method to store data', correct: false }, { text: 'An error type', correct: false }] },
    { question: 'How do you create an array in JavaScript?', answers: [{ text: 'array myArray = [];', correct: false }, { text: 'let myArray = {};', correct: false }, { text: 'let myArray = [];', correct: true }, { text: 'const myArray = ();', correct: false }] },
    { question: 'What is the purpose of the `return` keyword in a function?', answers: [{ text: 'To end the function execution', correct: false }, { text: 'To return a value from the function', correct: true }, { text: 'To declare a variable', correct: false }, { text: 'To call another function', correct: false }] },
    { question: 'How do you add a new element to an array in JavaScript?', answers: [{ text: 'myArray.push(element);', correct: true }, { text: 'myArray.add(element);', correct: false }, { text: 'myArray.insert(element);', correct: false }, { text: 'myArray.append(element);', correct: false }] }
];

let currentQuestionIndex = 0;
let score = 0;

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hide');
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionContainer.innerText = `Question ${currentQuestionIndex + 1}: ${question.question}`;
    answerButtons.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer, button));
        answerButtons.appendChild(button);
    });
}

function selectAnswer(answer, button) {
    const allButtons = answerButtons.querySelectorAll('button');
    allButtons.forEach(btn => {
        btn.disabled = true;
        if (btn.innerText === answer.text) {
            btn.classList.add(answer.correct ? 'correct' : 'incorrect');
            if (answer.correct) score++;
        } else if (btn.innerText === getCorrectAnswerText()) {
            btn.classList.add('correct');
        }
    });
    nextButton.classList.remove('hide');
}

function getCorrectAnswerText() {
    return questions[currentQuestionIndex].answers.find(answer => answer.correct).text;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        nextButton.classList.add('hide');
    } else {
        showFinalScore();
    }
}

function showFinalScore() {
    let emoji = '';
    if (score >= 6) {
        emoji = '❤️'; 
    } else if (score >= 4) {
        emoji = '🤔'; 
    } else if (score >= 1) {
        emoji = '😢'; 
    }
    
    questionContainer.innerHTML = `Quiz Finished! Your final score is ${score} out of ${questions.length}. ${emoji}`;
    answerButtons.innerHTML = '';
    nextButton.classList.add('hide');
}

nextButton.addEventListener('click', nextQuestion);
startGame();



