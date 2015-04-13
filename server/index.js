/**
 * Главный модуль сервера
 *
 * @module      Server.Index
 * @class       Index
 * @namespace   Server
 * @main        Prices monitoring service
 * @author      Ismax <admin@ismax.ru>
 */


// Объявление модулей
var http          = require('http'),
    exception     = require('./exception'),
    router        = require('./router');


// Создание HTTP сервера
var server = http.createServer(function (req, res) {

    // Объект перехвата исключений запроса
    var httpErr = exception.httpErr(req, res);

    // Инициализация объекта локальных переменных
    req.local = {};

    httpErr.run(function () {
        router.route(req, res, httpErr);
    });
});


/**
 * Метод запуска сервера
 *
 * @method start
 */
exports.start = function () {
    // Запуск web сервера на порту 3001/4001
    if (process.env.NODE_ENV !== 'prod') {
        server.listen(4001);
        console.log('Start server at port 4001');
    } else {
        server.listen(process.env.PORT || 3001);
    }
};