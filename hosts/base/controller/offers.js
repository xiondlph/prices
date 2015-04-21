/**
 * Offers контроллер
 *
 * @module      Hosts.Base.Controller.Offers
 * @class       Controller.Offers
 * @namespace   Hosts.Base
 * @main        Prices monitoring service
 * @author      Ismax <admin@ismax.ru>
 */


// Объявление модулей
var http            = require('http');

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
    res.render(__dirname + '/../view/', 'offers');
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
    var modelId     = req.params.modelId || 0,
        page        = req.params.page || 1,
        request;

    request = http.request({
        host:     '194.58.98.18',
        port:     3000,
        path:     '/v1/model/' + modelId + '/offers.json?count=30&page=' + page + '&geo_id=213',
        method:   'GET',
        headers: {
            'Host':                 'market.icsystem.ru',
            'X-Ismax-Key':          '85d1fb3b78dfab1d14aebdb44d78eb9ff6b9811515e0698078ad93d7477dc370',
            'X-Forwarded-Proto':    'http'
        }
    }, function (response) {
        var data = '';

        response.on('data', function (chunk) {
            data += chunk.toString();
        });

        response.on('end', function () {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application-json; charset=UTF-8');
            res.end(data);
        });
    });

    request.end();
};


/**
 * Генирация csv формата
 *
 * @method csv
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
exports.csv = function (req, res, next) {
    var offers = [];
    function _request(page, accept) {
        var modelId     = req.params.modelId || 0,
            request;

        request = http.request({
            host:     '194.58.98.18',
            port:     3000,
            path:     '/v1/model/' + modelId + '/offers.json?count=30&page=' + page + '&geo_id=213',
            method:   'GET',
            headers: {
                'Host':                 'market.icsystem.ru',
                'X-Ismax-Key':          '85d1fb3b78dfab1d14aebdb44d78eb9ff6b9811515e0698078ad93d7477dc370',
                'X-Forwarded-Proto':    'http'
            }
        }, function (response) {
            var data = '';

            response.on('data', function (chunk) {
                data += chunk.toString();
            });

            response.on('end', function () {
                var _data = JSON.parse(data);
                if (_data.hasOwnProperty('offers') && _data.offers.count > 0) {
                    offers = offers.concat(_data.offers.items);
                    _request(_data.offers.page + 1, accept);
                } else {
                    accept();
                }
            });
        });

        request.end();
    }

    _request(1, function () {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application-json; charset=UTF-8');
        res.end(JSON.stringify(offers, null, "\t"));
    });
};