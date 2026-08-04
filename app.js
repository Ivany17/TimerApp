const minutesInput = document.getElementById('minutesInput');
const secondsInput = document.getElementById('secondsInput');

const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

let initialTotalSeconds = 0;
let progress = 1;
let totalSeconds = 0;
let timerInterval = null;
let isFirstStart = true;
let isFinished = false;

startBtn.addEventListener('click', () => {
    let minutes = Number(minutesInput.value);
    if(minutes < 0 || minutes > 60){
        alert("Minutes must be between 0 and 60");
        return;
    }
    let seconds = Number(secondsInput.value);
    if(seconds < 0 || seconds > 60){
        alert("Seconds must be between 0 and 60");
        return;
    }
    totalSeconds = minutes * 60 + seconds;
    displayMinutes = Math.floor(totalSeconds / 60);
    displaySeconds = totalSeconds % 60;
    if(totalSeconds === 0){
        return;
    } else{
        timerInterval = setInterval(updateTimer, 1000);
    }
    if(isFirstStart){
        initialTotalSeconds = totalSeconds;
        isFirstStart = false;
    }
    progress = totalSeconds / initialTotalSeconds;
    isFinished = false;
    drawProgress();
});

function updateTimer() {
    totalSeconds--;
    displayMinutes = Math.floor(totalSeconds / 60);
    displaySeconds = totalSeconds % 60;
    minutesInput.value = displayMinutes.toString().padStart(2, '0');
    secondsInput.value = displaySeconds.toString().padStart(2, '0');
    if(totalSeconds === 0){
        clearInterval(timerInterval);
        progress = 1;
        isFinished = true;
        drawProgress();
    } else {
        progress = totalSeconds / initialTotalSeconds;
        drawProgress();
    }
}

pauseBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
});

resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    totalSeconds = 0;
    minutesInput.value = "00";
    secondsInput.value = "00";
    progress = 1;
    isFirstStart = true;
    isFinished = false;
    drawProgress();
});

[minutesInput, secondsInput].forEach(input => {
    input.addEventListener('focus', () => {
        input.select();
    });
});

const canvas = document.getElementById('timerCanvas');
canvas.height = 200;
canvas.width = 200;
const ctx = canvas.getContext('2d');

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 80;

function drawProgress(){
    ctx.clearRect(0, 0, canvas.width, canvas.height); // очистити canvas
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + progress * Math.PI * 2);
    if (isFinished) {
        ctx.strokeStyle = "green";
    } else {
        ctx.strokeStyle = "blue";
    }
    ctx.lineWidth = 5;
    ctx.stroke();
}
drawProgress();