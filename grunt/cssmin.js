module.exports = {
    index: {
        options: {
            banner: '/* Index minified */'
        },
        files: {
            'hosts/base/static/build/index.css': ['hosts/base/static/css/common.css', 'hosts/base/static/css/index.css']
        }
    },

    simple: {
        options: {
            banner: '/* Index minified */'
        },
        files: {
            'hosts/base/static/build/simple.css': ['hosts/base/static/css/common.css', 'hosts/base/static/css/simple.css']
        }
    },

    models: {
        options: {
            banner: '/* Index minified */'
        },
        files: {
            'hosts/base/static/build/models.css': ['hosts/base/static/css/common.css', 'hosts/base/static/css/models.css']
        }
    },

    offers: {
        options: {
            banner: '/* Index minified */'
        },
        files: {
            'hosts/base/static/build/offers.css': ['hosts/base/static/css/common.css', 'hosts/base/static/css/offers.css']
        }
    }
};