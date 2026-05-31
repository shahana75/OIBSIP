const display = document.getElementById("display");

// Get all buttons
const buttons = document.querySelectorAll("button");

// Loop through buttons → add event listeners
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.innerText;

        if (value === "C") {
            clearDisplay();
        } 
        else if (value === "=") {
            calculate();
        } 
        else {
            appendValue(value);
        }
    });
});

// Add value to display
function appendValue(value) {
    display.value += value;
}

// Clear display
function clearDisplay() {
    display.value = "";
}

// Calculate result
function calculate() {
    try {
        // Basic safety check using if condition
        if (display.value === "") {
            display.value = "Error";
        } else {
            display.value = eval(display.value);
        }
    } catch (error) {
        display.value = "Error";
    }
}

document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (!isNaN(key) || "+-*/.".includes(key)) {
        appendValue(key);
    } 
    else if (key === "Enter") {
        calculate();
    } 
    else if (key === "Backspace") {
        display.value = display.value.slice(0, -1);
    } 
    else if (key === "Escape") {
        clearDisplay();
    }
});
