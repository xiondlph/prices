/**
 * Reviews контроллер
 *
 * @module      Hosts.Base.Controller.Reviews
 * @class       Controller.Reviews
 * @namespace   Hosts.Base
 * @main        Prices monitoring service
 * @author      Ismax <admin@ismax.ru>
 */


// Объявление модулей
var http            = require('http'),
    querystring     = require('querystring');

//---------------------- HTTP запросы ----------------------//


/**
 * Основная страница
 *
 * @method index
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
exports.index = function (req, res, next) {
    res.render(__dirname + '/../view/', 'reviews');
};


/**
 * Список товарных предложений
 *
 * @method list
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
exports.list = function (req, res, next) {
    var modelId = req.params.modelId;

    delete req.params.modelId;

    req.api('/v1/model/' + modelId + '/opinion.json?' + querystring.stringify(req.params), function (status, data) {
        res.statusCode = status;
        res.setHeader('Content-Type', 'application-json; charset=UTF-8');
        res.end(data);
    });
};