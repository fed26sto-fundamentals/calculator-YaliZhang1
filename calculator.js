var firstNumber = "0";
var secondNumber = "";
var operator = "";
// 默认重置为false,只有在需要的时候才改为True,让它可以把当前数据清零
var resetDisplay = false;

const decimalButton = document.querySelector("#decimal");
const display = document.querySelector("#screen");
document.addEventListener("DOMContentLoaded", () => {
  //   // 要获取点击按钮的值，可以在事件处理程序中使用一个变量存储该值。
  //   // 然后在函数外部访问该变量。
  //   let clickedValue;
  const digitButtons = document.querySelectorAll(".black");
  digitButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const clickedValue = button.getAttribute("data-value");

      appendChar(clickedValue);
    });
  });
  // 操作符
  const operatorButtons = document.querySelectorAll(".blue");
  operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const clickedValue = button.getAttribute("data-value");
      appendOperator(clickedValue);
    });
  });

  document.querySelector("#equal").addEventListener("click", () => {
    operate();
  });

  document.querySelector("#reset").addEventListener("click", () => {
    reset();
  });

  document.querySelector("#undo").addEventListener("click", () => {
    undo();
  });
});
// char表示字符，如果resetDisplay为真或者（display.textContent为0并且不是以“.”结束，即：不为“0.”的时候...

function appendChar(char) {
  if (resetDisplay || (display.textContent === "0" && char !== ".")) {
    display.textContent = "";
    resetDisplay = false;
  }
  if (display.textContent.length > 8) {
    return;
  }

  if (display.textContent === "" && char === ".") {
    display.textContent = "0";
  }

  display.textContent += char;

  if (!operator) {
    firstNumber = display.textContent; // 如果没有操作符，则将当前值存储为第一个运算数
  } else {
    secondNumber = display.textContent; // 否则，将当前值存储为第二个运算数
  }

  if (display.textContent.includes(".")) {
    decimalButton.disabled = true;
  } else {
    decimalButton.disabled = false;
  }
}

function appendOperator(op) {
  if (secondNumber) {
    operate();
  }
  operator = op;
  resetDisplay = true;
  display.textContent = firstNumber;
}

function reset() {
  firstNumber = "0";
  secondNumber = "";
  operator = "";
  display.textContent = "0";
  resetDisplay = false;
}

function undo() {
  if (resetDisplay) {
    display.textContent = ""; // 重置显示屏
    resetDisplay = false; //重置显示器的标志
  }
  display.textContent = display.textContent.slice(0, -1); // 删除最后一个字符

  // 如果删除后没有字符或者只有负号，则显示“0”
  if (display.textContent === "" || display.textContent === "-") {
    display.textContent = "0";
  }
  // 小数点按钮控制
  if (!display.textContent.includes(".")) {
    decimalButton.disabled = false;
  }
  // 如果没有操作符，则将当前值存储为第一个运算数
  if (!operator) {
    firstNumber = display.textContent;
    if (firstNumber === "") {
      firstNumber = "0"; // 如果第一个运算数为空，则设置为“0”
    }
  } else {
    secondNumber = display.textContent;
    if (secondNumber === "") {
      secondNumber = "0"; // 如果第二个运算数为空，则设置为“0”
    }
  }
}

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
    return "ERROR";
  }
  return a / b;
}
function operate() {
  // 检查是否以小数点结尾，如果是，就补一个0在后面。
  if (display.textContent.endsWith(".")) {
    display.textContent += "0";
    // 检查是否是符号，如果不是，就把你从按钮上拿到的属性（这里是值）赋给第一个数。如果不是，就赋给第二个数。
    if (!operator) {
      firstNumber = display.textContent;
    } else {
      secondNumber = display.textContent;
    }
  }
  if (!(firstNumber && secondNumber && operator)) {
    return;
  }
  const a = parseFloat(firstNumber);
  const b = parseFloat(secondNumber);
  var result = "0";
  switch (operator) {
    case "+":
      result = add(a, b);
      break;
    case "-":
      result = subtract(a, b);
      break;
    case "*":
      result = multiply(a, b);
      break;
    case "/":
      result = divide(a, b);
      break;
  }
  //   if error,set 0
  if (result === "ERROR") {
    resetDisplay = true;
    firstNumber = 0;
  } else {
    firstNumber = result;
  }
  //   if result includes ".", then disabled the "."button, let the "." button can't work
  if (result.toString().includes(".")) {
    decimalButton.disabled = true;
  } else {
    decimalButton.disabled = false;
  }
  display.textContent = result;
  secondNumber = "";
}
