/**
 * Модуль стр. оплаты
 *
 * @module      Payment
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
    'View/Payment',
    'View/Loader'
], function ($, MenuView, PaymentView, LoaderView) {

    // Маршруты
    function index() {
        $('.b-menu__sub__item__link_active').removeClass('b-menu__sub__item__link_active');
        $('.b-menu__sub__item__link[href="/payment#index"]').addClass('b-menu__sub__item__link_active');
        var Form = new PaymentView.Form({obj: $('.b-section')});
        Form.render();
    }

    function history() {
        $('.b-menu__sub__item__link_active').removeClass('b-menu__sub__item__link_active');
        $('.b-menu__sub__item__link[href="/payment#history"]').addClass('b-menu__sub__item__link_active');
        var Form = new PaymentView.History({obj: $('.b-section')});
        Form.render();
    }

    $(function () {
        var router  = new Backbone.Router(),
            menu    = new MenuView({el: $('.b-menu')}),
            loader  = new LoaderView({obj: $('body')});

        menu.render();
        loader.render();

        // Маршрутизация
        router.route('index', 'index', index);
        router.route('*other', 'default', index);
        router.route('history', 'history', history);

        Backbone.history.start();
    });
});