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
], function ($, MenuView, CategoriesView, GeoregionView, LoaderView) {
    var Params = Backbone.Model.extend({}),
        params,
        Layout;

    params = new Params({
        categoryId: null
    });

    params.on('change:categoryId', function () {
        if (Layout) {
            Layout.remove();
        }
        Layout  = new CategoriesView.Layout({obj: $('.b-section'), categoryId: params.get('categoryId') || undefined});
        Layout.render();
    });

    GeoregionView.getGeoModel().on('change:geo', function () {
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
            menu        = new MenuView({el: $('.b-menu')}),
            loader      = new LoaderView({obj: $('body')});

        menu.render();
        loader.render();

        // Маршрутизация
        router.route('(:categoryId)', 'index', Index);
        //router.route('*other', 'default', Index);

        Backbone.history.start();
    });
});