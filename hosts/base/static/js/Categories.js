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
    'View/Categories',
    'View/Loader'
], function ($, Categories, Loader) {
    var Params = Backbone.Model.extend({}),
        params,
        Layout;

    params = new Params({
        categoryId: null
    });

    params.on('change:categoryId', function () {
        Layout  = new Categories.Layout({obj: $('.b-section'), categoryId: params.get('categoryId') || undefined});
        Layout.render();
    });

    // Маршруты
    function Index(categoryId, page) {
        params.set({
            categoryId: categoryId  || undefined
        });
    }

    $(function () {
        var router      = new Backbone.Router(),
            loader      = new Loader({obj: $('body')});

        loader.render();

        // Маршрутизация
        router.route('(:categoryId)', 'index', Index);
        //router.route('*other', 'default', Index);

        Backbone.history.start();
    });
});