import Notiflix from "notiflix";

document.addEventListener('DOMContentLoaded', function () {
  const promiseForm = document.querySelector('.form');

  promiseForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const firstDelay = parseInt(this.elements.delay.value);
    const step = parseInt(this.elements.step.value);
    const amount = parseInt(this.elements.amount.value);

    for (let i = 0; i < amount; i++) {
      const currentDelay = firstDelay + i * step;

      createPromise(i + 1, currentDelay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }
  });

  function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const shouldResolve = Math.random() > 0.3;
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
    });
  }
});