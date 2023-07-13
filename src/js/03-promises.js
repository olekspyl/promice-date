import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  inputDelay: document.querySelector('input[name="delay"]'),
  inputStep: document.querySelector('input[name="step"]'),
  inputAmount: document.querySelector('input[name="amount"]'),
  formEl: document.querySelector('.form'),
};

refs.formEl.addEventListener('submit', onFormElSubmit);

let promiseStep;
let promiseDelay;
let promiseAmount;

function onFormElSubmit(e) {
  e.preventDefault();
  const { delay, amount, step } = e.currentTarget.elements;
  promiseStep = step.valueAsNumber;
  promiseDelay = delay.valueAsNumber;
  promiseAmount = amount.valueAsNumber;

  for (let i = 1; i <= promiseAmount; i += 1) {
    if (!promiseDelay) {
      promiseStep += promiseStep;
    }
    promiseDelay += promiseStep;

    createPromise(i, promiseDelay)
      .then(({ position, step }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${step}ms`);
      })
      .catch(({ position, step }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${step}ms`);
      });
  }

  refs.formEl.removeEventListener('submit', onFormElSubmit);
  refs.formEl.reset();
}

function createPromise(position, step) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, step });
      } else {
        reject({ position, step });
      }
    }, position * step);
  });
}
