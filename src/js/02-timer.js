import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

const inputEl = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

btnStart.setAttribute('disabled', 'disabled');
btnStart.addEventListener('click', onBtnStartClick);

let selectedDate;
let currentDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    timerId = setInterval(() => {
      selectedDate = selectedDates[0].getTime();
      currentDate = new Date().getTime();
    }, 1000);

    setTimeout(() => {
      if (selectedDate > currentDate) {
        btnStart.removeAttribute('disabled');
        return selectedDate;
      } else {
        // window.alert('Please choose a date in the future');
        Notify.failure('Please choose a date in the future');
        btnStart.setAttribute('disabled', 'disabled');
      }
    }, 1000);
  },
};

flatpickr(inputEl, options);

function onBtnStartClick() {
  timerId = setInterval(() => {
    const convertedMs = convertMs(selectedDate - currentDate);
    days.textContent = addLeadingZero(convertedMs.days, 3, '00');
    hours.textContent = addLeadingZero(convertedMs.hours, 2, '0');
    minutes.textContent = addLeadingZero(convertedMs.minutes, 2, '0');
    seconds.textContent = addLeadingZero(convertedMs.seconds, 2, '0');

    timerClose(
      Number(days.textContent),
      Number(hours.textContent),
      Number(minutes.textContent),
      Number(seconds.textContent)
    );
  }, 1000);
}

function addLeadingZero(value, targetLength, padString) {
  return value.toString().padStart(targetLength, padString);
}

function timerClose(days, hours, minutes, seconds) {
  if (!(days + hours + minutes + seconds)) {
    clearInterval(timerId);
  }
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
