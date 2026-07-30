const minutesInput = document.getElementById('minutesInput');
const secondsInput = document.getElementById('secondsInput');

const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

let totalSeconds = 0;

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
    totalSeconds = minutes * 60 + seconds
    console.log(totalSeconds);
});