"use strict";
const btns = document.querySelectorAll("button");

const viewer = document.querySelector(".viewer");
const result = document.querySelector(".result");

let elements = ["0"];
let lastEl = elements[elements.length - 1];

function changeOps(el) {
  switch (el) {
    case "plus":
      return "+";
    case "minus":
      return "-";
    case "times":
      return "*";
    case "devided by":
      return "/";
    case "equals":
      return "=";
    default:
      return "Error";
  }
}

function insertOps(ops) {
  ops = changeOps(ops);
  if (lastEl === "+" || lastEl === "-" || lastEl === "*" || lastEl === "/") {
    elements[elements.length - 1] = ops;
  } else if (elements.length === 3) {
    elements.push("=");
  } else {
    elements.push(ops);
  }
}

function insertNum(num) {
  if (elements[0] === "0") {
    elements[0] = "";
  }
  if (
    +lastEl ||
    lastEl[lastEl.length - 1] === "." ||
    lastEl === "0" ||
    lastEl === ""
  ) {
    elements[elements.length - 1] += num;
  } else {
    elements.push(num);
  }
}

function saveElements(el) {
  el.ops ? insertOps(el.ops) : insertNum(el.num);
}

function showElements() {
  if (elements === ["0"]) {
    viewer.innerText = "0";
  } else {
    viewer.innerText = elements.join("");
  }
}

function hasOps() {
  if (
    elements.includes("+") ||
    elements.includes("-") ||
    elements.includes("*") ||
    elements.includes("/")
  ) {
    return true;
  } else false;
}

function calculate(first, second, operator) {
  switch (operator) {
    case "+":
      return first + second;
    case "-":
      return first - second;
    case "*":
      return first * second;
    case "/":
      if (second === 0) {
        return "Error: devided by 0";
      }
      return first / second;
    default:
      return "Unknown Operator";
  }
}

function showResult() {
  if (lastEl === "=" && hasOps()) {
    const first = +elements[0];
    const second = +elements[2];
    const ops = elements[1];

    console.log(first, second, ops, calculate(first, second, ops));
    const ans = Math.round(calculate(first, second, ops) * 1e12) / 1e12;

    result.innerText = ans;
    elements = [`${ans}`];
  } else if (+lastEl) {
    result.innerText = lastEl;
    console.log("no result yet: typed num");
  } else if (hasOps()) {
    console.log("no result yet: typed ops");
  } else {
    console.log("not working: no calc done");
  }
}

function handleElements(e) {
  const funcEl = e.target.classList[0];
  const CalEl = e.target.dataset;

  if (funcEl === "num" || funcEl === "ops") {
    saveElements(CalEl);
  } else {
    if (funcEl === "clear") {
      elements = ["0"];
    } else if (funcEl === "delete") {
      if (elements[0] !== "0") {
        elements.pop();
      }
    }
  }

  lastEl = elements[elements.length - 1];
  console.log(elements);
  console.log(lastEl);
  showElements();
  showResult();
}

for (const btn of btns) {
  btn.addEventListener("click", handleElements);
}
