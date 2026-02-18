// Elements
const display = document.getElementById("display");
const historyList = document.getElementById("historyList");

// -------------------- BASIC INPUT --------------------
function append(value) {
  // Auto-add "(" for math functions
  if (["sin", "cos", "tan", "sqrt"].includes(value)) {
    display.value += value + "(";
    return;
  }

  display.value += value;
}

function clearAll() {
  display.value = "";
}

function deleteOne() {
  display.value = display.value.slice(0, -1);
}

// -------------------- DEGREE CONVERSION --------------------
function degToRad(deg) {
  return deg * Math.PI / 180;
}

// -------------------- AUTO BRACKET CLOSING --------------------
function autoCloseBrackets(expr) {
  const open = (expr.match(/\(/g) || []).length;
  const close = (expr.match(/\)/g) || []).length;
  return expr + ")".repeat(open - close);
}

// -------------------- CALCULATION ENGINE --------------------
function calculate() {
  try {
    let expression = autoCloseBrackets(display.value);

    // Convert functions
    expression = expression
      .replace(/sin\(([^)]+)\)/g, "Math.sin(degToRad($1))")
      .replace(/cos\(([^)]+)\)/g, "Math.cos(degToRad($1))")
      .replace(/tan\(([^)]+)\)/g, "Math.tan(degToRad($1))")
      .replace(/sqrt\(([^)]+)\)/g, "Math.sqrt($1)")
      .replace(/(\d+)\^(\d+)/g, "Math.pow($1,$2)");

    const result = eval(expression);

    addHistory(display.value + " = " + result);
    display.value = result;
  } catch {
    display.value = "Error";
  }
}

// -------------------- HISTORY --------------------
function addHistory(text) {
  const li = document.createElement("li");
  li.textContent = text;
  historyList.prepend(li);
}

// -------------------- KEYBOARD SUPPORT --------------------
document.addEventListener("keydown", (e) => {
  if ((e.key >= "0" && e.key <= "9") || "+-*/.%()".includes(e.key)) {
    append(e.key);
  }

  if (e.key === "Enter") calculate();
  if (e.key === "Backspace") deleteOne();
  if (e.key === "Escape") clearAll();
});

// -------------------- DARK MODE --------------------
document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("dark");
};