document.addEventListener("DOMContentLoaded", function () {
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll("button");

  let currentValue = "0";
  let previousValue = null;
  let operator = null;
  let waitingForOperand = false;

  function updateDisplay() {
    display.value = currentValue;
  }

  function clear() {
    currentValue = "0";
    previousValue = null;
    operator = null;
    waitingForOperand = false;
    updateDisplay();
  }

  function inputDigit(digit) {
    if (waitingForOperand) {
      currentValue = String(digit);
      waitingForOperand = false;
    } else {
      currentValue =
        currentValue === "0" ? String(digit) : currentValue + digit;
    }
    updateDisplay();
  }

  function inputDecimal() {
    if (waitingForOperand) {
      currentValue = "0.";
      waitingForOperand = false;
    } else if (currentValue.indexOf(".") === -1) {
      currentValue += ".";
    }
    updateDisplay();
  }

  function toggleSign() {
    currentValue = String(parseFloat(currentValue) * -1);
    updateDisplay();
  }

  function inputPercent() {
    currentValue = String(parseFloat(currentValue) / 100);
    updateDisplay();
  }

  function performOperation(nextOperator) {
    const inputValue = parseFloat(currentValue);

    if (previousValue === null) {
      previousValue = inputValue;
    } else if (operator) {
      const result = calculate(previousValue, inputValue, operator);
      currentValue = String(result);
      previousValue = result;
    }

    waitingForOperand = true;
    operator = nextOperator;
    updateDisplay();
  }

  function calculate(firstOperand, secondOperand, operator) {
    switch (operator) {
      case "+":
        return firstOperand + secondOperand;
      case "−":
        return firstOperand - secondOperand;
      case "×":
        return firstOperand * secondOperand;
      case "÷":
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  }

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const buttonText = button.textContent;

      if (button.classList.contains("btn-num")) {
        if (buttonText === ".") {
          inputDecimal();
        } else {
          inputDigit(buttonText);
        }
      } else if (button.classList.contains("btn-operator")) {
        if (buttonText === "=") {
          performOperation(null);
          operator = null;
          previousValue = null;
          waitingForOperand = false;
        } else {
          performOperation(buttonText);
        }
      } else if (button.classList.contains("btn-function")) {
        if (buttonText === "AC") {
          clear();
        } else if (buttonText === "+/-") {
          toggleSign();
        } else if (buttonText === "%") {
          inputPercent();
        }
      }
    });
  });
});
