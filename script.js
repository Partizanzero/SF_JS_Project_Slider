let images = [
  {
    url: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    title: "Учиться эффективно!",
  },
  {
    url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    title: "1. Чёткая цель",
  },
  {
    url: "https://images.unsplash.com/photo-1564865878688-9a244444042a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZ3JhbW1pbmclMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    title: "2. Продуманный план",
  },
  {
    url: "https://images.unsplash.com/3/doctype-hi-res.jpg?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1730&q=80",
    title: "3. Грамотно подобранные ресурсы",
  },
  {
    url: "https://images.unsplash.com/photo-1632927127855-e44419ebdbfb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGh1Z2dlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    title: "4. Комфортное место для занятий",
  },
  {
    url: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    title: "5. Систематическое повторение изученного",
  },
  {
    url: "https://images.unsplash.com/photo-1556711905-b3f402e1ff80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    title: "Поздравляем!!! Вы сделали это!",
  },
];

function initSlider(options) {
  if (!images || !images.length) return;
  options = options || {
    titles: false,
    dots: true,
    autoplay: false,
  };

   /* ----- 0. ПЕРЕМЕННЫЕ ---- */
  
  let sliderImages = document.querySelector(".slider__images");
  let sliderArrows = document.querySelector(".slider__arrows");
  let sliderDots = document.querySelector(".slider__dots");

  initImages();
  initArrows();

  if (options.dots) {
    initDots();
  }

  if (options.titles) {
    initTitles();
  }
  
  if (options.autoplay) {
    initAutoplay();
  }

     /* ----- 1. ОБРАБОТЧИКИ ---- */
    sliderArrows.addEventListener("mouseover", () => {
    sliderOptions.isPausedAutoplay = true;
  });
  
    sliderArrows.addEventListener("mouseout", () => {
    sliderOptions.isPausedAutoplay = false;
  });

  /* ----- 2. ФУНКЦИИ ---- */

  /* ---- 2.1 Ф-я вывода слайдов в HTML ----- */
  function initImages() {
    images.forEach((image, index) => {
      let imageDiv = `<div class="image n${index} ${
        index === 0 ? "active" : ""
      }" style="background-image: url(${
        images[index].url
      });" data-index="${index}"></div>`;
      //выводим слайд в HTML
      sliderImages.innerHTML += imageDiv;
    });
  }

  /* ---- 2.2 Ф-я управления стрелочками слайдера ----- */
  function initArrows() {
    sliderArrows.querySelectorAll(".slider__arrow").forEach((arrow) => {
      arrow.addEventListener("click", function () {
        let curNumber = +sliderImages.querySelector(".active").dataset.index;
        let nextNumber;
        
        if (arrow.classList.contains("left")) {
          nextNumber = curNumber === 0 ? images.lenght - 1 : curNumber - 1;
        } else {
          nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
        }
        
        moveSlider(nextNumber);
      });
    });
  }

  /* ---- 2.3 Ф-я управления точками слайдера ----- */
  function initDots() {
    images.forEach((image, index) => {
      let dot = `<div class="slider__dots-item n${index} ${
        index === 0 ? "active" : ""
      }" data-index="${index}"></div>`;
      sliderDots.innerHTML += dot;
    });
  }

  /* ---- 2.4 Ф-я переключения слайдов ----- */
  function moveSlider(num) {
    sliderImages.querySelector(".active").classList.remove("active");
    sliderImages.querySelector(".n" + num).classList.add("active");

    if (options.dots) {
      sliderDots.querySelector(".active").classList.remove("active");
      sliderDots.querySelector(".n" + num).classList.add("active");
    }

    if (options.titles) changeTitle(num);
  }

  /* ---- 2.5 Ф-я вывода описаний слайдов ----- */
  function initTitles() {
    let titleDiv = `<div class="slider__images-title">${images[0].title}</div>`;
    sliderImages.innerHTML += cropTitle(titleDiv, 50);
  }

  /* ---- 2.6 Ф-я переключения описаний слайдов ----- */ 
  function changeTitle(num) {
    if (!images[num].title) return;

    let sliderTitle = sliderImages.querySelector(".slider__images-title");
    sliderTitle.innerText = cropTitle(images[num].title, 50);
  }

  /* ---- 2.7 Ф-я обрезания описаний более 50 символов у слайдов ----- */
  function cropTitle(title, size) {
    if (title.length <= size) {
      return title;
    } else {
      return title.substr(0, size) + "...";
    }
  }

  /* ---- 2.8 Ф-я автопроигрывания слайдов ----- */
  function initAutoplay() {
    setInterval(() => {
      if (!sliderOptions.isPausedAutoplay) {
        let curNumber = +sliderImages.querySelector(".active").dataset.index;
        let nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
        moveSlider(nextNumber);
      }
    }, options.autoplayInterval);
  }
}

/* ----- Конец Блока Функций ---- */

/* ---- Опции (настройки) слайдера ----- */
let sliderOptions = {
  dots: true,
  titles: true,
  autoplay: true,
  autoplayInterval: 5000,
  isPausedAutoplay: false, //автопроигрывание включено
};

document.addEventListener("DOMContentLoaded", function () {
  initSlider(sliderOptions);
});
