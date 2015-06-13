/**
 * Модуль маршрутизатор по url
 *
 * @module      Server.Routing
 * @class       Routing
 * @namespace   Server
 * @main        Prices monitoring service
 * @author      Ismax <admin@ismax.ru>
 */


// Объявление модулей
var url        = require('url'),
    fs         = require('fs');


// Объекты набора маршрутов
var handle            = [];

handle.GET      = [];
handle.POST     = [];
handle.PUT      = [];
handle.DELETE   = [];
handle.OPTIONS  = [];

// Текущий хост
var currentHost;

// Проверка соответствия запроса маршруту
var match = function (elem) {
    var reg = new RegExp(elem.path);
    return reg.test(this.proto + this.host + this.pathname);
};

// Назначение функций контроллеров маршрутам
var setRoute = function () {
    var _arguments = arguments,
        funcs = [],
        i,
        j;

    for (i = 2; i < _arguments.length; i++) {
        if (Array.isArray(_arguments[i])) {
            for (j = 0; j < _arguments[i].length; j++) {
                if (typeof _arguments[i][j] !== 'function') {
                    throw new Error('Argumet id not a function on [' + _arguments[i][j] + ']');
                }
            }
            funcs = funcs.concat(_arguments[i]);
        } else {
            if (typeof _arguments[i] !== 'function') {
                throw new Error('Argumet id not a function on [' + _arguments[1] + ']');
            }

            funcs = funcs.concat(_arguments[i]);
        }
    }

    handle[_arguments[0]].push({
        path: _arguments[1],
        funcs: funcs
    });
};


// Назначение текущего хоста
exports.setCurrentHost = function (host) {
    currentHost = host;
};


/**
 * Назначение обработчика GET запроса
 *
 * @method get
 */
exports.get = function () {
    var _arguments = [].slice.call(arguments);
    _arguments.unshift('GET');
    setRoute.apply(this, _arguments);
};


/**
 * Назначение обработчика POST запроса
 *
 * @method post
 */
exports.post = function () {
    var _arguments = [].slice.call(arguments);
    _arguments.unshift('POST');
    setRoute.apply(this, _arguments);
};


/**
 * Назначение обработчика PUT запроса
 *
 * @method put
 */
exports.put = function () {
    var _arguments = [].slice.call(arguments);
    _arguments.unshift('PUT');
    setRoute.apply(this, _arguments);
};


/**
 * Назначение обработчика DELETE запроса
 *
 * @method delete
 */
exports.delete = function () {
    var _arguments = [].slice.call(arguments);
    _arguments.unshift('DELETE');
    setRoute.apply(this, _arguments);
};


/**
 * Назначение обработчика OPTIONS запроса
 *
 * @method options
 */
exports.options = function () {
    var _arguments = [].slice.call(arguments);
    _arguments.unshift('OPTIONS');
    setRoute.apply(this, _arguments);
};


/**
 * Маршрутизация по хосту
 *
 * @method route
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 */
exports.route = function (req, res, httpErr) {
    var method = req.method,
        funcs  = [],
        routes,
        notfound,
        next,
        i;

    // Установка текущего хоста
    req.currentHost = currentHost;

    if (handle[method] !== undefined) {
        routes = handle[method].filter(match, {
            proto: req.headers['x-forwarded-proto'] + '://',
            host: req.headers.host,
            pathname: url.parse(req.url).pathname
        });
    } else {
        routes = [];
    }

    // Обработчик ошибки 404
    notfound = function () {
        var _funcs = [],
            _routes,
            j;

        if (handle[method] !== undefined) {
            _routes = handle[method].filter(match, {
                proto: req.headers['x-forwarded-proto'] + '://',
                host: req.headers.host,
                pathname: '/404'
            });
        } else {
            _routes = [];
        }

        if (_routes.length) {
            // формирования массива обработчиков маршрута
            for (j = 0; j < _routes.length; j++) {
                _funcs = _funcs.concat(_routes[j].funcs);
            }

            funcs = _funcs.filter(function (elem, index) { return funcs.indexOf(elem) === -1; }, this);

            next(funcs[0]);

        // В случае отсудсвия маршрута 404, вывод ошибки 404
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html; charset=UTF-8');
            res.end('<h1>Page not found</h1>');
        }
    };

    // Функция контроля последовательности
    // выполнения функций связанных с маршрутом
    next = function (caller) {
        var index = funcs.indexOf(caller);

        if (typeof funcs[index] === 'function') {
            funcs[index](req, res, function () {
                next(funcs[index + 1]);
            }, httpErr);
        } else {
            notfound();
        }
    };


    // Определения наличия марщрута в списке
    if (routes.length) {
        // формирования массива обработчиков маршрута
        for (i = 0; i < routes.length; i++) {
            funcs = funcs.concat(routes[i].funcs);
        }

        next(funcs[0]);
    // В случае отсудсвия маршрута, диспетчеризация маршрута 404
    } else {
        notfound();
    }
};