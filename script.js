let workTime = 25 * 60;
let breakTime = 5 * 60;
let currentTime = workTime;
let timer;
let isWorkMode = true;
let completedPomodoros = 0;
let totalFocusMinutes = 0;

const timeDisplay = document.getElementById("time");
const modeDisplay = document.getElementById("mode");

function updateDisplay() {
    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;
    timeDisplay.textContent =
        minutes.toString().padStart(2, '0') + ":" +
        seconds.toString().padStart(2, '0');
}

function startTimer() {
    if (timer) return;

    timer = setInterval(() => {
        currentTime--;
        updateDisplay();

        if (currentTime <= 0) {
            clearInterval(timer);
            timer = null;

            if (isWorkMode) {
                completedPomodoros++;
                totalFocusMinutes += 25;
                document.getElementById("completedCount").textContent = completedPomodoros;
                document.getElementById("totalFocus").textContent = totalFocusMinutes;

                isWorkMode = false;
                currentTime = breakTime;
                modeDisplay.textContent = "Break Time";
                alert("Work session completed! Take a break.");
            } else {
                isWorkMode = true;
                currentTime = workTime;
                modeDisplay.textContent = "Work Time";
                alert("Break over! Back to work.");
            }

            updateDisplay();
        }

    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timer = null;
    isWorkMode = true;
    currentTime = workTime;
    modeDisplay.textContent = "Work Time";
    updateDisplay();
}

// Task Management
function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();
    if (!taskText) return;

    const li = document.createElement("li");
    li.textContent = taskText;

    li.addEventListener("click", () => {
        li.style.textDecoration = "line-through";
        li.style.opacity = "0.6";
    });

    document.getElementById("taskList").appendChild(li);
    input.value = "";
}

updateDisplay();
