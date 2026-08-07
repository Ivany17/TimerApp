const minutesInput = document.getElementById('minutesInput');
const secondsInput = document.getElementById('secondsInput');

const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

let initialTotalSeconds = 0;
let currentProgress = 1;
let progress = 1;
let totalSeconds = 0;
let animationFrameId = null;
let isFirstStart = true;
let isFinished = false;
let lastTimestamp = 0;

startBtn.addEventListener('click', () => {
    if (animationFrameId !== null) return;

    let minutes = Number(minutesInput.value);
    if (minutes < 0 || minutes > 60) {
        alert("Minutes must be between 0 and 60");
        return;
    }
    let seconds = Number(secondsInput.value);
    if (seconds < 0 || seconds > 60) {
        alert("Seconds must be between 0 and 60");
        return;
    }

    totalSeconds = minutes * 60 + seconds;
    if (totalSeconds === 0) return;

    if (isFirstStart) {
        initialTotalSeconds = totalSeconds;
        isFirstStart = false;
    }

    isFinished = false;
    progress = totalSeconds / initialTotalSeconds;
    lastTimestamp = 0;
    animationFrameId = requestAnimationFrame(updateTimer);
    drawProgress();
});

function updateTimer(timestamp) {
    if (lastTimestamp === 0) {
        lastTimestamp = timestamp;
    }
    const delta = timestamp - lastTimestamp;
    totalSeconds = totalSeconds - delta / 1000;
    lastTimestamp = timestamp;

    let maxNum = Math.max(totalSeconds, 0);
    let displayMinutes = Math.floor(maxNum / 60);
    let displaySeconds = Math.ceil(maxNum % 60);
    minutesInput.value = displayMinutes.toString().padStart(2, '0');
    secondsInput.value = displaySeconds.toString().padStart(2, '0');
    if (totalSeconds <= 0) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
        currentProgress = 1;
        progress = 1;
        isFinished = true;
        isFirstStart = true;
        drawProgress();
        return;
    }
    progress = totalSeconds / initialTotalSeconds;
    currentProgress = currentProgress + (progress - currentProgress) * 0.1;
    drawProgress();

    animationFrameId = requestAnimationFrame(updateTimer);
}

pauseBtn.addEventListener('click', () => {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
});

resetBtn.addEventListener('click', () => {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
    totalSeconds = 0;
    minutesInput.value = "00";
    secondsInput.value = "00";
    progress = 1;
    currentProgress = 1;
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

function drawProgress() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + currentProgress * Math.PI * 2);
    const hue = 120 - currentProgress * 120;
    if (isFinished) {
        ctx.strokeStyle = "green";
    } else {
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    }
    ctx.shadowColor = "rgba(0, 0, 255, 0.5)";
    ctx.shadowBlur = 10;
    ctx.lineWidth = 5;
    ctx.stroke();
}
drawProgress();