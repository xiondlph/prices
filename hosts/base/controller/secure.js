/**
 * Secure контроллер
 *
 * @module      Hosts.Base.Controller.Secure
 * @class       Controller.Secure
 * @namespace   Hosts.Base
 * @main        Prices monitoring service
 * @author      Ismax <admin@ismax.ru>
 */


// Объявление модулей
var crypto        = require('crypto'),
    validator     = require('validator'),
    url           = require('url'),
    cookie        = require('../../../lib/cookie');

//---------------------- HTTP запросы ----------------------//


/**
 * Страница контроллера
 *
 * @method index
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 */
exports.index = function (req, res) {
    res.render(__dirname + '/../view/', 'secure');
};


/**
 * Получение пользователя
 *
 * @method user
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
exports.user = function (req, res, next) {
    var _cookie = [];

    if (res.getHeader('Set-Cookie')) { _cookie.push(res.getHeader('Set-Cookie')); }

    req.model.secure.getUserBySession(req.sissionId, function (user) {
        if (user) {
            _cookie.push('ismax_auth=true; path=/; domain=' + req.currentHost + '.ru;');
            res.setHeader('Set-Cookie', _cookie);

            user._active    = user.period > Date.now();
            req.user        = user;
            req.local.user  = user;
        } else {
            _cookie.push('ismax_auth=false; path=/; domain=' + req.currentHost + '.ru;');
            res.setHeader('Set-Cookie', _cookie);
        }
        next();
    });
};


/**
 * Переход на протокол https
 *
 * @method https
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
exports.https = function (req, res, next) {
    if (req.headers['x-forwarded-proto'] === 'http') {
        res.statusCode = 302;
        res.setHeader('Location', 'https://' + req.headers['x-host'] + req.url);
        res.end();
        return;
    }

    next();
};

/**
 * Переход на протокол http
 *
 * @method http
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
exports.http = function (req, res, next) {
    if (req.headers['x-forwarded-proto'] === 'https') {
        res.statusCode = 302;
        res.setHeader('Location', 'http://' + req.headers['x-host'] + req.url);
        res.end();
        return;
    }

    next();
};


/**
 * Проверка авторизации
 *
 * @method auth
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
exports.auth = function (req, res, next) {

    var _cookie = cookie.parse(req.headers.cookie),
        response,
        auth;

    if (_cookie && _cookie.ismax_auth && _cookie.ismax_auth === 'true') {
        auth = true;
    } else {
        auth = false;
    }


    if (req.headers['x-forwarded-proto'] === 'http' && auth) {
        res.statusCode = 302;
        res.setHeader('Location', 'https://' + req.headers['x-host'] + req.url);
        res.end();
        return;
    }

    if (req.headers['x-forwarded-proto'] === 'https' && !auth) {
        res.statusCode = 302;
        res.setHeader('Location', 'http://' + req.headers['x-host'] + req.url);
        res.end();
        return;
    }

    if (auth && !req.user) {
        if (req.headers['x-requested-with'] && req.headers['x-requested-with'] === 'XMLHttpRequest') {
            response = {
                auth: false
            };

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application-json; charset=UTF-8');
            res.write(JSON.stringify(response, null, "\t"));
            res.end();
            return;
        }

        res.statusCode = 302;
        res.setHeader('Location', 'https://www.' + req.currentHost + '.ru/user');
        res.end();
        return;
    }

    next();
};


/**
 * Проверка на активность
 *
 * @method active
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
exports.active = function (req, res, next) {
    var response;

    if (req.user && !req.user._active) {
        if (req.headers['x-requested-with'] && req.headers['x-requested-with'] === 'XMLHttpRequest') {
            response = {
                errors: ['Not permitted']
            };

            res.statusCode = 403;
            res.setHeader('Content-Type', 'application-json; charset=UTF-8');
            res.write(JSON.stringify(response, null, "\t"));
            res.end();
            return;
        }

        res.statusCode = 302;
        res.setHeader('Location', 'https://www.' + req.currentHost + '.ru/profile');
        res.end();
        return;
    }

    next();
};


/**
 * Проверка на НЕ авторизованность
 *
 * @method guest
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
exports.guest = function (req, res, next) {
    var _cookie = cookie.parse(req.headers.cookie),
        response,
        auth;

    if (_cookie && _cookie.ismax_auth && _cookie.ismax_auth === 'true') {
        auth = true;
    } else {
        auth = false;
    }

    if (!auth && !req.user) {
        next();
        return;
    }

    if (req.headers['x-requested-with'] && req.headers['x-requested-with'] === 'XMLHttpRequest') {
        response = {
            auth: true
        };

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application-json; charset=UTF-8');
        res.write(JSON.stringify(response, null, "\t"));
        res.end();
        return;
    }

    res.statusCode = 302;
    if (req.user._active) {
        res.setHeader('Location', 'https://www.' + req.currentHost + '.ru/categories');
    } else {
        res.setHeader('Location', 'https://www.' + req.currentHost + '.ru/profile');
    }
    res.end();
    return;
};


/**
 * Авторизация
 *
 * @method signin
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 */
exports.signin = function (req, res) {
    var response;

    if (req.params) {

        if (!validator.isEmail(req.params.email)) {
            throw new Error('Validate error - email is invalid');
        }

        req.model.secure.getUserByEmail(req.params.email, function (user) {
            if (!user) {
                response = {
                    auth: false
                };

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application-json; charset=UTF-8');
                res.write(JSON.stringify(response, null, "\t"));
                res.end();

                return;
            }

            if (crypto.createHmac('sha256', req.params.password).digest('hex') !== user.password) {
                response = {
                    auth: false
                };

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application-json; charset=UTF-8');
                res.write(JSON.stringify(response, null, "\t"));
                res.end();
                return;
            }

            req.model.secure.setSession(req.params.email, req.sissionId, function (result) {
                response = {
                    auth: true
                };

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application-json; charset=UTF-8');
                res.write(JSON.stringify(response, null, "\t"));
                res.end();
            });
        });
    } else {
        response = {
            auth: false
        };

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application-json; charset=UTF-8');
        res.write(JSON.stringify(response, null, "\t"));
        res.end();
    }
};


/**
 * Выход из сессии
 *
 * @method signout
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 */
exports.signout = function (req, res) {
    req.model.secure.unsetSession(req.sissionId, function (result) {
        res.statusCode = 302;
        res.setHeader('Location', req.headers.referer.replace('https', 'http'));
        res.end();
    });
};


/**
 * Заголовок для OPTIONS запросов (разрешительный заголовок для кросс-доменных запросов)
 *
 * @method options
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 */
exports.options = function (req, res) {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', 'http://www.' + req.currentHost + '.ru');
    res.end();
};