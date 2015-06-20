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
        ui          : '../lib/jquery-ui/jquery-ui.min',
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
    'View/Signup',
    'View/Loader'
], function ($, Menu, Signup, Loader) {

    $(function () {
        var signup  = new Signup({obj: $('.b-section')}),
            menu    = new Menu({el: $('.b-menu')}),
            loader  = new Loader({obj: $('body')});

        menu.render();
        signup.render();
        loader.render();

        Backbone.history.start();
    });
});