//бекграунд
document.addEventListener('DOMContentLoaded', function() {
    function applyTwallpaper() {
        // Проверьте ширину экрана
        if (window.matchMedia("(max-width: 767px)").matches) {
            const options = {
                fps: 60,
                tails: 90,
                animate: true,
                scrollAnimate: true,
                colors: [
                    "#ffb0e2",
                    "#ffb0e2",
                    "#df36a1",
                    "#560739"
                ],
                pattern: {
                    image: "https://twallpaper.js.org/patterns/space.svg",
                    background: "#000",
                    blur: 0,
                    size: "420px",
                    opacity: 0.5,
                    mask: true
                }
            };

            // Инициализация twallpaper с указанными опциями
            twallpaper.init(options);
        }
    }

    // Применяем фон сразу после загрузки
    applyTwallpaper();

    // Также добавляем обработчик событий на изменение размера окна
    window.addEventListener('resize', applyTwallpaper);
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
