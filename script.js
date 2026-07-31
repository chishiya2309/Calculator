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
    if (b === 0) {
        alert("Cannot divide by zero");
    }
    return Number(a) / Number(b);
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
const buttonsOperator = document.querySelectorAll(".btn-operator");
const buttonEqual = document.querySelector(".btn-equals");
const buttonClear = document.querySelector(".btn-clear");
const decimalBtn = document.querySelector('.btn-decimal');

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

buttonsOperator.forEach((button) => {
    button.addEventListener('click', () => {
        if (firstNumber !== null && operator !== null && shouldResetDisplay === false) {
            secondNumber = displayElement.textContent;
            let res = operate(operator, firstNumber, secondNumber);
            res = roundResult(res);

            currentInput = res;
            displayElement.textContent = res;

            firstNumber = res;
            secondNumber = null;
        } else {
            firstNumber = displayElement.textContent;
        }
        operator = button.textContent;
        shouldResetDisplay = true;
    });
});

function roundResult(numberValue) {
    if (isNaN(numberValue)) {
        return numberValue;
    }

    return Math.round(numberValue * 100000) / 100000;
}

buttonEqual.addEventListener('click', () => {
    if (firstNumber !== null && operator !== null) {
        secondNumber = displayElement.textContent;
        let res = operate(operator, firstNumber, secondNumber);
        res = roundResult(res);

        currentInput = res;
        displayElement.textContent = res;

        firstNumber = null;
        secondNumber = null;
        operator = null;
        shouldResetDisplay = true;
    }
});

function resetCalculator() {
    currentInput = "0";
    firstNumber = null;
    secondNumber = null;
    operator = null;
    shouldResetDisplay = false;
    displayElement.textContent = "0";
}

buttonClear.addEventListener('click', () => {
    resetCalculator();
})

function handleDecimal() {
    if (shouldResetDisplay) {
        currentInput = "0.";
        shouldResetDisplay = false;
    }else if(!currentInput.includes('.')) {
        currentInput += '.';
    }
    displayElement.textContent = currentInput;
}

decimalBtn.addEventListener('click', handleDecimal);