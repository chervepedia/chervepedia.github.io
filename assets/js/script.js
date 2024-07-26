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



document.addEventListener("DOMContentLoaded", function() {
    function getAverageColor(imageUrl, callback) {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = imageUrl;

        img.onload = function() {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);
            const frame = context.getImageData(0, 0, canvas.width, canvas.height);
            let r = 0, g = 0, b = 0;
            for (let i = 0; i < frame.data.length; i += 4) {
                r += frame.data[i];
                g += frame.data[i + 1];
                b += frame.data[i + 2];
            }
            r = Math.floor(r / (frame.data.length / 4));
            g = Math.floor(g / (frame.data.length / 4));
            b = Math.floor(b / (frame.data.length / 4));
            callback(`rgb(${r},${g},${b})`);
        };
    }

    const postImage = document.querySelector('.post-image-wrapper img');
    if (postImage) {
        const imageUrl = postImage.src;
        getAverageColor(imageUrl, function(color) {
            const wrapper = document.querySelector('.post-image-wrapper');
            wrapper.style.background = color;
        });
    }
});

});


    