import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]')
const dataPicker = document.querySelector('#datetime-picker')
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

let intervalId;

let isTimerRunning = false;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    const selectedDate = selectedDates[0];

    if (selectedDate < new Date()) {
      Notiflix.Notify.failure("Please choose a date in the future")
    } else {
      startBtn.disabled = false;

      startBtn.addEventListener("click", () => {

        if (!isTimerRunning) {
          isTimerRunning = true;
          startBtn.disabled = true;
          dataPicker.disabled = true;

          intervalId = setInterval(() => {
            const remainingTime = selectedDate.getTime() - new Date().getTime()

            if (remainingTime <= 0) {
              clearInterval(intervalId)
              Notiflix.Notify.success('Time is up!');
              timerDays.textContent = '00';
              timerHours.textContent = '00';
              timerMinutes.textContent = '00';
              timerSeconds.textContent = '00';
              isTimerRunning = false;
              startBtn.disabled = false;
              dataPicker.disabled = false;
            } else {
              const { days, hours, minutes, seconds } = convertMs(remainingTime)
              updateTimerDisplay(remainingTime);
            }
          }, 1000)
        }
      })
    }
  },
};

flatpickr('#datetime-picker', options)

function convertMs(ms) {
  // Number of milliseconds per unit of time
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


function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimerDisplay(remainingTime) {
  const { days, hours, minutes, seconds } = convertMs(remainingTime);
  timerDays.textContent = addLeadingZero(days);
  timerHours.textContent = addLeadingZero(hours);
  timerMinutes.textContent = addLeadingZero(minutes);
  timerSeconds.textContent = addLeadingZero(seconds);
}