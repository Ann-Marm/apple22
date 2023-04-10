/* SLIDER */

import Swiper from '../lib/swiper-bundle.esm.browser.min.js';
//console.log(Swiper);

// подключаем слайдер
new Swiper('.goods__block', {
    // 1 слайд с расстоянием 20px - это отображено в макете
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
        320: {
            slidesPerView: 1,    
        },

        // 2 слайда с расстоянием 20px - это отображено в макете
        768: {
        slidesPerView: 2,
        },

        // 2 слайда с расстоянием 24px - это отображено в макете
        1024: {
        slidesPerView: 2,
        spaceBetween: 24,
        },
        1440: {
        slidesPerView: 3,
        // нужно продублировать - старое 24 работать не будет
        spaceBetween: 24,
        },
    },
    navigation: {
        prevEl: '.goods__arrow_prev',
        nextEl: '.goods__arrow_next' 
    },

    /* у Свайпера бывает глюк - прокрутка срабатывает при нажатии на кнопки блока, не только на стрелочки 
    следующие две строчки это предотвращают
    в a11y - это не две буквы ll - это 11 - единицы */ 
    preventClicks: true,
    a11y: false,
});

/* SLIDER end*/



/* SIMPLEBAR  - Custom scrollbars */

/* тут же получаем элемент и передаем */
new SimpleBar(document.querySelector('.country__list'), {
  /* прописываем свои классы, чтобы стиллизовать скролл */
  classNames: {
  scrollbar: 'country__scrollbar',
  track: 'country__track'
  }
})

/* SIMPLEBAR end*/



 /* SCROLL  */
/* этот вариант работает */
/*
const smothScroll = (trigger) => {
    const SPEED = 0.3;
    const scrolled = e => {
      e.preventDefault();
      const target = e.target;
  
      if (target.matches('[href^="#"]')) {
        let start = 0;
        const pageY = window.pageYOffset;
        const hash = target.getAttribute('href');
  
        if (hash === '#') return;
  
        const elem = document.querySelector(hash);
        const coordinateElem = elem.getBoundingClientRect().top;
        const allDistance = pageY + coordinateElem;
        const scroll = time => {
          if (!start) start = time;
          const progress = time - start;
          const r = (coordinateElem < 0 ?
            Math.max(pageY - progress / SPEED, allDistance) :
            Math.min(pageY + progress / SPEED, allDistance));
  
          window.scrollTo(0, r);
  
          const scrolling = coordinateElem < 0 ?
            r > allDistance :
            r < allDistance;
          if (scrolling) requestAnimationFrame(scroll);
        }
        requestAnimationFrame(scroll)
      }
    }
    trigger.addEventListener('click', scrolled);
  }
  smothScroll(document.querySelector('.header__navigation'))
  smothScroll(document.querySelector('.footer__navigation'))
*/


  /* этот короче работает в Safari только с 16 версии, так же как gap у flex */

  const smothScroll = (trigger) => {
    const SPEED = 0.3;
    const scrolled = e => {
      e.preventDefault();
      const target = e.target;
  
      if (target.matches('[href^="#"]')) {
        let start = 0;
        const pageY = window.pageYOffset;
        const hash = target.getAttribute('href');
  
        if (hash === '#') return;
  
        const elem = document.querySelector(hash);
        elem.scrollIntoView({
            behavior: 'smooth'
        });
      }
    }
    trigger.addEventListener('click', scrolled);
  };
  smothScroll(document.querySelector('.header__navigation'));
  smothScroll(document.querySelector('.footer__navigation'));

  /* SCROLL end */

  /*  MODAL */

  const productMore = document.querySelectorAll('.product__more');
  // console.log(productMore);

  const modal = document.querySelector('.modal');
 // console.log(modal);
  
productMore.forEach((btn) => {
   // console.log(btn);
  btn.addEventListener('click', () => {
  //  console.log(btn);
  modal.classList.add('modal_open')
  })
});

modal.addEventListener('click', (event) => {
   // console.log(event.target);
  if (event.target === modal) {
    modal.classList.remove('modal_open')
  }
  });

const formPlaceholder = document.querySelectorAll('.form__placeholder');
const formInput = document.querySelectorAll('.form__input');

