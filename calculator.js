const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

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


function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function calculate() {
    try {
        
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
