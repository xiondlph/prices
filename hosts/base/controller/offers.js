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
 * Все товарные предложения
 *
 * @method all
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
exports.all = function (req, res, next) {
    var modelId     = req.params.modelId,
        result = [];

    delete req.params.modelId;
    delete req.params.page;

    function loop(page, accept){
        req.api('/v1/model/' + modelId + '/offers.json?page=' + page + '&' + querystring.stringify(req.params), function (status, data) {
            var _data = JSON.parse(data);
            if (status === 200) {
                if (_data.hasOwnProperty('offers') && _data.offers.count > 0) {
                    result = result.concat(_data.offers.items);
                    loop(_data.offers.page + 1, accept);
                } else {
                    accept(200);
                }
            } else {
                result = _data;
                accept(status);
            }
        });
    }

    loop(1, function (status) {
        res.statusCode = status;
        res.setHeader('Content-Type', 'application-json; charset=UTF-8');
        res.end(JSON.stringify(result, null, "\t"));
    });
};