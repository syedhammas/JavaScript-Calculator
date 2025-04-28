let display = document.getElementById('display');
let currentInput = '0';
let expression = '';
let evaluated = false;

function updateDisplay() {
  display.innerText = currentInput;
}

function inputNumber(num) {
  if (evaluated) {
    currentInput = num;
    expression = num;
    evaluated = false;
  } else {
    if (currentInput === '0') {
      currentInput = num;
    } else {
      currentInput += num;
    }
    expression += num;
  }
  updateDisplay();
}

function inputOperator(operator) {
  if (evaluated) {
    expression = currentInput;
    evaluated = false;
  }
  if (/[+\-*/]$/.test(expression)) {
    if (operator === '-') {
      expression += operator;
      currentInput = operator;
    } else {
      expression = expression.replace(/[+\-*/]+$/, operator);
      currentInput = operator;
    }
  } else {
    expression += operator;
    currentInput = operator;
  }
  updateDisplay();
}

function inputDecimal() {
  if (evaluated) {
    currentInput = '0.';
    expression = '0.';
    evaluated = false;
  } else if (!currentInput.includes('.')) {
    currentInput += '.';
    expression += '.';
  }
  updateDisplay();
}

function clearCalculator() {
  currentInput = '0';
  expression = '';
  updateDisplay();
}

function calculate() {
  try {
    let result = eval(expression);
    result = Math.round(result * 100000) / 100000; // Up to 5 decimal precision
    currentInput = result.toString();
    expression = result.toString();
    evaluated = true;
    updateDisplay();
  } catch (e) {
    currentInput = 'Error';
    updateDisplay();
  }
}

// Event listeners
document.getElementById('zero').onclick = () => inputNumber('0');
document.getElementById('one').onclick = () => inputNumber('1');
document.getElementById('two').onclick = () => inputNumber('2');
document.getElementById('three').onclick = () => inputNumber('3');
document.getElementById('four').onclick = () => inputNumber('4');
document.getElementById('five').onclick = () => inputNumber('5');
document.getElementById('six').onclick = () => inputNumber('6');
document.getElementById('seven').onclick = () => inputNumber('7');
document.getElementById('eight').onclick = () => inputNumber('8');
document.getElementById('nine').onclick = () => inputNumber('9');

document.getElementById('add').onclick = () => inputOperator('+');
document.getElementById('subtract').onclick = () => inputOperator('-');
document.getElementById('multiply').onclick = () => inputOperator('*');
document.getElementById('divide').onclick = () => inputOperator('/');

document.getElementById('decimal').onclick = inputDecimal;
document.getElementById('clear').onclick = clearCalculator;
document.getElementById('equals').onclick = calculate;

updateDisplay();
