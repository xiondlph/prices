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
    var modelId = req.params.modelId;

    delete req.params.modelId;

    req.api('/v1/model/' + modelId + '/offers.json?' + querystring.stringify(req.params), function (status, data) {
        res.statusCode = status;
        res.setHeader('Content-Type', 'application-json; charset=UTF-8');
        res.end(data);
    });
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
    var modelId     = req.params.modelId,
        result = [];

    delete req.params.modelId;
    delete req.params.page;
    if (!req.params.hasOwnProperty('geo_id')) {
        req.params.remote_ip = req.headers['x-forwarded-for'];
    }

    function _request(page, accept) {
        var request = http.request({
                host:     '194.58.98.18',
                port:     3000,
                path:     '/v1/model/' + modelId + '/offers.json?page=' + page + '&' + querystring.stringify(req.params),
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
                        if (_data.hasOwnProperty('offers') && _data.offers.count > 0) {
                            result = result.concat(_data.offers.items);
                            _request(_data.offers.page + 1, accept);
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

    _request(1, function (statusCode) {
        res.statusCode = statusCode;
        res.setHeader('Content-Type', 'application-json; charset=UTF-8');
        res.end(JSON.stringify(result, null, "\t"));
    });
};