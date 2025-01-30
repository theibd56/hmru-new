import { Fancybox } from "@fancyapps/ui";
import Swiper from 'swiper/bundle';
import { Mask, MaskInput } from "maska"

import './sass/_app.scss';
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import 'swiper/css/bundle';

Fancybox.bind("[data-fancybox]", {})

new MaskInput("[data-maska]") // for masked input

//toggle catalog
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('show-catalog')?.addEventListener('click', () => {
        const jalousie = document.querySelector('.jalousie');
        if (window.innerWidth > 992) {
            jalousie?.classList.toggle('active');
        } else {
            jalousie?.classList.remove('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('show-catalog')?.addEventListener('click', () => {
        const basket = document.querySelector('.basket');
        const cross = document.querySelector('.cross');
        const body = document.body;

        document.getElementById('show-catalog').classList.toggle('is_active');
        basket.classList.toggle('hide');
        cross.classList.toggle('hide');
        document.querySelector('.burger-menu').classList.remove('active');
        document.querySelector('.header__burger').classList.remove('is-active');
        document.querySelector('.catalog-menu').classList.toggle('active');

        body.classList.toggle('locked', basket.classList.contains('hide') || cross.classList.contains('hide'));
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const firstListItem = document.querySelector('.catalog-menu__list_item');
    const firstInnerItem = document.querySelector('.catalog-menu__inner_item');
    if (firstListItem) firstListItem.classList.add('active');
    if (firstInnerItem) firstInnerItem.classList.add('active');

    document.addEventListener('click', (e) => {
        const listItem = e.target.closest('.catalog-menu__list_item');
        if (listItem) {
            if (window.innerWidth < 992) {
                listItem.classList.toggle('opened');
                const subMenu = listItem.querySelector('.catalog-sub-menu');
                if (subMenu) subMenu.style.display = subMenu.style.display === 'block' ? 'none' : 'block';
            } else {
                document.querySelectorAll('.catalog-menu__list_item').forEach(item => item.classList.remove('active'));
                document.querySelectorAll('.catalog-menu__inner_item').forEach(item => item.classList.remove('active'));
                listItem.classList.add('active');
                const innerItem = document.querySelector(`.catalog-menu__inner_item[data-tab="${listItem.dataset.tab}"]`);
                if (innerItem) innerItem.classList.add('active');
            }
        }
    });
});

//burger
document.addEventListener('DOMContentLoaded', () => {
    const toggleClass = (elem, cls) => elem.classList.toggle(cls);

    [document.getElementById('mobile-burger'), document.querySelector('.burger-menu__close')].forEach(btn => {
        btn?.addEventListener('click', () => {
            toggleClass(btn, 'is-active');
            toggleClass(document.querySelector('.burger-menu'), 'active');
            toggleClass(document.documentElement, 'lock');
        });
    });

    document.querySelectorAll('.burger-menu__menu_trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            toggleClass(trigger.parentElement, 'is-active');
            const submenu = trigger.nextElementSibling;
            submenu && (submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block');
        });
    });
});

//search bar
document.addEventListener('click', (event) => {
    if (event.target.closest('.header__search_trigger, .main_search_block_in .close')) {
        const searchPopup = document.getElementById('search-popup');
        searchPopup.classList.toggle('show');
        document.body.classList.toggle('lock', searchPopup.classList.contains('show'));
        document.querySelector('.header__burger')?.classList.remove('is-active');
        document.querySelector('.burger-menu')?.classList.remove('active');
    }
});

//footer submenu
document.addEventListener('DOMContentLoaded', () => {
    ['footer__catalog', 'footer__menu'].forEach((name) => {
        const trigger = document.querySelector(`.${name}_trigger`);
        const subMenu = document.querySelector(`.${name}_sub`);
        trigger?.addEventListener('click', () => {
            trigger.classList.toggle('active');
            subMenu.classList.toggle('active');
        });
    });
});

//main padding
document.addEventListener('DOMContentLoaded', () => {
    const adjustPadding = () => {
        document.querySelector('main').style.paddingTop = `${document.querySelector('header').offsetHeight + 30}px`;
    };
    adjustPadding();
    window.addEventListener('resize', adjustPadding);
});

//click jalousie and close catalog dropdown
document.addEventListener('click', (e) => {
    if (e.target.className === 'jalousie active') {
        document.querySelectorAll('.jalousie').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.catalog-menu').forEach(el => el.classList.remove('active'));

        const cross = document.querySelector('#show-catalog .cross');
        const basket = document.querySelector('#show-catalog .basket');

        if (cross) cross.classList.toggle('hide');
        if (basket) basket.classList.toggle('hide');
    }
});

//sliders
document.addEventListener('DOMContentLoaded', () => {
    const popularSlider = new Swiper('.catalog-popular__container', {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: true,
        breakpoints: {
            300: {
                slidesPerView: 2.25,
            },
            576: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 4,
            },
        },
    })

    const promoAdvantagesSlider = new Swiper('.promo-advantages__slider .swiper', {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: false,
        speed: 800,
        navigation: {
            nextEl: '.promo-advantages__next',
            prevEl: '.promo-advantages__prev',
        },
        pagination: {
            el: '.promo-advantages__slider .swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        breakpoints: {
            992: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2.2,
                spaceBetween: 20,
            },
            576: {
                slidesPerView: 1.8,
                spaceBetween: 10,
            },
            320: {
                slidesPerView: 1.2,
                spaceBetween: 10,
            }
        }
    });
});