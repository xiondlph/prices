/**
 * Слой работы с query данными
 *
 * @module      Middleware.Query
 * @class       Query
 * @namespace   Middleware
 * @main        Prices monitoring service
 * @author      Ismax <admin@ismax.ru>
 */


// Объявление модулей
var url             = require('url'),
    querystring     = require('querystring');

//---------------------- HTTP запросы ----------------------//

/**
 * Экспорт метода получения query данных
 *
 * @method query
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
module.exports = function (req, res, next) {
    var query = querystring.parse(url.parse(req.url).query),
        key;

    // Создание объекта параметров
    // в случае его отсудсвия
    if (!req.hasOwnProperty('params')) {

        /**
         * GET параметры в объекте запроса
         *
         * @property params
         * @type Object
         */
        req.params = {};
    }


    for (key in query) {
        if (query.hasOwnProperty(key)) {
            req.params[key] = query[key];
        }
    }

    req._path = url.parse(req.url).pathname;
    next();
};