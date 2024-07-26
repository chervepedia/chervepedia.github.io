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


document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.post-image-wrapper');
    
    // Создаем новый элемент изображения
    const img = new Image();
    img.src = 'path/to/image.jpg'; // Замените на путь к вашему изображению
    img.alt = 'Post Image';
    
    img.onload = () => {
        // Добавляем изображение в контейнер
        wrapper.appendChild(img);
        
        // Функция для получения среднего цвета изображения
        function getAverageColor(image) {
            return new Promise((resolve, reject) => {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
    
                canvas.width = image.naturalWidth;
                canvas.height = image.naturalHeight;
                context.drawImage(image, 0, 0);
    
                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;
                let r = 0, g = 0, b = 0;
    
                for (let i = 0; i < data.length; i += 4) {
                    r += data[i];
                    g += data[i + 1];
                    b += data[i + 2];
                }
    
                r = Math.floor(r / (data.length / 4));
                g = Math.floor(g / (data.length / 4));
                b = Math.floor(b / (data.length / 4));
    
                resolve(`rgb(${r}, ${g}, ${b})`);
            });
        }
    
        // Устанавливаем цвет фона после загрузки изображения
        getAverageColor(img).then(color => {
            wrapper.style.setProperty('--blur-color', color);
        });
    };

    // обработчик ошибок
    img.onerror = () => {
        console.error('Ошибка загрузки изображения');
    };
});
});


    