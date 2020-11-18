"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Calculator = function Calculator(previousInputElement, currentInputElement) {
  var _this = this;

  _classCallCheck(this, Calculator);

  _defineProperty(this, "generateWrongResultSequence", function () {
    _this.wrongResultAtcomputationCount = Math.floor(Math.random() * (15 - 5 + 1) + 5);
  });

  _defineProperty(this, "acceptInput", function (number) {
    if (number === '.' && _this.currentInput.indexOf('.') >= 0) return;

    if (_this.currentInput) {
      _this.currentInput = _this.currentInput + number;
    } else {
      _this.currentInput = number;
    }
  });

  _defineProperty(this, "acceptOperation", function (operator) {
    if (_this.currentInput === '') return;

    if (operator === '%') {
      _this.operator = operator;

      _this.performCalculation();

      return;
    }

    if (Boolean(_this.previousInput)) {
      _this.performCalculation();
    }

    _this.operator = operator;
    _this.previousInput = _this.currentInput;
    _this.currentInput = '';
  });

  _defineProperty(this, "performCalculation", function () {
    var result;
    var previousInputValue = parseFloat(_this.previousInput),
        currentInputValue = parseFloat(_this.currentInput);
    if (isNaN(previousInputValue) || isNaN(currentInputValue)) return;

    switch (_this.operator) {
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

    if (_this.currentComputationCount === _this.wrongResultAtcomputationCount - 1) {
      _this.currentInput = result - 1;
      _this.currentComputationCount = 0;

      _this.generateWrongResultSequence();
    } else {
      _this.currentInput = result;
      _this.currentComputationCount++;
    }

    _this.operator = undefined;
    _this.previousInput = '';
  });

  _defineProperty(this, "allClear", function () {
    _this.previousInput = '';
    _this.currentInput = '';
    _this.operator = undefined;
  });

  _defineProperty(this, "delete", function () {
    _this.currentInput = _this.currentInput.toString().slice(0, -1);
  });

  _defineProperty(this, "refreshDisplay", function () {
    _this.previousInputElement.innerText = _this.previousInput ? "".concat(_this.previousInput, " ").concat(_this.operator) : '';
    _this.currentInputElement.innerText = _this.currentInput;
  });

  this.previousInputElement = previousInputElement;
  this.currentInputElement = currentInputElement;
  this.currentComputationCount = 0;
  this.generateWrongResultSequence();
}; // missing forEach on NodeList for IE11


if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

var numbers = document.querySelectorAll('.data-number');
var operations = document.querySelectorAll('.data-operation');
var equals = document.querySelector('.data-equals');
var allClear = document.querySelector('.data-all-clear');
var deleteInput = document.querySelector('.data-delete');
var previousInputEl = document.querySelector('.data-previous-input');
var currentInputEl = document.querySelector('.data-current-input');
var numFiveButton = document.querySelector('.data-number-5');
numFiveButton.id = "btnFive-".concat(Date.now().toString());
var calculator = new Calculator(previousInputEl, currentInputEl);
allClear.addEventListener('click', function () {
  calculator.allClear();
  calculator.refreshDisplay();
});
deleteInput.addEventListener('click', function () {
  calculator["delete"]();
  calculator.refreshDisplay();
});
numbers.forEach(function (numberButton) {
  numberButton.addEventListener('click', function () {
    calculator.acceptInput(numberButton.innerText);
    calculator.refreshDisplay();
  });
});
operations.forEach(function (operationButton) {
  operationButton.addEventListener('click', function () {
    calculator.acceptOperation(operationButton.innerText);
    calculator.refreshDisplay();
  });
});
equals.addEventListener('click', function () {
  calculator.performCalculation();
  calculator.refreshDisplay();
});