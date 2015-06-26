/**
 * Models контроллер
 *
 * @module      Hosts.Base.Controller.Models
 * @class       Controller.Models
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
    res.render(__dirname + '/../view/', 'models');
};


/**
 * Основная модели
 *
 * @method model
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
exports.model = function (req, res, next) {
    res.render(__dirname + '/../view/', 'model');
};


/**
 * Информация о модели
 *
 * @method get
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
exports.get = function (req, res, next) {
    var modelId = req.params.modelId;

    delete req.params.modelId;

    req.api('/v1/model/' + modelId + '.json?' + querystring.stringify(req.params), function (status, data) {
        res.statusCode = status;
        res.setHeader('Content-Type', 'application-json; charset=UTF-8');
        res.end(data);
    });
};


/**
 * Список моделей категории
 *
 * @method list
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
exports.list = function (req, res, next) {
    var categoryId = req.params.categoryId;

    delete req.params.categoryId;

    req.api('/v1/category/' + categoryId + '/models.json?' + querystring.stringify(req.params), function (status, data) {
        res.statusCode = status;
        res.setHeader('Content-Type', 'application-json; charset=UTF-8');
        res.end(data);
    });
};