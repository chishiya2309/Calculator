function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            throw new Error("Invalid operator");
    }
}

let currentInput = "0";
let firstNumber = null;
let secondNumber = null;
let operator = null;
let shouldResetDisplay = false;

let displayElement = document.querySelector("#display");
const buttonsNumber = document.querySelectorAll(".btn-number");

function updateDisplay(digit) {
    if(shouldResetDisplay === true) {
        currentInput = digit;
        shouldResetDisplay = false;
    }else if(currentInput === "0") {
        currentInput = digit;
    }else {
        currentInput += digit;
    }
    displayElement.textContent = currentInput;
    storeNumberVariable();
}

function storeNumberVariable() {
    if(operator === null) {
        firstNumber = currentInput;
    }else {
        secondNumber = currentInput;
    }
}

buttonsNumber.forEach((button) => {
    button.addEventListener("click", () => {
        updateDisplay(button.textContent);
    });
});