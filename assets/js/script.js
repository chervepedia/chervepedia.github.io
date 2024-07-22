document.addEventListener('DOMContentLoaded', function() {
    function applyTwallpaper() {
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
            if (typeof twallpaper !== 'undefined') {
                twallpaper.init(options);
            } else {
                console.error('twallpaper не загружен');
            }
        }
    }

    // Применяем фон сразу после загрузки
    applyTwallpaper();

    // Также добавляем обработчик событий на изменение размера окна
    window.addEventListener('resize', applyTwallpaper);

    // Плавная прокрутка наверх при клике на стрелку
    document.querySelector('.back-to-top').addEventListener('click', function() {
        document.documentElement.scrollTop = 0;
        return false;
    });

    // Показать/скрыть стрелку прокрутки наверх в зависимости от положения прокрутки
    window.addEventListener('scroll', function() {
        const backToTop = document.querySelector('.back-to-top');
        if (window.scrollY > 100) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });

    // Открытие поста при клике на "читать далее"
    document.querySelectorAll('.post-footer .read-more').forEach(function(element) {
        element.addEventListener('click', function() {
            var postUrl = this.getAttribute('data-url');
            window.open(postUrl, '_blank');
        });
    });

    // Показать/скрыть подменю при клике на пункт меню
    document.querySelectorAll('.menu-link.has-submenu').forEach(function(element) {
        element.addEventListener('click', function(e) {
            e.preventDefault(); // Предотвращаем переход по ссылке

            var submenu = this.nextElementSibling;
            if (submenu.style.display === 'block') {
                submenu.style.display = 'none';
            } else {
                submenu.style.display = 'block';
            }
        });
    });
});