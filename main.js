import { Fancybox } from "@fancyapps/ui";
import Swiper from 'swiper/bundle';
import { Mask, MaskInput } from "maska"

import './sass/_app.scss';
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import 'swiper/css/bundle';

Fancybox.bind("[data-fancybox]", {})

new MaskInput("[data-maska]") // for masked input

//toggle catalog
$(function() {
    $('#show-catalog').on('click', () => {
        if (window.innerWidth > 992) {
            $('.jalousie').toggleClass('active')
        } else {
            $('.jalousie').removeClass('active')
        }
    })
})

$(document).on('click', '#show-catalog', function () {
    $(this).toggleClass('is_active')
    $('.basket').toggleClass('hide')
    $('.cross').toggleClass('hide')
    $('.burger-menu').removeClass('active');
    $('.header__burger').removeClass('is-active');
    $('.catalog-menu').toggleClass('active')

    if ($('.basket').hasClass('hide')) {
        $('body').addClass('locked')
    } else if ($('.cross').hasClass('hide')) {
        $('body').removeClass('locked')
    }
})

$('.catalog-menu__list_item:first-child').addClass('active')
$('.catalog-menu__inner_item:first-child').addClass('active')
$(document).on('click', '.catalog-menu__list_item', function () {
    if (window.innerWidth < 992) {
        $(this).toggleClass('opened')
        $(this).find('.catalog-sub-menu').slideToggle()
    } else {
        $('.catalog-menu__list_item').removeClass('active');
        $('.catalog-menu__inner_item').removeClass('active');
        $(this).addClass('active');
        $(`.catalog-menu__inner_item[data-tab="${this.dataset.tab}"]`).addClass('active');
    }
})

//burger
$(function() {
    $('#mobile-burger, .burger-menu__close').click(function (event) {
        $(this).toggleClass('is-active')
        $('.burger-menu').toggleClass('active');
        $('html').toggleClass('lock')
    });

    $('.burger-menu__menu_trigger').on('click', function() {
        $('.burger-menu__menu_trigger').parent().toggleClass('is-active')
        $('.burger-menu__menu_sub').slideToggle(100)
    })
})

//search bar
$(document).on('click', '.header__search_trigger, .main_search_block_in .close', function () {
    $('#search-popup').toggleClass('show')
    $('.header__burger ').removeClass('is-active')
    $('.burger-menu').removeClass('active')

    if ($('#search-popup').hasClass('show')) {
        $('body').addClass('lock')
    } else {
        $('body').removeClass('lock')
    }
})

//footer submenu
$(function() {
    $('.footer__catalog_trigger').on('click', function() {
      $(this).toggleClass('active')
      $('.footer__catalog_sub').slideToggle(50)
    })

    $('.footer__menu_trigger').on('click', function() {
        $(this).toggleClass('active')
        $('.footer__menu_sub').slideToggle(50)
    })
})

//main padding
$(function () {
    $('main').css('padding-top', `${$('header').height() + 30}px`)
    $(window).resize(function () {
        $('main').css('padding-top', `${$('header').height() + 30}px`)
    })
})

//click jalousie and close catalog dropdown
$(document).on('click', function(e) {
    if(e.target.className == "jalousie active") {
        $('.jalousie').removeClass('active')
        $('.catalog-menu').removeClass('active')
        $('#show-catalog .cross').toggleClass('hide')
        $('#show-catalog .basket').toggleClass('hide')
    }
})

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

document.addEventListener('DOMContentLoaded', () => {
    const promoAdvantagesSlider = new Swiper('.promo-advantages__slider .swiper', {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: false,
        speed: 800,
        navigation: {
            nextEl: '.promo-advantages__next',
            prevEl: '.promo-advantages__prev',
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
    });
});