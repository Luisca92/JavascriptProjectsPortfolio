// Once the quiz is completed, we should display the user's score and provide a completion message. 
// This can be done by updating the content of an existing element or creating a new one dynamically.
// So, let’s create a variable to interact with our main quiz app’s div container, 
// and we’ll also create a new div to display the user results.
// Note that we’ll initially hide this div when the quiz initializes:

const quizAppElement = document.getElementById('quiz-app');
const resultsElement = document.createElement('div');
resultsElement.setAttribute('id', 'results');
resultsElement.classList.add('results', 'hide');
quizAppElement.appendChild(resultsElement);

// In this setup, we're:

//     Adding an event listener to hide the "Next" button when the document is fully loaded.
//     Selecting essential DOM elements and storing them in variables for easy access throughout the script.
//     Initializing variables to manage the shuffled questions and track the current question index.


document.addEventListener('DOMContentLoaded', () => {
    nextButton.classList.add('hide'); // Initially hide the 'Next' button.
})

const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
resultsElement.classList.add('results', 'hide');
quizAppElement.appendChild(resultsElement);

let shuffledQuestions, currentQuestionIndex;
let score = 0;

// Now, let's handle the event when a user clicks the Start button to begin the quiz:

// In this function, we're:

// Hiding the "Start" button to indicate the quiz has begun.
// Shuffling the questions array to ensure a varied quiz experience each time.
// Resetting the current question index to 0 to start from the beginning.
// Removing the 'hide' class from the question container to display the first question.

startButton.addEventListener('click', startGame);

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

// The setNextQuestion function is essential for preparing the quiz interface for each new question. 
// It ensures that previous answers and feedback are cleared and that the "Next" button is hidden until 
// the user selects an answer for the new question:

// In this function, we're:

// Calling resetState to clear the quiz interface, ensuring a fresh start for each question.
// Using showQuestion to populate the quiz with the next question and its corresponding answer options.

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  }
  
// The resetState function ensures that the quiz interface is clean and ready for the next question, 
// removing any remnants of previous questions and answers:

// In this function, we're:

// Clearing any visual feedback from the previous question.
// Hiding the "Next" button to prevent skipping questions without answering.
// Removing all previous answer buttons to make way for the new set of answers.

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// Let's write the function to display a question and its answers:
// In this function, we're:

// Updating the text of the question element to display the current question.
// Creating and displaying a button for each answer option.
// Assigning a data attribute to buttons with correct answers for evaluation.
// Adding an event listener to each button to handle answer selection.

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = 'true';
        }
        button.addEventListener('click', () => selectAnswer(button));
        answerButtonsElement.appendChild(button);
    })
}

// When a user selects an answer, we want to ensure that their choice is final and that they receive clear feedback 
// on their selection. The selectAnswer function will handle this process:

// In this function, we're:
// Disabling all answer buttons after a selection is made to lock in the user's choice.
// Applying visual styling to give instant feedback on whether the selected answer is correct or not.
// Introducing a delay before showing the "Next" button, giving users time to review their choice and the feedback provided.

// To display the number of correct answers, we need to keep track of the score throughout the quiz. 
// We can do this by incrementing a score variable each time the user selects a correct answer:
// In this addition, we're:
// Initializing a score variable to keep track of the number of correct answers.
// Incrementing the score each time a correct answer is selected.

function selectAnswer(selectedButton) {
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
        setStatusClass(button, button.dataset.correct);
    });

    if (selectedButton.dataset.correct) {
        score++; // Increment score for correct answers
    }

    // Delay revealing the Next button to allow users to review their choice.
    setTimeout(() => {
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hide')
        } else {
            concludeQuiz();
        }
    }, 1000); // Adjust delay as needed.
}



// The setStatusClass function plays a crucial role in offering immediate visual feedback by applying CSS classes 
// that signal whether an answer is correct or incorrect:

// In this function, we're:
// Ensuring each answer button starts with a clean slate by removing any previous feedback.
// Using CSS classes to visually communicate the correctness of each answer to the user.

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong')
    }
}

// Before moving on to the next question, it's important to reset the visual feedback on all answer buttons. 
// The clearStatusClass function ensures that no residual feedback affects the presentation of future questions:
// In this function, we're clearing any 'correct' or 'wrong' classes from elements,
// preparing them for reuse in subsequent questions.

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

// When the user is shown the "Restart Quiz" button, it should allow them to reset the quiz to its initial state, 
// allowing them to take the quiz again from the beginning:

