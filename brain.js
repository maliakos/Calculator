//helper functions
function add(a, b) {
  return a + b;
}
function substract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return b != 0 ? a / b : "You cannot divide with 0!";
}

function operate(a, b, operator) {
  if (typeof a === "number" && typeof b === "number")
    switch (operator) {
      case "+":
        return add(a, b);
      case "-":
        return substract(a, b);
      case "*":
        return multiply(a, b);
      case "/":
        return divide(a, b);
      default:
        return "Input Error";
    }
}
