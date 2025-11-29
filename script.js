let display = document.getElementById("display");

// Add value to display
function appendValue(value) {
    display.value += value;
}

// Clear display
function clearDisplay() {
    display.value = "";
}

// Delete last character
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Calculate result
function calculate() {
    if (display.value === "") return;

    try {
        let expression = display.value;

        // Replace % with *0.01
        expression = expression.replace(/%/g, "*0.01");

        // Evaluate JS expression
        let result = eval(expression);
        display.value = result;

        // Save to history
        saveHistory(display.value);

    } catch (err) {
        display.value = "Error";
    }
}

// Save history
function saveHistory(result) {
    if (!window.XMLHttpRequest) return;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "save_history.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = function() {
        loadHistory();
    };
    xhr.send("calculation=" + encodeURIComponent(display.value + " = " + result));
}

// Load history
function loadHistory() {
    if (!window.XMLHttpRequest) return;

    let xhr = new XMLHttpRequest();
    xhr.open("GET", "get_history.php", true);
    xhr.onload = function() {
        if (this.status === 200) {
            let historyList = JSON.parse(this.responseText);
            let historyDiv = document.getElementById("history-list");
            if (!historyDiv) return;
            historyDiv.innerHTML = "";
            historyList.reverse().forEach(item => {
                let div = document.createElement("div");
                div.className = "history-item";
                div.textContent = item;
                historyDiv.appendChild(div);
            });
        }
    };
    xhr.send();
}

// Clear history
document.getElementById("clear-history")?.addEventListener("click", function() {
    if (!window.XMLHttpRequest) return;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "save_history.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = function() {
        loadHistory();
    };
    xhr.send("calculation=clear");
});

// Load history on page load
window.onload = function() {
    loadHistory();
};