// In this function, we're:

// Hiding the resultsElement div to reset the quiz state for a new user.
// Resetting the score and currentQuestionIndex to their initial values.
// Calling startGame to reinitialize the quiz setup.

function restartQuiz() {
    resultsElement.classList.add('hide');
    score = 0;
    currentQuestionIndex = 0;
    startGame();
}

// We can then create a new function to display the user score information within the resultsElement div:
// In this function, we're:

//     Hiding the question container and the "Next" button to indicate the quiz's end.
//     Revealing the new div we created to display a completion message and the user score.
//     Providing a "Restart Quiz" button to allow users to take the quiz again.

function concludeQuiz() {
    questionContainerElement.classList.add('hide');
    nextButton.classList.add('hide');

    resultsElement.classList.remove('hide');
    resultsElement.innerHTML = `
    <h2> Quiz Completed</h2>
    <p> Your score: ${score} out of ${shuffledQuestions.length}</p>
    <button onclick="restartQuiz()">Restart Quiz</button>
    `;
}

// The "Next" button is crucial for quiz progression. 
// It should allow users to move to the next question after selecting an answer and reviewing their feedback. 
// We need to ensure the "Next" button correctly loads the next question when clicked.

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
})





// Before we add more event listeners, let's define our quiz questions and their respective answer choices.
//  A JavaScript array is a nice way to do this:

const questions = [
    {
        question: 'What is a variable in Javascript?',
        answers: [
            {text: 'A section of the webpage', correct: false},
            {text: 'A container for storing data values', correct: true},
            {text: 'A type of Javascript function', correct: false},
            {text: 'An operation in mathematics', correct: false}
        ]
    },
    {
        question: 'What does DOM stand for in web development?',
        answers: [
            {text: 'Document Object Model', correct: true},
            {text: 'Data Object Model', correct: false},
            {text: 'Digital Object Model', correct: false},
            {text: 'Dynamic Object Model', correct: false}
        ]
    },
    {
        question: 'Which keyword is used to declare a variable in JavaScript?',
        answers: [
            {text: 'var', correct: true},
            {text: 'let', correct: false},
            {text: 'const', correct: false},
            {text: 'variable', correct: false}
        ]
    },
    {
        question: 'What is the result of 10 + "10" in JavaScript?',
        answers: [
            {text: '20', correct: false},
            {text: '1010', correct: true},
            {text: 'Error', correct: false},
            {text: '101', correct: false}
        ]
    },
    {
        question: 'Which built-in method adds one or more elements to the end of an array and returns the new length of the array?',
        answers: [
            {text: 'push()', correct: true},
            {text: 'pop()', correct: false},
            {text: 'join()', correct: false},
            {text: 'concat()', correct: false}
        ]
    },
    {
        question: 'What is the correct way to write an IF statement in JavaScript?',
        answers: [
            {text: 'if i = 5 then', correct: false},
            {text: 'if (i == 5)', correct: true},
            {text: 'if i == 5', correct: false},
            {text: 'if i = 5', correct: false}
        ]
    },
    {
        question: 'How do you round the number 7.25, to the nearest integer?',
        answers: [
            {text: 'Math.rnd(7.25)', correct: false},
            {text: 'rnd(7.25)', correct: false},
            {text: 'round(7.25)', correct: false},
            {text: 'Math.round(7.25)', correct: true}
        ]
    },
    {
        question: 'What does CSS stand for?',
        answers: [
            {text: 'Computer Style Sheets', correct: false},
            {text: 'Colorful Style Sheets', correct: false},
            {text: 'Cascading Style Sheets', correct: true},
            {text: 'Creative Style Sheets', correct: false}
        ]
    },
    {
        question: 'Which HTML tag is used to define an internal style sheet?',
        answers: [
            {text: '<style>', correct: true},
            {text: '<css>', correct: false},
            {text: '<script>', correct: false},
            {text: '<link>', correct: false}
        ]
    },
    {
        question: 'How do you select an element with id "demo" in CSS?',
        answers: [
            {text: '#demo', correct: true},
            {text: '.demo', correct: false},
            {text: 'demo', correct: false},
            {text: '*demo', correct: false}
        ]
    },
    {
        question: 'How do you declare a JavaScript variable?',
        answers: [
            {text: 'variable carName;', correct: false},
            {text: 'v carName;', correct: false},
            {text: 'var carName;', correct: true},
            {text: 'car carName;', correct: false}
        ]
    }
];







