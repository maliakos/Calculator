const storage = {};

function initCalculator() {
  storage.operantA = "";
  storage.operantB = "";
  storage.operator = "";
  storage.operatorNext = "";
  storage.screenValue = "0";
  storage.screenNode = document.querySelector(".screen");
  storage.numbersNodeList = document.querySelectorAll(
    "[data-function='number']"
  );
  storage.screenNode.innerHTML = "0";
  // Event Delegation.
  document.querySelector(".calculator").addEventListener("click", (e) => {
    if (isButton(e)) {
      handleInput(e);
    }
  });
}
//Screen related functions
function displayScreen(e) {
  storage.screenNode.innerHTML == "0" || storage.screenValue == "0"
    ? (storage.screenNode.innerHTML = e.target.innerHTML)
    : (storage.screenNode.innerHTML += e.target.innerHTML);
  storage.screenValue += e.target.innerHTML;
}
function storeScreenValue() {
  storage.screenValue = storage.screenNode.innerHTML;
}
function displayOperator(e) {
  document.getElementById("operator-display").innerHTML = e.target.innerHTML;
}
function storeOperator(e) {
  storage.operator.length
    ? (storage.operatorNext = e.target.innerHTML)
    : (storage.operator = e.target.innerHTML);
}
function clearScreen() {
  storage.screenNode.innerHTML = "0";
  storage.screenValue = "0";
  storage.operantA = "";
  storage.operantB = "";
  storage.operatorNext = "";
  disableButton("equals");
  document.getElementById("operator-display").innerHTML = "";
}
function isScreenFull(e) {
  inputValue = e.target.innerHTML;
  if (inputValue !== "00" && storage.screenValue.length < 9) {
    return false;
  } else if (inputValue == "00" && storage.screenValue.length < 8) {
    return false;
  } else {
    return true;
  }
}
function disableScreen() {
  storage.screenNode.classList.add("message");
  storage.numbersNodeList.forEach((node) => {
    node.disabled = true;
  });
}
function enableScreen() {
  storage.screenNode.classList.remove("message");
  document.querySelectorAll("button").forEach((node) => {
    node.disabled = false;
  });
}
function handleScreen(e) {
  if (isScreenFull(e)) {
    disableScreen();
    return;
  }
  displayScreen(e);
}
//Logic related functions
function handleOperants() {
  storage.operantA.length
    ? (storage.operantB = storage.screenValue)
    : (storage.operantA = storage.screenValue);
  if (storage.operantB.length) {
    storage.screenNode.innerHTML = operate(
      storage.operantA,
      storage.operantB,
      storage.operator
    )
      .toString()
      .substring(0, 9);
    storage.operantA = storage.screenNode.innerHTML;
    storage.screenValue = "0";
    storage.operator = storage.operatorNext;
    storage.operantB = "";
    return;
  }
  storage.screenValue = "0";
}
function handleEqual() {
  if (storage.operantB.length) {
    handleOperants();
  }
  if (
    storage.operantA.length &&
    storage.operator.length &&
    storage.screenValue
  ) {
    storeScreenValue();
    handleOperants();
  }
}
function handleBackspace() {
  if (storage.screenNode.innerHTML.length > 1) {
    storage.screenNode.innerHTML = storage.screenNode.innerHTML.substring(
      0,
      storage.screenNode.innerHTML.length - 1
    );
    storage.screenValue = storage.screenValue.substring(
      0,
      storage.screenValue.length - 1
    );
  } else return;
}
function handleInput(e) {
  switch (e.target.dataset.function) {
    case "clear": {
      clearScreen();
      enableScreen();
      break;
    }
    case "operator": {
      enableScreen();
      storeOperator(e);
      displayOperator(e);
      storeScreenValue();
      handleOperants(e);
      break;
    }
    case "equals": {
      displayOperator(e);
      handleEqual();
      break;
    }
    case "backspace": {
      handleBackspace();
      break;
    }
    case "decimal": {
      handleScreen(e);
      disableButton("decimal");
      break;
    }
    default: {
      handleScreen(e);
    }
  }
  return;
}
function operate(a, b, operator) {
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
//Math helper functions
function add(a, b) {
  return +a + +b;
}
function substract(a, b) {
  return +a - +b;
}
function multiply(a, b) {
  return +a * +b;
}
function divide(a, b) {
  return +b != 0 ? +a / +b : "Ouch! x/0";
}
function changeSign() {
  return;
}
//Helper functions
function isButton(e) {
  return e.target.tagName == "BUTTON" ? true : false;
}
function disableButton(id) {
  document.getElementById(id).disabled = true;
}
function enableButton(id) {
  document.getElementById(id).disabled = false;
}

initCalculator();
