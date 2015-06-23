/**
 * Модуль инициализации стр. списка товарных предложений
 *
 * @module      Offers
 * @category    Client side
 * @main        Prices monitoring service
 * @author      Ismax <admin@ismax.ru>
 */

require.config({
    baseUrl: 'js',
    paths: {
        text            : '../lib/requirejs/text',
        jquery          : '../lib/jquery/jquery-2.1.1.min',
        validator       : '../lib/validator.min',
        underscore      : '../lib/underscore/underscore-min',
        backbone        : '../lib/backbone/backbone-min',
        localStorage    : '../lib/backbone/localStorage-min',

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
    'View/Offers',
    'View/Georegion',
    'View/Loader'
], function ($, Menu, Offers, Georegion, Loader) {
    var Params = Backbone.Model.extend({}),
        params,
        Layout;

    params = new Params({
        modelsId:   null,
        page:       null
    });


    params.on('change:modelId', function () {
        Layout  = new Offers.Layout({obj: $('.b-section'), modelId: params.get('modelId') || undefined, reloadOffers: function () {
            params.trigger('change:page');
        }});

        Layout.render();
        if (!params.hasChanged('page')) {
            params.set({
                page: 1
            });
        }
    });

    params.on('change:page', function () {
        if (Layout) {
            Layout.getOffers(params.get('modelId'), params.get('page'));
        }
    });


    Georegion.getGeoModel().on('change', function () {
        params.trigger('change:page');
    });

    // Маршруты
    function Index(modelId, page) {
        params.set({
            modelId: modelId    || undefined,
            page:       page    || undefined
        });
    }

    $(function () {
        var router      = new Backbone.Router(),
            menu        = new Menu({el: $('.b-menu')}),
            loader      = new Loader({obj: $('body')});

        menu.render();
        loader.render();

        // Маршрутизация
        router.route('(:modelId)(/:page)', 'index', Index);
        //router.route('*other', 'default', Index);

        Backbone.history.start();
    });
});