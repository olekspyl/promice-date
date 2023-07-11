import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputEl = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

btnStart.setAttribute('disabled', 'disabled');
let selectedDate;
let currentDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();
    currentDate = options.defaultDate.getTime();
    if (selectedDate > currentDate) {
      btnStart.removeAttribute('disabled');
      return selectedDate;
    } else {
      window.alert('Please choose a date in the future');
    }
  },
};

const endDate = flatpickr(inputEl, options);

btnStart.addEventListener('click', onBtnStartClick);

function onBtnStartClick() {
  const convertedMs = convertMs(selectedDate - currentDate);
  timerId = setInterval(() => {
    days.textContent = addLeadingZero(convertedMs.days, 3, '00');
    hours.textContent = addLeadingZero(convertedMs.hours, 2, '0');
    minutes.textContent = addLeadingZero(convertedMs.minutes, 2, '0');
    seconds.textContent = addLeadingZero(convertedMs.seconds, 2, '0');
  }, 1000);
}

function addLeadingZero(value, targetLength, padString) {
  return value.toString().padStart(targetLength, padString);
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
