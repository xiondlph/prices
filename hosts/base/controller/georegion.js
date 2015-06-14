/**
 * Georegion контроллер
 *
 * @module      Hosts.Base.Controller.Georegion
 * @class       Controller.Georegion
 * @namespace   Hosts.Base
 * @main        Prices monitoring service
 * @author      Ismax <admin@ismax.ru>
 */


// Объявление модулей
var http            = require('http'),
    querystring     = require('querystring');

//---------------------- HTTP запросы ----------------------//


/**
 * Информация о регионе
 *
 * @method get
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
exports.get = function (req, res, next) {
    var geoId = req.params.geo_id;

    delete req.params.geo_id;

    req.api('/v1/georegion/' + geoId + '.json?' + querystring.stringify(req.params), function (status, data) {
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
    var geoId = req.params.geo_id,
        result = {
            path: []
        };

    delete req.params.geo_id;

    function loop(geo, accept) {
        req.api('/v1/georegion/' + geo + '.json?' + querystring.stringify(req.params), function (status, data) {
            var _data = JSON.parse(data);

            if (status === 200) {
                result.path.unshift(_data);
                if (_data.georegion.parentId > 0) {
                    loop(_data.georegion.parentId, accept);
                } else {
                    accept(200);
                }
            } else {
                result = _data;
                accept(status);
            }
        });
    }

    loop(geoId, function (status) {
        res.statusCode = status;
        res.setHeader('Content-Type', 'application-json; charset=UTF-8');
        res.end(JSON.stringify(result, null, "\t"));
    });
};


/**
 * Список регионов
 *
 * @method list
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
exports.list = function (req, res, next) {
    var geoId = req.params.geo_id,
        url;

    delete req.params.geo_id;

    if (geoId) {
        url = '/v1/georegion/' + geoId + '/children.json?' + querystring.stringify(req.params);
    } else {
        url = '/v1/georegion.json?' + querystring.stringify(req.params);
    }

    req.api(url, function (status, data) {
        res.statusCode = status;
        res.setHeader('Content-Type', 'application-json; charset=UTF-8');
        res.end(data);
    });
};