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
    var List;

    // Маршруты
    function Index(modelId) {
        List  = new Offers.List({obj: $('.b-section'), modelId: modelId || undefined, page: undefined});
        List.render();
    }

    function More(modelId, page) {
        if (List) {
            List.list(modelId, page);
        } else {
            List  = new Offers.List({obj: $('.b-section'), modelId: modelId || undefined, page: page || undefined});
            List.render();
        }
    }

    $(function () {
        var router      = new Backbone.Router(),
            loader      = new Loader({obj: $('body')});

        loader.render();

        // Маршрутизация
        router.route('(:modelId)', 'offers', Index);
        router.route(':modelId/:page', 'more', More);
        //router.route('*other', 'default', Index);

        Backbone.history.start();
    });
});