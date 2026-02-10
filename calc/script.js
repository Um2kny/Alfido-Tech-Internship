const display = document.getElementById("display");
let current = "";
let operator = null;
let previous = "";

document.querySelectorAll("button").forEach(btn => {
  btn.onclick = () => handle(btn.textContent);
});

function handle(val) {
  if (!isNaN(val) || val === ".") {
    if (val === "." && current.includes(".")) return;
    current += val;
    update();
  }

  if (["+", "−", "×", "÷"].includes(val)) {
    if (!current) return;
    operator = val;
    previous = current;
    current = "";
  }

  if (val === "=") calculate();

  if (val === "AC") reset();
  if (val === "DEL") {
    current = current.slice(0, -1);
    update();
  }

  if (val === "√") {
    current = Math.sqrt(Number(current)).toString();
    update();
  }
}

function calculate() {
  if (!operator || !current) return;

  let a = Number(previous);
  let b = Number(current);
  let result;

  switch (operator) {
    case "+": result = a + b; break;
    case "−": result = a - b; break;
    case "×": result = a * b; break;
    case "÷": result = b === 0 ? "ERR" : a / b; break;
  }

  current = result.toString();
  operator = null;
  previous = "";
  update();
}

function reset() {
  current = "";
  previous = "";
  operator = null;
  update();
}

function update() {
  display.textContent = formatNumber(current || "0");
}
function formatNumber(num) {
  if (num === "ERR") return num;

  let n = Number(num);

  // Max digits the display can safely show
  const MAX_DIGITS = 10;

  // If integer part is already too big
  if (Math.abs(n) >= 10 ** MAX_DIGITS) {
    return n.toExponential(4);
  }

  // Limit decimal precision dynamically
  return n.toLocaleString("en-US", {
    maximumFractionDigits: MAX_DIGITS,
  });
}

