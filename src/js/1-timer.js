import flatpickr from "flatpickr";
import iziToast from "izitoast";
import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";

     const datetimePicker = document.getElementById('datetime-picker');
      const startButton = document.querySelector('[data-start]');
      const daysValue = document.querySelector('[data-days]');
      const hoursValue = document.querySelector('[data-hours]');
      const minutesValue = document.querySelector('[data-minutes]');
      const secondsValue = document.querySelector('[data-seconds]');
      
      let userSelectedDate;
      let timerInterval;
      startButton.disabled = true;
      
      const options = {
        enableTime: true,
        time_24hr: true,
        defaultDate: new Date(),
        minuteIncrement: 1,
        onClose(selectedDates) {
          userSelectedDate = selectedDates[0];
          if (userSelectedDate < new Date()) {
            iziToast.error({
              title: 'Error',
              titleSize: 16,
              message: 'Please choose a date in the future',
              messageSize: 16,
              timeout: 3000, 
              position: 'topRight', 
              backgroundColor: '#EF4040', 
              titleColor: '#fff', 
              messageColor: '#fff',
              close: false,
              maxWidth: 302,
            })
          } else {
            startButton.disabled = false;
          }
        },
      };
      
      flatpickr(datetimePicker, options);
      
      function addLeadingZero(value) {
        return value.toString().padStart(2, '0');
      }
      
      function updateTimer() {
        const currentTime = new Date();
        const timeDifference = userSelectedDate - currentTime;
      
        if (timeDifference <= 0) {
          clearInterval(timerInterval);
          daysValue.textContent = '00';
          hoursValue.textContent = '00';
          minutesValue.textContent = '00';
          secondsValue.textContent = '00';
          startButton.disabled = false;
        } else {
          const { days, hours, minutes, seconds } = convertMs(timeDifference);
          daysValue.textContent = addLeadingZero(days);
          hoursValue.textContent = addLeadingZero(hours);
          minutesValue.textContent = addLeadingZero(minutes);
          secondsValue.textContent = addLeadingZero(seconds);
        }
      }
      
      startButton.addEventListener('click', () => {
        startButton.disabled = true;
        timerInterval = setInterval(updateTimer, 1000);
        updateTimer();
      });
      
      function convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
      
        const days = Math.floor(ms / day);
        const hours = Math.floor((ms % day) / hour);
        const minutes = Math.floor(((ms % day) % hour) / minute);
        const seconds = Math.floor((((ms % day) % hour) % minute) / second);
      
        return { days, hours, minutes, seconds };
      }