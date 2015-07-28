/**
 * Модуль инициализации стр. поиска
 *
 * @module      Search
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
    'View/Search',
    'View/Georegion',
    'View/Loader'
], function ($, MenuView, SearchView, GeoregionView, LoaderView) {
    var Params = Backbone.Model.extend({}),
        params,
        Layout;

    params = new Params({
        categoryId: null,
        text:       null,
        page:       1
    });

    params.on('change:categoryId', function () {
        Layout  = new SearchView.Layout({obj: $('.b-section'), categoryId: params.get('categoryId') || undefined});

        Layout.render();
    });

    params.on('change:page', function () {
        if (Layout) {
            Layout.getSearch(params.get('text'), params.get('page'));
        }
    });

    params.on('change:text', function () {
        if (Layout) {
            Layout.getSearch(params.get('text'));
        }
    });

    GeoregionView.getGeoModel().on('change:geo', function () {
        params.trigger('change:text');
    });

    // Маршруты
    function Index(categoryId, text, page) {
        params.set({
            categoryId: categoryId  || undefined,
            text:       text        || undefined,
            page:       page        || 1
        });
    }

    function Default() {
        window.location.href = '/categories';
    }

    $(function () {
        var router      = new Backbone.Router(),
            menu        = new MenuView({el: $('.b-menu')}),
            loader      = new LoaderView({obj: $('body')});

        menu.render();
        loader.render();

        // Маршрутизация
        router.route('*path', 'default', Default);
        router.route(':categoryId/:text(/:page)', 'index', Index);

        Backbone.history.start();
    });
});