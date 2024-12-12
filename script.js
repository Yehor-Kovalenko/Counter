const API_URL = "https://api.jsonbin.io/v3/b/675b2d3bacd3cb34a8b89468/latest";
const API_KEY = "$2a$10$T79c8Xw94EQ3CD0Qo8hE5OrmvRaqvTSPhEyviFnpbLllyDqFHsSIW";

// Select elements
const counterDisplay = document.getElementById('counter');
const incrementButton = document.getElementById('increment');
const decrementButton = document.getElementById('decrement');

let counterValue = 0;

// Fetch initial value from JSONBin
const fetchCounter = () => {
    let req = new XMLHttpRequest();
    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            const response = JSON.parse(req.responseText);
            counterValue = response.record.value; // Assuming { "value": 0 } structure in JSONBin
            updateCounterDisplay();
        }
    };
    req.open("GET", `${API_URL}/latest`, true);
    req.setRequestHeader("X-Master-Key", API_KEY);
    req.send();
};

// Update the counter value in JSONBin
const updateJSONBin = () => {
    let req = new XMLHttpRequest();
    req.open("PUT", API_URL, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("X-Master-Key", API_KEY);
    req.send(JSON.stringify({ value: counterValue }));
};

// Update the display
const updateCounterDisplay = () => {
    counterDisplay.textContent = counterValue;
};

// Increment counter
incrementButton.addEventListener('click', () => {
    counterValue++;
    updateCounterDisplay();
    updateJSONBin();
});

// Decrement counter
decrementButton.addEventListener('click', () => {
    counterValue--;
    updateCounterDisplay();
    updateJSONBin();
});

// Initialize counter
fetchCounter();
