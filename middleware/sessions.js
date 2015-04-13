/**
 * Слой работы с сессиями
 *
 * @module      Middleware.Sessions
 * @class       Sessions
 * @namespace   Middleware
 * @main        Prices monitoring service
 * @author      Ismax <admin@ismax.ru>
 */


// Объявление модулей
var cookie    = require('../lib/cookie');

//---------------------- HTTP запросы ----------------------//

/**
 * Экспорт метода получения индекса сессии
 *
 * @method sessions
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
module.exports = function (req, res, next) {
    // Работа с индексом сессии
    var _cookie = cookie.parse(req.headers.cookie),
        index;

    if (_cookie && _cookie.ismax_session) {
        index = _cookie.ismax_session;
    } else {
        index = cookie.uid(64);
        res.setHeader("Set-Cookie", 'ismax_session=' + index + '; path=/; domain=icsystem.ru; secure');
    }

    /**
    * Индекс сессии в объекте запроса
    *
    * @property sissionId
    * @type Object
    */
    req.sissionId = index;

    next();
};