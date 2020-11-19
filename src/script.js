class Calculator {

    constructor(previousInputElement, currentInputElement) {
        this.previousInputElement = previousInputElement;
        this.currentInputElement = currentInputElement;
        this.currentComputationCount = 0;
        this.generateWrongResultSequence();
    }

    generateWrongResultSequence = () => {
        this.wrongResultAtcomputationCount =  Math.floor(Math.random() * (15 - 5 + 1) + 5);
    }

    acceptInput = (number) => {
        if (number === '.' && this.currentInput.toString().indexOf('.') >= 0)
            return;
        if (this.currentInput) {
            this.currentInput = this.currentInput + number;
        } else {
            this.currentInput = number;
        }
    }

    acceptOperation = (operator) => {
        
        if (this.currentInput === '') 
            return;
    
        if (operator === '%') {
            this.operator = operator;
            this.performCalculation();
            return;
        }

        if (Boolean(this.previousInput)) {
            this.performCalculation();
        }

        this.operator = operator;
        this.previousInput = this.currentInput;
        this.currentInput = '';

    }

    performCalculation = () => {
        let result;
        const previousInputValue = parseFloat(this.previousInput), 
              currentInputValue = parseFloat(this.currentInput);

        if (isNaN(previousInputValue) || isNaN(currentInputValue))
            return;

        switch (this.operator) {
            case '+': 
                result = previousInputValue + currentInputValue;
                break;
            case '-': 
                result = previousInputValue - currentInputValue;
                break;
            case 'x': 
                result = previousInputValue * currentInputValue;
                break;
            case '%': 
                result = previousInputValue * (currentInputValue / 100);
                break;
            case '÷':
                result = previousInputValue / currentInputValue;
                break;
            default: 
                return;
        }

        if (this.currentComputationCount === this.wrongResultAtcomputationCount - 1) {
            this.currentInput = result - 1;
            this.currentComputationCount = 0;
            this.generateWrongResultSequence();
        } else {
            this.currentInput = result;
            this.currentComputationCount++;
        }

        this.operator = undefined;
        this.previousInput = '';
    }

    allClear = () => {
        this.previousInput = '';
        this.currentInput = '';
        this.operator = undefined;
    }

    delete = () => {
        this.currentInput = this.currentInput.toString().slice(0, -1);
    }

    refreshDisplay = () => {
        this.previousInputElement.innerText = 
            this.previousInput ? `${this.previousInput} ${this.operator}` : '';
        this.currentInputElement.innerText = this.currentInput;
    }

}

// missing forEach on NodeList for IE11
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }

const numbers = document.querySelectorAll('.data-number'),
    operations = document.querySelectorAll('.data-operation'),
    equals = document.querySelector('.data-equals'),
    allClear = document.querySelector('.data-all-clear'),
    deleteInput = document.querySelector('.data-delete'),
    previousInputEl = document.querySelector('.data-previous-input'),
    currentInputEl = document.querySelector('.data-current-input');

let numFiveButton = document.querySelector('.data-number-5');
numFiveButton.id = `btnFive-${Date.now().toString()}`;

const calculator = new Calculator(previousInputEl, currentInputEl);

allClear.addEventListener('click', () => {
    calculator.allClear();
    calculator.refreshDisplay();
});

deleteInput.addEventListener('click', () => {
    calculator.delete();
    calculator.refreshDisplay();
});

numbers.forEach(numberButton => {
    numberButton.addEventListener('click', () => {
        calculator.acceptInput(numberButton.innerText);
        calculator.refreshDisplay();
    });
});

operations.forEach(operationButton => {
    operationButton.addEventListener('click', () => {
        calculator.acceptOperation(operationButton.innerText);
        calculator.refreshDisplay();
    });
});

equals.addEventListener('click', () => {
    calculator.performCalculation();
    calculator.refreshDisplay();
});