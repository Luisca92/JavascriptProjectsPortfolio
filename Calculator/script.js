// We'll start by identifying and storing references to key elements of our calculator interface:
// Here, we're:

//     Selecting the main calculator container and display elements by their IDs.
//     Gathering collections of number and operation buttons using their class names for group handling.
//     Identifying special function buttons (equals, clear, delete, dot) directly by their IDs.

const calculator = document.getElementById('calculator');
const displayCurrent = document.getElementById('current-operand');
const displayPrevious = document.getElementById('previous-operand');
const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const equalsbutton = document.getElementById('equals');
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');
const dotButton = document.getElementById('dot');

// Next, we need to ensure our calculator responds to user interactions.
// We'll start by adding event listeners to the number and operation buttons:

// In these snippets, appendNumber and chooseOperation are placeholder functions 
// we'll define to handle number entry and operation selection, respectively. 

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.innerText);
        updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        chooseOperation(button.innerText);
        updateDisplay();
    });
});

// We'll also set up listeners for our clear, delete, and equals buttons, as well as handling decimal points:

clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteNumber);
equalsbutton.addEventListener('click', compute);
dotButton.addEventListener('click', appendDot);

function clear() {
    currentOperand = '';
    previousOperand = '';
    operation = null;
    updateDisplay();
}

function deleteNumber() {
    currentOperand = currentOperand.toString().slice(0, -1);
    updateDisplay();
}

function compute () {

}

function appendDot() {
    if (currentOperand.includes('.')) return; // Prevent multiple decimals
    if (currentOperand === '') currentOperand = '0'; // If empty, start with '0.'
    currentOperand += '.';
    updateDisplay();
}

// We need a way to handle number button clicks and append the clicked number to the current display. 

let currentOperand = '';
let previousOperand = '';
let operation = null;

// In this function, we're concatenating the clicked number to the currentOperand.
//  We also check to ensure that we don't add more than one decimal point.
function appendNumber(number) {
    if (number ==='.' && currentOperand.includes('.')) return; // prevent multiple decimals! 
    currentOperand = currentOperand.toString() + number.toString();
}

// When a user clicks an operation button, we need to set the chosen operation 
// and move the current operand to the previous operand if necessary. 

// This function sets the operation, moves the currentOperand to previousOperand, and clears the currentOperand 
// for the next input. It also calls compute if there's already an operation pending, allowing for chained operations.
function chooseOperation(selectedOperation) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = selectedOperation;
    previousOperand = currentOperand;
    currentOperand = '';
 }

// The compute function performs the calculation based on the chosen operation and operands:
// This function converts the operands to numbers, 
// performs the calculation based on the operation, and updates currentOperand with the result.

function compute () {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand); 
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
        break;
    default:
        return;
    }

    currentOperand = computation;
    operation = undefined;
    previousOperand = '';
    updateDisplay(); // Refresh the display with the new state
}

// We’ll also use updateDisplay to refresh the calculator's display.
// This function updates the calculator's display with the current and previous operands, 
//  and shows the chosen operation next to the previous operand.

function updateDisplay() {
    document.getElementById('current-operand').innerText = currentOperand;
    document.getElementById('previous-operand').innerText = previousOperand + ' ' + (operation || '');
}
