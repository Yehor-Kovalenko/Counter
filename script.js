"use strict";

const API_URL = "https://api.jsonbin.io/v3/b/675b2d3bacd3cb34a8b89468";
const API_KEY = "$2a$10$T79c8Xw94EQ3CD0Qo8hE5OrmvRaqvTSPhEyviFnpbLllyDqFHsSIW";
const ACCESS_KEY = "$2a$10$ikZdSAnChbPazeHhug/IM.bSee06K3fX4ADBs2jjQ3Pf.Zk8KK7fe";

// DOM Elements
const counterDisplay = document.getElementById('counter');
const incrementButton = document.getElementById('increment');
const decrementButton = document.getElementById('decrement');

// Counter Value
let counterValue = 0;

// Fetch Counter Value from JSONBin
const fetchCounterFromBin = () => {
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
        if (req.readyState === XMLHttpRequest.DONE) {
            if (req.status === 200) {
                const data = JSON.parse(req.responseText);
                counterValue = data.value || 0; // Default to 0 if the value is missing
                updateCounterDisplay();
            } else {
                console.error("Failed to fetch counter from JSONBin:", req.status, req.responseText);
            }
        }
    };

    req.open("GET", `${API_URL}/latest`, true);
    req.setRequestHeader("X-Master-Key", API_KEY);
    req.setRequestHeader("X-Access-Key", ACCESS_KEY);
    req.send();
};

// Update Counter Value in JSONBin
const updateCounterInBin = () => {
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
        if (req.readyState === XMLHttpRequest.DONE) {
            if (req.status === 200) {
                console.log("Counter updated in JSONBin:", req.responseText);
            } else {
                console.error("Failed to update counter in JSONBin:", req.status, req.responseText);
            }
        }
    };

    req.open("PUT", API_URL, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("X-Master-Key", API_KEY);
    req.setRequestHeader("X-Access-Key", ACCESS_KEY);
    req.send(JSON.stringify({ value: counterValue }));
};

// Update Counter Display
const updateCounterDisplay = () => {
    counterDisplay.textContent = counterValue;
};

// Increment Counter
incrementButton.addEventListener('click', () => {
    counterValue++;
    updateCounterDisplay();
});

// Decrement Counter
decrementButton.addEventListener('click', () => {
    counterValue--;
    updateCounterDisplay();
});

// Event: Fetch counter on page load
window.onload = () => {
    fetchCounterFromBin();
};

// Event: Update counter in bin on page unload
window.onbeforeunload = () => {
    updateCounterInBin();
};