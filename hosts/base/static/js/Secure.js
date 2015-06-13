/**
 * Модуль инициализации стр. системы безопастности
 *
 * @module      Secure
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
    'View/Menu',
    'View/Secure',
    'View/Loader'
], function ($, Menu, Secure, Loader) {

    // Маршруты
    function signin() {
        var Signin = new Secure.Signin({obj: $('.b-section')});
        Signin.render();
    }

    function forgot() {
        var Forgot = new Secure.Forgot({obj: $('.b-section')});
        Forgot.render();
    }

    $(function () {
        var router  = new Backbone.Router(),
            menu    = new Menu({el: $('.b-menu')}),
            loader  = new Loader({obj: $('body')});

        menu.render();
        loader.render();

        // Маршрутизация
        router.route('*other', 'default', signin);
        router.route('login', 'signin', signin);
        router.route('forgot', 'forgot', forgot);

        Backbone.history.start();
    });
});