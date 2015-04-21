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
    'View/Models',
    'View/Loader'
], function ($, Models, Loader) {
    var Params = Backbone.Model.extend({}),
        params,
        Layout;

    params = new Params({
        categoryId: null,
        page:       null
    });

    params.on('change:categoryId', function () {
        Layout  = new Models.Layout({obj: $('.b-section'), categoryId: params.get('categoryId') || undefined});
        Layout.render();
        if (!params.hasChanged('page')) {
            params.set({
                page: 1
            });
        }
    });

    params.on('change:page', function () {
        if (Layout) {
            Layout.models(params.get('categoryId'), params.get('page'));
        }
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
            loader      = new Loader({obj: $('body')});

        loader.render();

        // Маршрутизация
        router.route('(:categoryId)(/:page)', 'index', Index);
        //router.route('*other', 'default', Index);

        Backbone.history.start();
    });
});