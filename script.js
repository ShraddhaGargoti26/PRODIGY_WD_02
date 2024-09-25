let startTime;
let elapsedTime = 0;
let intervalId;
let isRunning = false;
let lapCounter = 1;

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateDisplay, 10); // Update every 10 milliseconds
        document.getElementById('pause').textContent = 'Pause'; // Ensure button says "Pause"
    }
}

function pauseStopwatch() {
    if (isRunning) {
        isRunning = false;
        clearInterval(intervalId);
        elapsedTime = Date.now() - startTime;
        document.getElementById('pause').textContent = 'Resume'; // Change button to "Resume"
    }
}

function resumeStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateDisplay, 10);
        document.getElementById('pause').textContent = 'Pause'; // Change button back to "Pause"
    }
}

function resetStopwatch() {
    clearInterval(intervalId);
    elapsedTime = 0;
    isRunning = false;
    document.getElementById("display").textContent = "00:00:00:000";
    document.getElementById("laps-list").innerHTML = ""; // Clear lap list
    lapCounter = 1; // Reset lap counter
    document.getElementById('pause').textContent = 'Pause'; // Reset button text to "Pause"
}

function lapStopwatch() {
    if (isRunning) {
        const lapTime = document.getElementById("display").textContent;
        
        // Create a new table row element
        const newRow = document.createElement('tr');
        newRow.classList.add('lap-row');  // Apply the lap-row class

        // Create two table data cells
        const lapNumberCell = document.createElement('td');
        lapNumberCell.textContent = 'Lap ' + lapCounter; // Correct lap number
        
        const lapTimeCell = document.createElement('td');
        lapTimeCell.textContent = lapTime;

        // Append the cells to the new row
        newRow.appendChild(lapNumberCell);
        newRow.appendChild(lapTimeCell);

        // Set the background color of the new row to white
        newRow.style.backgroundColor = 'white';

        // Append the new row to the laps table body
        document.getElementById('laps-list').appendChild(newRow);
        
        lapCounter++; // Increment lap counter after adding the lap
    }
}

function updateDisplay() {
    const timePassed = Date.now() - startTime;
    const hours = Math.floor(timePassed / (1000 * 60 * 60));
    const minutes = Math.floor((timePassed % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timePassed % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((timePassed % 1000) / 10);

    document.getElementById("display").textContent =
        (hours < 10 ? "0" + hours : hours) + ":" +
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds) + ":" +
        (milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds);
}

// Add event listener for buttons
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('start').addEventListener('click', startStopwatch);
    document.getElementById('pause').addEventListener('click', function() {
        if (isRunning) {
            pauseStopwatch();
        } else {
            resumeStopwatch();
        }
    });
    document.getElementById('reset').addEventListener('click', resetStopwatch);
    document.getElementById('lap').addEventListener('click', lapStopwatch);
});
