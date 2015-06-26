/**
 * Модуль инициализации стр. модели
 *
 * @module      Model
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
    'View/Model',
    'View/Georegion',
    'View/Loader'
], function ($, MenuView, ModelView, GeoregionView, LoaderView) {
    var Params = Backbone.Model.extend({}),
        params,
        Layout;

    params = new Params({
        modelId: null
    });

    params.on('change:modelId', function () {
        Layout  = new ModelView.Layout({obj: $('.b-section'), modelId: params.get('modelId') || undefined});

        Layout.render();
    });


    GeoregionView.getGeoModel().on('change', function () {
        params.trigger('change:modelId');
    });

    // Маршруты
    function Index(modelId) {
        params.set({
            modelId: modelId  || undefined
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
        router.route(':modelId', 'index', Index);

        Backbone.history.start();
    });
});