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
        fsvs        : '../lib/fsvs',
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
    'fsvs',
    'View/Menu',
    'View/Signup',
    'View/Loader'
], function ($, Fsvs,  MenuView, SignupView, LoaderView) {

    $(function () {
        var signup  = new SignupView({obj: $('.b-section')}),
            menu    = new MenuView({el: $('.b-menu')}),
            loader  = new LoaderView({obj: $('body')}),

            fsvs    = $.fn.fsvs({
                speed : 2000,
                bodyID : 'fsvs-body',
                selector : '> .slide',
                mouseSwipeDisance : 40,
                afterSlide : function(){},
                beforeSlide : function(){},
                endSlide : function(){},
                mouseWheelEvents : true,
                mouseDragEvents : true,
                touchEvents : true,
                arrowKeyEvents : true,
                pagination : false,
                nthClasses : false,
                detectHash : true
            });

        menu.render();
        signup.render();
        loader.render();

        Backbone.history.start();
    });
});