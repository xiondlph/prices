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

    $(function () {
        var signup  = new SignupView({obj: $('.b-section:first')}),
            menu    = new MenuView({el: $('.b-menu')}),
            loader  = new LoaderView({obj: $('body')});

        menu.render();
        signup.render();
        loader.render();

        $('h1').on('scrollSpy:enter', function () {
            console.log('enter:', $(this).attr('id'));
            $('.b-nav__flow').removeClass('b-nav__flow_active');
            $('a[href="#' + $(this).attr('id') + '"]').addClass('b-nav__flow_active');
        });

        $('h1').on('scrollSpy:exit', function () {
            console.log('exit:', $(this).attr('id'));
        });

        $('.b-nav__flow').click(function (e) {
            var href = $(this).attr("href"),
                offsetTop = href === "#" ? 0 : $(href).offset().top - 110 + 1;

            $('html, body').stop().animate({
                scrollTop: offsetTop
            }, 1000);

            e.preventDefault();
        });

        $('h1').scrollSpy({offsetTop: 110});

        Backbone.history.start();
    });
});