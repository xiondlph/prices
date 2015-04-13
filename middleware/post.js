/**
 * Слой работы с post данными
 *
 * @module      Middleware.Post
 * @class       Post
 * @namespace   Middleware
 * @main        Prices monitoring service
 * @author      Ismax <admin@ismax.ru>
 */


// Объявление модулей
var querystring     = require('querystring'),
    json            = require('../lib/json');

//---------------------- HTTP запросы ----------------------//

/**
 * Экспорт метода получения post данных
 * 
 * @method post
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
module.exports = function (req, res, next) {
    // Объект POST данных
    var _post = '';

    // Получение POST данных
    req.addListener("data", function (data) {
        _post += data;
    });

    // Обработка запроса при окончании
    // получения данных запроса
    req.addListener('end', function () {
        var post,
            key;

        req._post = _post;

        // Зоздание объекта параметров
        // в случае его отсудсвия
        if (!req.hasOwnProperty('params')) {

            /**
             * POST параметры в объекте запроса
             *
             * @property params
             * @type Object
             */
            req.params = {};
        }

        post = json.parse(_post) || querystring.parse(_post);

        for (key in post) {
            if (post.hasOwnProperty(key)) {
                req.params[key] = post[key];
            }
        }
        next();
    });
};