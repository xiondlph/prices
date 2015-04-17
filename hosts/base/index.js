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
var model = {};



/**
 * Нобор контроллеров
 *
 * @attribute controller 
 * @type Object
 */
var controller = {
    index:      require('./controller/index'),
    models:     require('./controller/models')
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

/*** Назначение HTTP маршрутов ***/

// Общие настройки для GET запросов
router.get('^http://www.' + host + '.ru/.*$', middleware.view);

// Общие настройки для POST запросов
router.post('^http://www.' + host + '.ru/.*$', middleware.post);

// Стр. 404 (Not found)
router.get('^http://www.' + host + '.ru/404/?$', controller.index.notfound);

// Главная стр.
router.get('^http://www.' + host + '.ru/?$', controller.index.index);

// Текстовые стр.
router.get('^http://www.' + host + '.ru/about/?$', controller.index.about);

// Sitemap.xml
router.get('^http://www.' + host + '.ru/Sitemap.xml$', controller.index.sitemap);

// Models
router.get('^http://www.' + host + '.ru/models/?$', controller.models.index);
router.post('^http://www.' + host + '.ru/models/?$', controller.models.list);
router.post('^http://www.' + host + '.ru/models/categories/?$', controller.models.categories);