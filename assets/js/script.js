$(document).ready(function() {
    // Настройки увеличения изображений с Medium Zoom
    mediumZoom('.post-image-wrapper img', {
        background: 'rgba(0, 0, 0, 0.7)'
    });

    // Плавная прокрутка наверх при клике на стрелку
    $('.back-to-top').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
        return false;
    });

    // Показать/скрыть стрелку прокрутки наверх в зависимости от положения прокрутки
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
    });

    // Открытие поста при клике на футер
    $('.post-footer').click(function() {
        var postUrl = $(this).find('.read-more').data('url');
        if (postUrl) {
            window.open(postUrl, '_blank');
        }
    });

    // Предотвращение действий по умолчанию для ссылок внутри футера
    $('.post-footer a').click(function(event) {
        event.stopPropagation(); // Останавливаем событие клика от распространения
    });

    // Показать/скрыть подменю при клике на пункт меню
    $('.menu-link.has-submenu').click(function(e) {
        e.preventDefault(); // Предотвращаем переход по ссылке

        var $submenu = $(this).siblings('.sub-menu');

        if ($submenu.is(':visible')) {
            // Если подменю видно, скрываем его
            $submenu.slideUp(); // Используем slideUp для скрытия
        } else {
            // Если подменю скрыто, показываем его
            $submenu.slideDown(); // Используем slideDown для показа
        }
    });



// Получаем все контейнеры изображений
const imageContainers = document.querySelectorAll('.post-image-wrapper');

imageContainers.forEach(container => {
  const image = container.querySelector('img');

  // Проверяем, загружено ли изображение
  image.onload = () => {
    // Получаем высоту и ширину изображения
    const imageWidth = image.naturalWidth;
    const imageHeight = image.naturalHeight;

    // Получаем высоту и ширину контейнера
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    // Определяем, есть ли незанятое пространство в контейнере
    let blurWidth, blurHeight;
    if (imageWidth < containerWidth) {
      blurWidth = containerWidth - imageWidth;
      blurHeight = 0;
    } else if (imageHeight < containerHeight) {
      blurWidth = 0;
      blurHeight = containerHeight - imageHeight;
    } else {
      blurWidth = 0;
      blurHeight = 0;
    }

    // Если есть незанятое пространство, создаем элемент для размытия
    if (blurWidth > 0 || blurHeight > 0) {
      const blurElement = document.createElement('div');
      blurElement.style.position = 'absolute';
      blurElement.style.top = 0;
      blurElement.style.left = 0;
      blurElement.style.width = `${blurWidth}px`;
      blurElement.style.height = `${blurHeight}px`;
      blurElement.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      blurElement.style.filter = 'blur(50px)';
      blurElement.style.zIndex = -1;

      // Извлекаем цвета из изображения и устанавливаем их для размытия
      const colors = getColorsFromImage(image);
      blurElement.style.backgroundColor = `linear-gradient(to right, ${colors.join(', ')})`;

      container.appendChild(blurElement);
    }
  };
});

// Функция для получения цветов из изображения
function getColorsFromImage(image) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = image.width;
  canvas.height = image.height;
  context.drawImage(image, 0, 0);

  // Получаем данные изображения в виде массива пикселей
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Выбираем несколько случайных цветов из изображения
  const colors = [];
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * data.length / 4);
    const red = data[randomIndex * 4];
    const green = data[randomIndex * 4 + 1];
    const blue = data[randomIndex * 4 + 2];
    colors.push(`rgb(${red}, ${green}, ${blue})`);
  }

  return colors;
}

});
});

    