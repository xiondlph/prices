module.exports = {
    index: {
        options: {
            baseUrl: "hosts/base/static/js",
            paths: {
                requireLib  : '../lib/requirejs/require',
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
            },
            preserveLicenseComments: false,
            optimize: 'uglify2',
            name: "Index",
            out: "hosts/base/static/build/index.js",
            include: ["requireLib"]
        }
    },

    models: {
        options: {
            baseUrl: "hosts/base/static/js",
            paths: {
                requireLib  : '../lib/requirejs/require',
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
            },
            preserveLicenseComments: false,
            optimize: 'uglify2',
            name: "Models",
            out: "hosts/base/static/build/models.js",
            include: ["requireLib"]
        }
    },

    offers: {
        options: {
            baseUrl: "hosts/base/static/js",
            paths: {
                requireLib  : '../lib/requirejs/require',
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
            },
            preserveLicenseComments: false,
            optimize: 'uglify2',
            name: "Offers",
            out: "hosts/base/static/build/offers.js",
            include: ["requireLib"]
        }
    }
};