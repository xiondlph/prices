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
    var List        = new Models.List({obj: $('.b-section')}),
        Categories  = new Models.Categories({obj: $('.b-section')});

    // Маршруты
    function Index(categoryId) {
        if (categoryId) {
            Categories.fetch(categoryId);
        } else {
            Categories.fetch();
        }
        
    };

    $(function () {
        var router      = new Backbone.Router(),
            loader      = new Loader({obj: $('body')});

        loader.render();
        Categories.render();
        List.render();

        // Маршрутизация
        router.route('(:categoryId)', 'categories', Index);
        router.route('*other', 'default', Index);

        Backbone.history.start();
    });
});