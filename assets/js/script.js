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

    // Открытие поста при клике на "читать далее"
    $('.post-footer .read-more').click(function() {
        var postUrl = $(this).data('url');
        window.open(postUrl, '_blank');
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





$(document).ready(function() {
    const img = $('.post-image-wrapper img');
    const wrapper = img.parent();

    img.on('load', function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img[0].naturalWidth;
        canvas.height = img[0].naturalHeight;
        ctx.drawImage(img[0], 0, 0);

        // Получаем данные пикселей
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const averageColor = getAverageColor(imageData.data);

        // Устанавливаем цвет фона для блюра
        const blurColor = `rgba(${averageColor.r}, ${averageColor.g}, ${averageColor.b}, 0.5)`;
        wrapper.css('--blur-color', blurColor);
    });

    function getAverageColor(data) {
        let r = 0, g = 0, b = 0, count = 0;
        for (let i = 0; i < data.length; i += 4) {
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
            count++;
        }
        return {
            r: Math.floor(r / count),
            g: Math.floor(g / count),
            b: Math.floor(b / count)
        };
    }
});