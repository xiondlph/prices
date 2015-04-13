/**
 * Index контроллер
 *
 * @module      Hosts.Base.Controller.Index
 * @class       Controller.Index
 * @namespace   Hosts.Base
 * @main        Prices monitoring service
 * @author      Ismax <admin@ismax.ru>
 */


// Объявление модулей
var http            = require('http');

//---------------------- HTTP запросы ----------------------//


/**
 * Домашняя страница
 *
 * @method index
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
exports.index = function (req, res, next) {
    res.render(__dirname + '/../view/', 'index');
};


/**
 * Страница 404 ошибки
 *
 * @method notfound
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 */
exports.notfound = function (req, res) {
    res.statusCode = 404;
    res.render(__dirname + '/../view/', '404');
};