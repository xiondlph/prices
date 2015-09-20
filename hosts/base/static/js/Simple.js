/**
 * Модуль инициализации текстовой стр.
 *
 * @module      Simple
 * @category    Client side
 * @main        Prices monitoring service
 * @author      Ismax <admin@ismax.ru>
 */

require.config({
    baseUrl: 'js',
    paths: {
        text        : '../lib/requirejs/text',
        jquery      : '../lib/jquery/jquery-2.1.1.min',
        validator   : '../lib/validator.min',
        scrollspy   : '../lib/scrollspy',
        underscore  : '../lib/underscore/underscore-min',
        backbone    : '../lib/backbone/backbone-min',

        Templates   : '../Templates'
    },

    shim: {
        'backbone': {
            deps    : ['underscore', 'jquery'],
            exports : 'Backbone'
        }
    }
});

require([
    'jquery',
    'scrollspy',
    'View/Menu'
], function ($, Scrollspy, MenuView) {

    // Маршруты
    function Spy(anchor) {
        anchor = anchor || 'about';
        var offsetTop = $('h1[anchorId=' + anchor + ']').offset().top - 110 + 1;

        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 1000);
    }

    $(function () {
        var router      = new Backbone.Router(),
            menu        = new MenuView({el: $('.b-menu')});

        menu.render();

        // Маршрутизация
        router.route('(:modelId)', 'spy', Spy);

        Backbone.history.start();
    });

    $('h1').on('scrollSpy:enter', function () {
        $('.b-nav__flow').removeClass('b-nav__flow_active');
        $('a[href="/about#' + $(this).attr('anchorId') + '"]').addClass('b-nav__flow_active');
    });

    // $('h1').on('scrollSpy:exit', function () {

    // });

    $('h1').scrollSpy({
        offsetTop: 110,
        offsetBottom: 200 - $(window).height()
    });
});