/**
 * Модуль инициализации стр. списка товарных предложений
 *
 * @module      Reviews
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
    'View/Reviews',
    'View/Georegion',
    'View/Loader'
], function ($, MenuView, ReviewsView, GeoregionView, LoaderView) {
    var Params = Backbone.Model.extend({}),
        params,
        Layout;

    params = new Params({
        modelsId:   null,
        page:       null
    });


    params.on('change:modelId', function () {
        Layout  = new ReviewsView.Layout({obj: $('.b-section'), modelId: params.get('modelId') || undefined, reloadReviews: function () {
            if (+params.get('page') > 1) {
                params.set('page', 1);
            } else {
                params.trigger('change:page');
            }
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
            Layout.getReviews(params.get('modelId'), params.get('page'));
        }
    });


    GeoregionView.getGeoModel().on('change', function () {
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
            menu        = new MenuView({el: $('.b-menu')}),
            loader      = new LoaderView({obj: $('body')});

        menu.render();
        loader.render();

        // Маршрутизация
        router.route('(:modelId)(/:page)', 'index', Index);
        //router.route('*other', 'default', Index);

        Backbone.history.start();
    });
});