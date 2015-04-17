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
    urlencode       = require("urlencode");

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
 * Список моделей категории
 *
 * @method list
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
exports.list = function (req, res, next) {
    var request = http.request({
        host:     'market.icsystem.ru',
        //port:     3000,
        path:     '/v1/category/' + req.params.categoryId + '/models.json?count=30&geo_id=213',
        method:   'GET',
        headers: {
            'Host':                 'market.icsystem.ru',
            'X-Ismax-Key':          '85d1fb3b78dfab1d14aebdb44d78eb9ff6b9811515e0698078ad93d7477dc370'
            // 'X-Forwarded-Proto':  'http',
            // 'X-Forwarded-For':    '78.24.219.141'
        }
    }, function(response){
        var data = '';

        response.on('data', function(chunk){
            data += chunk.toString();
        });

        response.on('end', function(){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application-json; charset=UTF-8');
            res.end(data);
        });
    });

    request.end();
};


/**
 * Список категорий
 *
 * @method categories
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
exports.categories = function (req, res, next) {
    var url;
    if (req.params.hasOwnProperty('categoryId')) {
        url = '/v1/category/' + req.params.categoryId + '/children.json?count=30';
    } else {
        url = '/v1/category.json?count=30'
    }
    var request = http.request({
        host:     'market.icsystem.ru',
        //port:     3000,
        path:     url,
        method:   'GET',
        headers: {
            'Host':                 'market.icsystem.ru',
            'X-Ismax-Key':          '85d1fb3b78dfab1d14aebdb44d78eb9ff6b9811515e0698078ad93d7477dc370'
            // 'X-Forwarded-Proto':  'http',
            // 'X-Forwarded-For':    '78.24.219.141'
        }
    }, function(response){
        var data = '';

        response.on('data', function(chunk){
            data += chunk.toString();
        });

        response.on('end', function(){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application-json; charset=UTF-8');
            res.end(data);
        });
    });

    request.end();
};