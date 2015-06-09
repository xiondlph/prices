/**
 * Category контроллер
 *
 * @module      Hosts.Base.Controller.Category
 * @class       Controller.Category
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
    res.render(__dirname + '/../view/', 'categories');
};


/**
 * Информация о категории
 *
 * @method get
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
exports.get = function (req, res, next) {
    var categoryId = req.params.categoryId;

    delete req.params.categoryId;

    req.api('/v1/category/' + categoryId + '.json?' + querystring.stringify(req.params), function (status, data) {
        res.statusCode = status;
        res.setHeader('Content-Type', 'application-json; charset=UTF-8');
        res.end(data);
    });
};


/**
 * Хлебные крошки
 *
 * @method path
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
exports.path = function (req, res, next) {
    var categoryId = req.params.categoryId,
        result = {
            path: []
        };

    delete req.params.categoryId;

    function loop(category, accept) {
        req.api('/v1/category/' + category + '.json?' + querystring.stringify(req.params), function (status, data) {
            var _data = JSON.parse(data);

            if (status === 200) {
                result.path.unshift(_data);
                if (_data.category.parentId > 0) {
                    loop(_data.category.parentId, accept);
                } else {
                    accept(200);
                }
            } else {
                result = _data;
                accept(status);
            }
        });        
    }

    loop(categoryId, function (status) {
        res.statusCode = status;
        res.setHeader('Content-Type', 'application-json; charset=UTF-8');
        res.end(JSON.stringify(result, null, "\t"));
    });
};


/**
 * Список категорий
 *
 * @method list
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
exports.list = function (req, res, next) {
    var categoryId = req.params.categoryId,
        url;

    delete req.params.categoryId;

    if (categoryId) {
        url = '/v1/category/' + categoryId + '/children.json?' + querystring.stringify(req.params);
    } else {
        url = '/v1/category.json?' + querystring.stringify(req.params);
    }

    req.api(url, function (status, data) {
        res.statusCode = status;
        res.setHeader('Content-Type', 'application-json; charset=UTF-8');
        res.end(data);
    });
};


/**
 * Список фильтров категории
 *
 * @method filters
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
exports.filters = function (req, res, next) {
    var categoryId = req.params.categoryId;

    delete req.params.categoryId;

    req.api('/v1/category/' + categoryId + '/filters.json?' + querystring.stringify(req.params), function (status, data) {
        res.statusCode = status;
        res.setHeader('Content-Type', 'application-json; charset=UTF-8');
        res.end(data);
    });
};