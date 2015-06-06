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

    function loop(categoryId, accept) {
        var request = http.request({
            host:     '194.58.98.18',
            port:     3000,
            path:     '/v1/category/' + categoryId + '.json?' + querystring.stringify(req.params),
            method:   'GET',
            headers: {
                'Host':                 'market.icsystem.ru',
                'X-Ismax-Key':          '85d1fb3b78dfab1d14aebdb44d78eb9ff6b9811515e0698078ad93d7477dc370',
                'X-Forwarded-Proto':    'http',
                'X-Forwarded-for':      req.headers['x-forwarded-for']
            }
        }, function (response) {
            var data = '';

            response.on('data', function (chunk) {
                data += chunk.toString();
            });

            response.on('end', function () {
                var _data = JSON.parse(data);

                if (response.statusCode === 200) {
                    result.path.unshift(_data);
                    if (_data.category.parentId > 0) {
                        loop(_data.category.parentId, accept);
                    } else {
                        accept(200);
                    }
                } else {
                    result = _data;
                    accept(response.statusCode);
                }
            });
        });

        request.on('error', function (err) {
            result = {
                errors: [err.message]
            };

            accept(500);
        });

        request.end();
    }

    loop(categoryId, function (statusCode) {
        res.statusCode = statusCode;
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