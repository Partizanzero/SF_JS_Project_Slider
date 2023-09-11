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
/* ---- 
Все, что относится к слайдеру реализуем внутри одной функции - (модульный подход) 
options - опции (настройки) слайдера, который будем задавать в отдельном объекте
 ----- */
function initSlider(options) {
  /* ----- 1. ПЕРЕМЕННЫЕ ---- */

  //проверяем пришедший с сервера массив
  //если пришел не массив или пришедший массив пуст (нет длины), то завершаем функцию
  if (!images || !images.length) return;

  //устанавливаем опции
  //если объект с опциями у нас есть в коде, то берем опции оттуда,
  //или берем заданные здесь опции
  options = options || {
    titles: false,
    dots: true,
    autoplay: false,
  };

  //получаем ноды, которые будем использовать
  let sliderImages = document.querySelector(".slider__images");
  let sliderArrows = document.querySelector(".slider__arrows");
  let sliderDots = document.querySelector(".slider__dots");

  //инициализируем ф-ции, которые будем использовать
  initImages();
  initArrows();

  //если в опциях включены точки (options.dots вернет true), то инициализируем ф-ю управления точками
  if (options.dots) {
    initDots();
  }
  //если в опциях включены описания (options.title вернет true), то инициализируем ф-ю вывода описаний
  if (options.titles) {
    initTitles();
  }
  //если в опциях включено автопроигрывание слайдов (options.autoplay вернет true), то инициализируем ф-ю автопроигрывания
  if (options.autoplay) {
    initAutoplay();
  }

  /* ----- 2. ФУНКЦИИ ---- */

  /* ---- 2.1 Ф-я вывода слайдов в HTML ----- */
  function initImages() {
    /* Показ картинок в слайдере реализован через добавление класса "active". 
    Картинка, у которой в данный момент есть этот класс, - показывается в слайдере.
    Остальные картинки - скрыты.
    Т.е. класс "active" будем убирать с одного элемента и ставить на другой.
    */

    /*Формируем классы для картинок:
     - каждому элементу массива (картинке) навешиваем общий класс image,
     - добавляем класс с номером (индексом в массиве) картинки (n1, n2, n3.....).
     - если этот индекс = 0 (первая картинка по умолчанию будет активной), 
     то добавляем картинке класс active, иначе ничего не добавляем.
     Выводим через background-image текущую картинку в HTML, получив у нее св-во url 
    (т.к. у каждой картинке в массиве есть url и title)*/

    //обходим массив с картинками и делаем для каждой картинки отдельный <div> для вывода в HTML
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
    //для каждой стрелки (левой, правой) пишем обработчик клика
    sliderArrows.querySelectorAll(".slider__arrow").forEach((arrow) => {
      arrow.addEventListener("click", function () {
        //определяем, слайд с каким номером сейчас активен
        //активный слайд получаем через наличие класса "active" у элемента
        //номер элемента получаем через data-attribute: data-index="${index} в классе слайда"
        //плюс нужен для того, чтобы преобразовать полученную строку в число = номеру текущего слайда
        let curNumber = +sliderImages.querySelector(".active").dataset.index;

        //следующее изображение, которое мы хотим показать
        let nextNumber;

        //Если стрелка левая
        //текущий слайд первый (index[0]) - переключаемся на последний слайд (images.lenght - 1)
        //текущий слайд не первый - переключаемся на предыдущий слайд (curNumber - 1)
        if (arrow.classList.contains("left")) {
          nextNumber = curNumber === 0 ? images.lenght - 1 : curNumber - 1;
          //Если стрелка правая
          //текущий слайд последний (images.length - 1) - переключаемся на первый слайд (index[0])
          //текущий слайд не последний - переключаемся на следующий слайд (curNumber + 1)
        } else {
          nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
        }

        //Запускаем ф-ю переключения слайдов, передав в нее слайд, который мы должны показать
        moveSlider(nextNumber);
      });
    });
  }

  /* ---- 2.3 Ф-я управления точками слайдера ----- */
  function initDots() {
    //для каждой картинки слайдера создаем точку
    //у активной точки, так же как и у активной картинки будет класс .active
    images.forEach((image, index) => {
      let dot = `<div class="slider__dots-item n${index} ${
        index === 0 ? "active" : ""
      }" data-index="${index}"></div>`;
      //выводим точки в HTML
      sliderDots.innerHTML += dot;
    });
  }

  /* ---- 2.4 Ф-я переключения слайдов 
  (num - номер слайда, который мы должны показать) ----- */
  function moveSlider(num) {
    //у текущего активного слайда удаляем класс .active
    sliderImages.querySelector(".active").classList.remove("active");
    //слайду, который мы должны показать добавляем класс .active
    sliderImages.querySelector(".n" + num).classList.add("active");

    //переключение точек при смене слайда
    //если в опциях включен показ точек на слайде, то у текущей точки убираем класс .active
    //точке на следующем слайде добавляем класс .active
    if (options.dots) {
      sliderDots.querySelector(".active").classList.remove("active");
      sliderDots.querySelector(".n" + num).classList.add("active");
    }

    //переключение описаний при смене слайда,
    //если в опциях включен показ описаний на слайде
    if (options.titles) changeTitle(num);
  }

  /* ---- 2.5 Ф-я вывода описаний слайдов ----- */
  function initTitles() {
    //создаем div, куда будем выводить описание
    let titleDiv = `<div class="slider__images-title">${images[0].title}</div>`;
    //выводим в div описание и обрезаем, если оно больше 50 символов
    sliderImages.innerHTML += cropTitle(titleDiv, 50);
  }

  /* ---- 2.6 Ф-я переключения описаний слайдов 
  (num - номер слайда, который мы должны показать) ----- */
  function changeTitle(num) {
    //если у слайда нет описания - выходим из функции
    if (!images[num].title) return;

    //получаем ноду для вывода описания в HTML
    let sliderTitle = sliderImages.querySelector(".slider__images-title");
    //выводим описание слайда в HTML, обрезавБ если оно больше 50 симв.
    sliderTitle.innerText = cropTitle(images[num].title, 50);
  }

  /* ---- 2.7 Ф-я обрезания описаний более 50 символов у слайдов ----- 
  title - описание, size - максим. кол-во символов у описания*/
  function cropTitle(title, size) {
    //если длина описания менее указанной, вернем описание как есть
    if (title.length <= size) {
      return title;
      //иначе обрезаем описание до нужного кол-ва символов (substr - вернет подстроку с нужным кол-вом символов)
    } else {
      return title.substr(0, size) + "...";
    }
  }

  /* ---- 2.8 Ф-я автопроигрывания слайдов ----- */
  function initAutoplay() {
    //устанавливаем интервал запуска для следующего слайда
    //кол-во секунд берем из опций (autoplayInterval)
    setInterval(() => {
      //если автопроигрывание включено - автопроигрываем слайды:

      //получаем номер текущего слайда
      let curNumber = +sliderImages.querySelector(".active").dataset.index;
      //получаем номер следующего слайда
      //если текущий слайд последний (image.length - 1) - следующий будет первый (индекс= 0)
      //иначе следующий слайд будет с номером (текущий+1)
      let nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
      //запускаем ф-ю переключения слайдов, передав в параметр номер слайда, который мы должны показать
      moveSlider(nextNumber);
    }, options.autoplayInterval);
  }
}

/* ----- Конец Блока Функций ---- */

/* ---- Опции (настройки) слайдера
Точки, Описания и Автопроигрывание по умолчанию включены (true),
Интервал смены слайда при автопроигрывании = 5 сек. ----- */
let sliderOptions = {
  dots: true,
  titles: true,
  autoplay: true,
  autoplayInterval: 5000,
};

/* ---- Ф-я инициализации слайдера 
инициализируем ф-ю после полной постройки DOM-дерева ----- */
document.addEventListener("DOMContentLoaded", function () {
  initSlider(sliderOptions);
});
