/**
 * Модуль инициализации хоста
 *
 * @module      Hosts.Base
 * @class       Base
 * @namespace   Hosts
 * @main        Prices monitoring service
 * @author      Ismax <admin@ismax.ru>
 */


// Подключения сервера
var router = require('../../server/router');


/**
 * Слои
 *
 * @attribute middleware 
 * @type Object
 */
var middleware = {
    post:           require('../../middleware/post'),
    query:          require('../../middleware/query'),
    sessions:       require('../../middleware/sessions'),
    view:           require('../../middleware/view')
};



/**
 * Набор моделей
 *
 * @attribute model 
 * @type Object
 */
var model = {
    secure:     require('./model/secure')
};



/**
 * Нобор контроллеров
 *
 * @attribute controller 
 * @type Object
 */
var controller = {
    index:      require('./controller/index'),
    secure:     require('./controller/secure'),
    user:       require('./controller/user'),
    profile:    require('./controller/profile'),
    request:    require('./controller/request'),
    georegion:  require('./controller/georegion'),
    category:   require('./controller/category'),
    models:     require('./controller/models'),
    offers:     require('./controller/offers'),
    reviews:    require('./controller/reviews'),
    search:     require('./controller/search')
};


/**
 * @config host
 * @type String
 */
var host;

if (process.env.NODE_ENV !== 'prod') {
    host = process.env.HOST || 'dev.ismax';
    console.log('host: %s', host);
} else {
    host = process.env.HOST || 'ismax';
}

/*** Установка текущего хоста ***/
router.setCurrentHost(host);

/*** Назначение HTTP маршрутов ***/

// Общие настройки для GET запросов
router.get('^(http|https)://www.' + host + '.ru/.*$', middleware.view);

// Общие настройки для POST запросов
router.post('^(http|https)://www.' + host + '.ru/.*$', middleware.post);

// Общие настройки для OPTIONS запросов (разрешительный заголовок для кросс-доменных запросов)
router.options('^(http|https)://www.' + host + '.ru/.*$', controller.secure.options);

// Стр. 404 (Not found)
router.get('^(http|https)://www.' + host + '.ru/404/?$', controller.index.notfound);

// Главная стр.
router.get('^http://www.' + host + '.ru/?$', controller.secure.guest, controller.index.index);
router.get('^https://www.' + host + '.ru/?$', controller.secure.guest, controller.secure.http);

// Текстовые стр.
router.get('^http://www.' + host + '.ru/(about)/?$', controller.secure.auth);
router.get('^https://www.' + host + '.ru/(about)/?$', middleware.sessions, model.secure, controller.secure.user, controller.secure.auth);

router.get('^(http|https)://www.' + host + '.ru/about/?$', controller.index.about);

// Sitemap.xml
router.get('^http://www.' + host + '.ru/Sitemap.xml$', controller.index.sitemap);

// Secure
router.get('^(http|https)://www.' + host + '.ru/user.*$', controller.secure.https, middleware.sessions, model.secure, controller.secure.user);
router.post('^https://www.' + host + '.ru/user.*$', middleware.sessions, model.secure, controller.secure.user);

router.get('^https://www.' + host + '.ru/user/?$', controller.secure.guest, controller.secure.index);
router.post('^https://www.' + host + '.ru/user/signin/?$', controller.secure.guest, controller.secure.signin);
router.get('^https://www.' + host + '.ru/user/signout/?$', controller.secure.auth, controller.secure.signout);

// User
router.post('^https://www.' + host + '.ru/user/create/?$', middleware.view, controller.secure.guest, controller.user.create);
router.post('^https://www.' + host + '.ru/user/forgot/?$', middleware.view, controller.secure.guest, controller.user.forgot);

// Profile
router.get('^(http|https)://www.' + host + '.ru/profile.*$', controller.secure.https, middleware.sessions, model.secure, controller.secure.user, controller.secure.auth);
router.post('^https://www.' + host + '.ru/profile.*$', middleware.sessions, model.secure, controller.secure.user, controller.secure.auth);

router.get('^https://www.' + host + '.ru/profile/?$', controller.profile.index);
router.get('^https://www.' + host + '.ru/profile/get/?$', controller.profile.get);
router.post('^https://www.' + host + '.ru/profile/email/?$', controller.profile.email);
router.post('^https://www.' + host + '.ru/profile/pass/?$', controller.profile.password);

// Secure zone
router.get('^(http|https)://www.' + host + '.ru/(categories|category|path|filters|model|models|offers).*$', controller.secure.https, middleware.sessions, model.secure, controller.secure.user, controller.secure.auth);
router.post('^https://www.' + host + '.ru/(categories|category|path|filters|model|models|offers).*$', middleware.sessions, model.secure, controller.secure.user, controller.secure.auth);

// Georegion
router.post('^https://www.' + host + '.ru/georegion/?$', controller.request.api, controller.georegion.get);
router.post('^https://www.' + host + '.ru/georegion/path/?$', controller.request.api, controller.georegion.path);
router.post('^https://www.' + host + '.ru/georegions/?$', controller.request.api, controller.georegion.list);

// Category
router.get('^https://www.' + host + '.ru/categories/?$', controller.category.index);
router.post('^https://www.' + host + '.ru/category/?$', controller.request.api, controller.category.get);
router.post('^https://www.' + host + '.ru/path/?$', controller.request.api, controller.category.path);
router.post('^https://www.' + host + '.ru/categories/?$', controller.request.api, controller.category.list);
router.post('^https://www.' + host + '.ru/filters/?$', controller.request.api, controller.category.filters);

// Models
router.get('^https://www.' + host + '.ru/models/?$', controller.models.index);
router.get('^https://www.' + host + '.ru/model/?$', controller.models.model);
router.post('^https://www.' + host + '.ru/model/?$', controller.request.api, controller.models.get);
router.post('^https://www.' + host + '.ru/models/?$', controller.request.api, controller.models.list);

// Offers
router.get('^https://www.' + host + '.ru/offers/?$', controller.offers.index);
router.post('^https://www.' + host + '.ru/offers/?$', controller.request.api, controller.offers.list);
router.post('^https://www.' + host + '.ru/offers/all/?$', controller.request.api, controller.offers.all);

// Reviews
router.get('^https://www.' + host + '.ru/reviews/?$', controller.reviews.index);
router.post('^https://www.' + host + '.ru/reviews/?$', controller.request.api, controller.reviews.list);

// Search
router.get('^https://www.' + host + '.ru/search/?$', controller.search.index);
router.post('^https://www.' + host + '.ru/search/?$', controller.request.api, controller.search.get);