formInput.forEach((input, i) => {

  input.addEventListener('focus', () => {
    formPlaceholder[i].classList.add('form__placeholder_active')
  })

  input.addEventListener('blur', () => {
    if (input.value === '') {
    formPlaceholder[i].classList.remove('form__placeholder_active')
    }   
  })

})

 /*  MODAL end */





   /* CURRENCY (PRICE) */

  const dataCurrency = {};

  const formatCurrency = (value, currency) => {
    return new Intl.NumberFormat('EU', {
     style: 'currency',
     currency,
     maximumFractionDigits: 2,
    }).format(value)
  }

  /* по умолчанию USD*/
  const showPrice = (currency = 'USD') => {
    const priceElems = document.querySelectorAll('[data-price]');
    
    priceElems.forEach(elem => {
      elem.textContent = formatCurrency(elem.dataset.price * dataCurrency[currency], currency);
    })
  }
   
 // showPrice();

  /* с сайта котировки валют скрипт, но переделанное */

  const myHeaders = new Headers();
myHeaders.append("apikey", "36xPzZYLB3Dd8bwRnXUlEU3rXoqFpqG5");

const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

fetch("https://api.apilayer.com/fixer/latest?base=USD", requestOptions)
  .then(response => response.json())
  .then(result => {
    //console.log('result', result);
    Object.assign(dataCurrency, result.rates)
    //console.log('dataCurrency', dataCurrency);
    showPrice();
  })
  .catch(error => console.log('error', error));
     /* CURRENCY (PRICE) end  */



       /*  COUNTRY CHOISE end */

  const countryBtn = document.querySelector('.country__btn');
  const countryWrapper = document.querySelector('.country__wrapper');
  
  countryBtn.addEventListener('click', () => {
    countryWrapper.classList.toggle('country__wrapper_open')
  });

// эффект такой же как с target делали выше
  countryWrapper.addEventListener('click', ({target}) => {
    if (target.classList.contains('country__choise')) {
      countryWrapper.classList.remove('country__wrapper_open')
      showPrice(target.dataset.currency);
    }
  });

   /*  CHOISE end */


/* TIMER */
/* будем высчитывать время в миллисекундах от new Date - это 01.01.1970 г. 
используется на всех языках программирования 
можно посмотреть дату в console - new Date(0) и new Date() */

/* Склонение числительных */
const declOfNum = (n, titles) => titles[n % 10 === 1 && n % 100 !== 11 ?
  0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];


const timer = deadline => {

const unitDay = document.querySelector('.timer__unit_day');
const unitHour = document.querySelector('.timer__unit_hour');
const unitMin = document.querySelector('.timer__unit_min'); 
const descriptionDay = document.querySelector('.timer__unit-description_day');
const descriptionHour = document.querySelector('.timer__unit-description_hour');
const descriptionMin = document.querySelector('.timer__unit-description_min');             

  const getTimeRemaning = () => {
    const dateStop = new Date(deadline).getTime();
   // console.log('dateStop: ', dateStop);
    const dateNow = Date.now();
  //  console.log('dateNow: ', dateNow);
  const timeRemaning = dateStop - dateNow;

  // const ms = timeRemaning;
  // console.log('ms: ', ms);

  /* получаем секунды из миллисекунд % - остаток от деления*/
 // const s = timeRemaning / 1000 % 60;
 // console.log('s: ', s);

  /* получаем минуты из  миллисекунд */
  /* округляем в меньшую сторону Math.floor */
  const minutes = Math.floor(timeRemaning / 1000 / 60 % 60);
  // console.log('minutes: ', minutes);

 /* часы */
  const hours = Math.floor(timeRemaning / 1000 / 60 / 60 % 24);
  // console.log('hours: ', hours);

  /* дни */
  /* счетчик меньше, чем на год, 
  поэтому так не нужно  const d = timeRemaning / 1000 / 60 / 60 / 24 % 365; */
  const days = Math.floor(timeRemaning / 1000 / 60 / 60 / 24);
  // console.log('days: ', days);

  return {timeRemaning, minutes, hours, days};
  };

  const start = () => {
    const timer = getTimeRemaning();
   // console.log('timer: ', timer);

    unitDay.textContent = timer.days;
    unitHour.textContent = timer.hours;
    unitMin.textContent = timer.minutes;
    descriptionDay.textContent = declOfNum(timer.days, ['день', 'дня', 'дней']); 
    descriptionHour.textContent = declOfNum(timer.hours, ['час', 'часа', 'часов']); 
    descriptionMin.textContent = declOfNum(timer.minutes, ['минута', 'минуты', 'минут']); 

    const timerId = setTimeout(start, 60000);

    if (timer.timeRemaning < 0) {
    clearTimeout(timerId)
    unitDay.textContent = '0';
    unitHour.textContent = '0';
    unitMin.textContent = '0';
    }

  }

  start();
 // getTimeRemaning();
}

timer('2023/09/22 20:00');
/* TIMER end */
