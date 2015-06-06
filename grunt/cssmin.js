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
            banner: '/* Simple minified */'
        },
        files: {
            'hosts/base/static/build/simple.css': ['hosts/base/static/css/common.css', 'hosts/base/static/css/simple.css']
        }
    },

    categories: {
        options: {
            banner: '/* Categories minified */'
        },
        files: {
            'hosts/base/static/build/categories.css': ['hosts/base/static/css/common.css', 'hosts/base/static/css/categories.css']
        }
    },

    models: {
        options: {
            banner: '/* Sodels minified */'
        },
        files: {
            'hosts/base/static/build/models.css': ['hosts/base/static/css/common.css', 'hosts/base/static/css/models.css']
        }
    },

    offers: {
        options: {
            banner: '/* Offers minified */'
        },
        files: {
            'hosts/base/static/build/offers.css': ['hosts/base/static/css/common.css', 'hosts/base/static/css/offers.css']
        }
    }
};