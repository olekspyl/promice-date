const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

btnStart.addEventListener('click', onBtnStartClick);
btnStop.addEventListener('click', onBtnStopClick);

let intervalId;
function onBtnStartClick() {
  intervalId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
    btnStart.setAttribute('disabled', 'disabled');
  }, 1000);
}

function onBtnStopClick() {
  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
