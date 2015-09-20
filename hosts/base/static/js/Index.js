/**
 * Модуль инициализации главной стр.
 *
 * @module      Index
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
        },
        scrollspy: {
            deps    : ['jquery']
        }
    }
});

require([
    'jquery',
    'scrollspy',
    'View/Menu',
    'View/Signup',
    'View/Loader'
], function ($, Scrollspy,  MenuView, SignupView, LoaderView) {

    // Маршруты
    function Spy(anchor) {
        var offsetTop = 0;
        if (anchor) {
            offsetTop = $('h1[anchorId=' + anchor + ']').offset().top - 110 + 1;
        }

        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 1000);
    }

    $(function () {
        var router  = new Backbone.Router(),
            signup  = new SignupView({obj: $('.b-section:first')}),
            menu    = new MenuView({el: $('.b-menu')}),
            loader  = new LoaderView({obj: $('body')});

        menu.render();
        signup.render();
        loader.render();

        $('h1').on('scrollSpy:enter', function () {
            $('.b-nav__flow').removeClass('b-nav__flow_active');
            $('a[href="/#' + $(this).attr('anchorId') + '"]').addClass('b-nav__flow_active');
            if ($(this).attr('anchorId') === 'index') {
                $('.j-nav__item__signup').addClass('b-nav__item_hidden');
            } else {
                $('.j-nav__item__signup').removeClass('b-nav__item_hidden');
            }
        });

        // $('h1').on('scrollSpy:exit', function () {
        //     console.log(this);
        // });

        $('h1').scrollSpy({
            offsetTop: 110,
            offsetBottom: 200 - $(window).height()
        });

        // Маршрутизация
        router.route('(:modelId)', 'spy', Spy);

        Backbone.history.start();

    });
});