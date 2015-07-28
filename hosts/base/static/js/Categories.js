/**
 * Модуль инициализации стр. списка категорий
 *
 * @module      Categories
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

        Templates       : '../Templates'
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
    'View/Categories',
    'View/Georegion',
    'View/Loader'
], function ($, Menu, Categories, Georegion, Loader) {
    var Params = Backbone.Model.extend({}),
        params,
        Layout;

    params = new Params({
        categoryId: null
    });

    params.on('change:categoryId', function () {
        if (Layout) {
            Layout.remove();
            console.log(Layout);
        }
        Layout  = new Categories.Layout({obj: $('.b-section'), categoryId: params.get('categoryId') || undefined});
        Layout.render();
    });

    Georegion.getGeoModel().on('change:geo', function () {
        params.trigger('change:categoryId');
    });

    // Маршруты
    function Index(categoryId) {
        params.set({
            categoryId: categoryId || 90401
        });
    }

    $(function () {
        var router      = new Backbone.Router(),
            menu        = new Menu({el: $('.b-menu')}),
            loader      = new Loader({obj: $('body')});

        menu.render();
        loader.render();

        // Маршрутизация
        router.route('(:categoryId)', 'index', Index);
        //router.route('*other', 'default', Index);

        Backbone.history.start();
    });
});