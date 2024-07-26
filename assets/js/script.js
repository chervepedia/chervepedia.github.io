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
});

// Скрипт для обновления эффекта Aero Glass на основе цвета изображения
document.addEventListener('DOMContentLoaded', function() {
    var colorThief = new ColorThief();
    var imageWrappers = document.querySelectorAll('.post-image-wrapper img');

    imageWrappers.forEach(function(image) {
        image.addEventListener('load', function() {
            if (image.complete && image.naturalHeight !== 0) {
                // Получение доминирующего цвета
                var dominantColor = colorThief.getColor(image);
                var color = `rgba(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]}, 0.3)`;
                
                // Применение цвета к фону
                var wrapper = image.closest('.post-image-wrapper');
                if (wrapper) {
                    wrapper.style.setProperty('--dominant-color', color);
                }
            }
        });

        // Если изображение уже загружено, обработать сразу
        if (image.complete) {
            var event = new Event('load');
            image.dispatchEvent(event);
        }
    });
});