module.exports = {
    index: {
        options: {
            banner: '/* Index minified */'
        },
        files: {
            'hosts/base/static/build/index.css': ['hosts/base/static/css/common.css', 'hosts/base/static/css/index.css']
        }
    },

    secure: {
        options: {
            banner: '/* Secure minified */'
        },
        files: {
            'hosts/base/static/build/secure.css': ['hosts/base/static/css/common.css']
        }
    },

    profile: {
        options: {
            banner: '/* Profile minified */'
        },
        files: {
            'hosts/base/static/build/profile.css': ['hosts/base/static/css/common.css', 'hosts/base/static/css/profile.css']
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

    model: {
        options: {
            banner: '/* Sodels minified */'
        },
        files: {
            'hosts/base/static/build/model.css': ['hosts/base/static/css/common.css', 'hosts/base/static/css/model.css']
        }
    },

    models: {
        options: {
            banner: '/* Sodels minified */'
        },
        files: {
            'hosts/base/static/build/models.css': ['hosts/base/static/css/common.css', 'hosts/base/static/css/models.css', 'hosts/base/static/css/filter.css']
        }
    },

    offers: {
        options: {
            banner: '/* Offers minified */'
        },
        files: {
            'hosts/base/static/build/offers.css': ['hosts/base/static/css/common.css', 'hosts/base/static/css/offers.css', 'hosts/base/static/css/filter.css']
        }
    },

    reviews: {
        options: {
            banner: '/* Reviews minified */'
        },
        files: {
            'hosts/base/static/build/reviews.css': ['hosts/base/static/css/common.css', 'hosts/base/static/css/reviews.css', 'hosts/base/static/css/filter.css']
        }
    },

    search: {
        options: {
            banner: '/* Offers minified */'
        },
        files: {
            'hosts/base/static/build/search.css': ['hosts/base/static/css/common.css', 'hosts/base/static/css/search.css']
        }
    }
};