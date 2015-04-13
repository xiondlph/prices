module.exports = {
    scripts: {
        files: [
            'Gruntfile.js',
            'app.js',
            'lib/**/*.js',
            'server/**/*.js',
            'middleware/**/*.js',
            'hosts/base/index.js',
            'hosts/base/controller/**/*.js',
            'hosts/base/model/**/*.js',
            'hosts/base/static/js/**/*.js'
        ],
        tasks: ['jslint'],
        options: {
            interrupt: true
        }
    }
};