function add(a, b) {
    return Number(a) + Number(b);
}

function subtract(a, b) {
    return Number(a) - Number(b);
}

function multiply(a, b) {
    return Number(a) * Number(b);
}

function divide(a, b) {
    if (Number(b) === 0) {
        alert("Cannot divide by zero");
        return "Error";
    }
    return Number(a) / Number(b);
}

function operate(op, a, b) {
    switch (op) {
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
let operator = null;
let shouldResetDisplay = false;

let displayElement = document.querySelector("#display");
const buttonsNumber = document.querySelectorAll(".btn-number");
const buttonsOperator = document.querySelectorAll(".btn-operator");
const buttonEqual = document.querySelector(".btn-equals");
const buttonClear = document.querySelector(".btn-clear");
const decimalBtn = document.querySelector('.btn-decimal');
const backspaceBtn = document.querySelector('.btn-backspace');

function renderDisplay() {
    if (currentInput === "Error") {
        displayElement.textContent = "Error";
        return;
    }

    if (firstNumber !== null && operator !== null) {
        if (shouldResetDisplay) {
            displayElement.textContent = `${firstNumber} ${operator}`;
        } else {
            displayElement.textContent = `${firstNumber} ${operator} ${currentInput}`;
        }
    } else {
        displayElement.textContent = currentInput;
    }
}

function updateDisplay(digit) {
    if (shouldResetDisplay === true) {
        currentInput = digit;
        shouldResetDisplay = false;
    } else if (currentInput === "0") {
        currentInput = digit;
    } else {
        currentInput += digit;
    }
    renderDisplay();
}

buttonsNumber.forEach((button) => {
    button.addEventListener("click", () => {
        updateDisplay(button.textContent);
    });
});

function handleOperatorInput(selectedOperator) {
    if (currentInput === "Error") return;

    // Support typing negative numbers (e.g. -7 or 5 * -3)
    if (selectedOperator === '-') {
        if (firstNumber === null && (currentInput === "0" || currentInput === "")) {
            currentInput = "-";
            shouldResetDisplay = false;
            renderDisplay();
            return;
        }
        if (firstNumber !== null && operator !== null && shouldResetDisplay === true) {
            currentInput = "-";
            shouldResetDisplay = false;
            renderDisplay();
            return;
        }
    }

    // If currentInput was "-", and user selects another operator
    if (currentInput === "-") {
        operator = selectedOperator;
        currentInput = "0";
        shouldResetDisplay = true;
        renderDisplay();
        return;
    }

    // Binary operator evaluation
    if (firstNumber !== null && operator !== null && shouldResetDisplay === false) {
        let res = operate(operator, firstNumber, currentInput);
        res = roundResult(res);

        currentInput = String(res);
        firstNumber = currentInput === "Error" ? null : currentInput;
    } else {
        firstNumber = currentInput;
    }

    operator = selectedOperator;
    shouldResetDisplay = true;
    renderDisplay();
}

buttonsOperator.forEach((button) => {
    button.addEventListener('click', () => {
        handleOperatorInput(button.textContent);
    });
});

function roundResult(numberValue) {
    if (isNaN(numberValue) || typeof numberValue === "string") {
        return numberValue;
    }

    return Math.round(numberValue * 100000) / 100000;
}

function handleEqualsInput() {
    if (firstNumber !== null && operator !== null) {
        let second = shouldResetDisplay ? firstNumber : currentInput;
        if (second === "-") second = "0";

        let res = operate(operator, firstNumber, second);
        res = roundResult(res);

        currentInput = String(res);
        firstNumber = null;
        operator = null;
        shouldResetDisplay = true;
        renderDisplay();
    }
}

buttonEqual.addEventListener('click', handleEqualsInput);

function resetCalculator() {
    currentInput = "0";
    firstNumber = null;
    operator = null;
    shouldResetDisplay = false;
    renderDisplay();
}

buttonClear.addEventListener('click', resetCalculator);

function handleDecimal() {
    if (shouldResetDisplay) {
        currentInput = "0.";
        shouldResetDisplay = false;
    } else if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    renderDisplay();
}

decimalBtn.addEventListener('click', handleDecimal);

function handleBackspace() {
    if (currentInput === "Error" || shouldResetDisplay) return;
    currentInput = currentInput.slice(0, -1);

    if (currentInput === "" || currentInput === "-") {
        currentInput = "0";
    }
    renderDisplay();
}

backspaceBtn.addEventListener('click', handleBackspace);

window.addEventListener('keydown', (event) => {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        updateDisplay(key);
    } else if (key === '.') {
        handleDecimal();
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        handleOperatorInput(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        handleEqualsInput();
    } else if (key === 'Backspace') {
        handleBackspace();
    } else if (key === 'Escape') {
        resetCalculator();
    }
});

renderDisplay();