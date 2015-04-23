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
 * Информация о модели
 *
 * @method get
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
exports.get = function (req, res, next) {
    var modelId = req.params.modelId,
        request;

    delete req.params.modelId;
    if (!req.params.hasOwnProperty('geo_id')) {
        req.params.remote_ip = req.headers['x-forwarded-for'];
    }

    request = http.request({
        host:     '194.58.98.18',
        port:     3000,
        path:     '/v1/model/' + modelId + '.json?' + querystring.stringify(req.params),
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
            res.statusCode = response.statusCode;
            res.setHeader('Content-Type', 'application-json; charset=UTF-8');
            res.end(data);
        });
    });

    request.on('error', function (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application-json; charset=UTF-8');
        res.end(JSON.stringify({errors: [err.message]}, null, "\t"));
    });

    request.end();
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
    var categoryId  = req.params.categoryId,
        request;

    delete req.params.categoryId;
    if (!req.params.hasOwnProperty('geo_id')) {
        req.params.remote_ip = req.headers['x-forwarded-for'];
    }

    request = http.request({
        host:     '194.58.98.18',
        port:     3000,
        path:     '/v1/category/' + categoryId + '/models.json?' + querystring.stringify(req.params),
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
            res.statusCode = response.statusCode;
            res.setHeader('Content-Type', 'application-json; charset=UTF-8');
            res.end(data);
        });
    });

    request.on('error', function (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application-json; charset=UTF-8');
        res.end(JSON.stringify({errors: [err.message]}, null, "\t"));
    });

    request.end();
};