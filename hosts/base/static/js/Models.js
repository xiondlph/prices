/**
 * Модуль инициализации стр. списка моделей
 *
 * @module      Models
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
    'View/Models',
    'View/Georegion',
    'View/Loader'
], function ($, Menu, Models, Georegion, Loader) {
    var Params = Backbone.Model.extend({}),
        params,
        Layout;

    params = new Params({
        categoryId: null,
        page:       null
    });

    params.on('change:categoryId', function () {
        Layout  = new Models.Layout({obj: $('.b-section'), categoryId: params.get('categoryId') || undefined, reloadModels: function () {
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
            Layout.getModels(params.get('categoryId'), params.get('page'));
        }
    });


    Georegion.getGeoModel().on('change:geo', function () {
        params.trigger('change:page');
    });

    // Маршруты
    function Index(categoryId, page) {
        params.set({
            categoryId: categoryId  || undefined,
            page:       page        || undefined
        });
    }

    $(function () {
        var router      = new Backbone.Router(),
            menu        = new Menu({el: $('.b-menu')}),
            loader      = new Loader({obj: $('body')});

        menu.render();
        loader.render();

        // Маршрутизация
        router.route(':categoryId(/:page)', 'index', Index);
        //router.route('*other', 'default', Index);

        Backbone.history.start();
    });
});