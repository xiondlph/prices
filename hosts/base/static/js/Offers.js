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
    'View/Offers',
    'View/Loader'
], function ($, Offers, Loader) {
    var Params = Backbone.Model.extend({}),
        params,
        Layout;

    params = new Params({
        modelsId:   null,
        page:       null
    });


    params.on('change:modelId', function () {
        Layout  = new Offers.Layout({obj: $('.b-section'), modelId: params.get('modelId') || undefined});
        Layout.render();
        if (!params.hasChanged('page')) {
            params.set({
                page: 1
            });
        }
    });

    params.on('change:page', function () {
        if (Layout) {
            Layout.offers(params.get('modelId'), params.get('page'));
        }
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
            loader      = new Loader({obj: $('body')});

        loader.render();

        // Маршрутизация
        router.route('(:modelId)(/:page)', 'index', Index);
        //router.route('*other', 'default', Index);

        Backbone.history.start();
    });
});