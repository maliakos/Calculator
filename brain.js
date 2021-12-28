//Store Values being displayed at the calculator's screen.
let screenValue = "";
//Operants
let operantA = 0;
let operantB = 0;
let operator = "";
//NODES STORED
const screenNode = document.querySelector(".screen");
const numpadNodelist = document.querySelectorAll(
  "button:not(#clear,#swap-sign,.operator)"
);
const operatorNodeList = document.querySelectorAll(".operator");
const clearNode = document.getElementById("clear");
const swapSignNode = document.getElementById("swap-sign");
const operatorDisplayNode = document.getElementById("operator-display");
// Screen Content Manipulation
function refreshScreen(newValue) {
  if (newValue !== "00" && screenValue.length < 10) {
    screenValue = screenValue + newValue;
    screenNode.innerHTML = screenValue;
  } else if (newValue == "00" && screenValue.length < 9) {
    screenValue = screenValue + newValue;
    screenNode.innerHTML = screenValue;
  } else {
    displayMessage();
  }
}
function clearScreen() {
  screenValue = "";
  screenNode.innerHTML = "0";
  continueOperations();
}
function displayMessage() {
  numpadNodelist.forEach((node) => {
    screenNode.classList.add("message");
    node.disabled = true;
  });
}
function continueOperations() {
  numpadNodelist.forEach((node) => {
    screenNode.classList.remove("message");
    node.disabled = false;
  });
}
//Do the Math helper functions
// function add(a, b) {
//   return a + b;
// }
// function substract(a, b) {
//   return a - b;
// }
// function multiply(a, b) {
//   return a * b;
// }
// function divide(a, b) {
//   return b != 0 ? a / b : "You cannot divide with 0!";
// }

// function operate(a, b, operator) {
//   if (typeof a === "number" && typeof b === "number")
//     switch (operator) {
//       case "+":
//         return add(a, b);
//       case "-":
//         return substract(a, b);
//       case "*":
//         return multiply(a, b);
//       case "/":
//         return divide(a, b);
//       default:
//         return "Input Error";
//     }
// }
function changeSign() {
  return;
}
///EVENT LISTENERS
numpadNodelist.forEach((button) => {
  button.addEventListener("click", (e) => {
    refreshScreen(e.target.innerHTML);
  });
});

operatorNodeList.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (numpadNodelist[0].disabled == true) {
      continueOperations();
    }
    operatorDisplayNode.innerHTML = e.target.innerHTML;
    //LEFT IT HERE !! OPERANTS LOGIC HERE ???SEEE YOU TOMORROW
    // if(operantA!==0)
  });
});

clearNode.addEventListener("click", clearScreen);

swapSignNode.addEventListener("click", changeSign);
