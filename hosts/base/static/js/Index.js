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
        scrollTo    : '../lib/scrollTo.min',
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
    'scrollTo',
    'View/Menu',
    'View/Signup',
    'View/Loader'
], function ($, ScrollTo,  MenuView, SignupView, LoaderView) {

    // Маршруты
    function about() {
        $('body').scrollTo($('section[name="about"]'), 800);
    }

    function destiny() {
        $('body').scrollTo($('section[name="destiny"]'), 800);
    }

    function description() {
        $('body').scrollTo($('section[name="description"]'), 800);
    }

    function terms() {
        $('body').scrollTo($('section[name="terms"]'), 800);
    }

    $(function () {
        var router  = new Backbone.Router(),
            signup  = new SignupView({obj: $('.b-section')}),
            menu    = new MenuView({el: $('.b-menu')}),
            loader  = new LoaderView({obj: $('body')});

        menu.render();
        signup.render();
        loader.render();

        // Маршрутизация
        router.route('about', 'about', about);
        router.route('destiny', 'destiny', destiny);
        router.route('description', 'description', description);
        router.route('terms', 'terms', terms);

        Backbone.history.start();
    });
});