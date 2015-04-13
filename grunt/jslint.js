module.exports = {
    main: {
        src: [
            'Gruntfile.js',
            'grunt/**/*.js',
            'app.js',
            'lib/**/*.js',
            'server/**/*.js',
            'middleware/**/*.js',
            'hosts/base/index.js',
            'hosts/base/controller/**/*.js',
            'hosts/base/model/**/*.js',
            'hosts/base/static/js/**/*.js'
        ],
        directives: {
            browser: true,
            sloppy: true,
            devel: true,
            node: true,
            nomen: true,
            unparam: true,
            plusplus: true,
            ass: true,
            predef: [
                '$',
                'define',
                '_',
                'Backbone'
            ]
        },
        options: {
            junit: 'out/jslint.xml'
        }
    }
};