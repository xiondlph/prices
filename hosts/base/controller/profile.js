/**
 * Profile контроллер
 *
 * @module      Hosts.Base.Controller.Profile
 * @class       Controller.Profile
 * @namespace   Hosts.Base
 * @main        Prices monitoring service
 * @author      Ismax <admin@ismax.ru>
 */


// Объявление модулей
var crypto        = require('crypto'),
    validator     = require('validator');

//---------------------- HTTP запросы ----------------------//


/**
 * Страница контроллера
 *
 * @method index
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 */
exports.index = function (req, res) {
    res.render(__dirname + '/../view/', 'profile');
};


/**
 * Получение данных профиля
 *
 * @method get
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 */
exports.get = function (req, res) {
    var response = {
        auth: true,
        success: true,
        profile: {
            email:    req.user.email,
            requests: req.user.requests
        }
    };

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application-json; charset=UTF-8');
    res.write(JSON.stringify(response, null, "\t"));
    res.end();
};



/**
 * Смена текущего почтового адреса
 *
 * @method email
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 */
exports.email = function (req, res) {
    var response;

    if (req.params) {

        if (!validator.isEmail(req.params.email)) {
            throw new Error('Validate error - email is invalid');
        }

        req.model.secure.isExistByEmail(req.params.email, function (count) {
            if (count > 0) {
                if (req.params.email === req.user.email) {
                    response = {
                        auth: true,
                        success: true,
                        exist: false
                    };
                } else {
                    response = {
                        auth: true,
                        success: true,
                        exist: true
                    };
                }

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application-json; charset=UTF-8');
                res.write(JSON.stringify(response, null, "\t"));
                res.end();
            } else {
                req.model.secure.setEmail(req.sissionId, req.params.email, function (result) {
                    response = {
                        auth: true,
                        success: true,
                        exist: false
                    };

                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application-json; charset=UTF-8');
                    res.write(JSON.stringify(response, null, "\t"));
                    res.end();
                });
            }
        });

    } else {
        response = {
            auth: true,
            success: false
        };

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application-json; charset=UTF-8');
        res.write(JSON.stringify(response, null, "\t"));
        res.end();
    }
};



/**
 * Смена текущего пароля
 *
 * @method password
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 */
exports.password = function (req, res) {
    var response;

    if (req.params) {

        if (!validator.isLength(req.params.password, 1, 255)) {
            throw new Error('Validate error - password is invalid');
        }

        req.model.secure.setPassword(req.sissionId, crypto.createHmac('sha256', req.params.password).digest('hex'), function (result) {
            response = {
                auth: true,
                success: true
            };

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application-json; charset=UTF-8');
            res.write(JSON.stringify(response, null, "\t"));
            res.end();
        });

    } else {
        response = {
            auth: true,
            success: false
        };

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application-json; charset=UTF-8');
        res.write(JSON.stringify(response, null, "\t"));
        res.end();
    }
};


/**
 * Получение информации о доступе
 *
 * @method access
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 */
exports.access = function (req, res) {
    var response = {
        auth: true,
        success: true,
        profile: {
            address:    req.user.address,
            key:        req.user.salt
        }
    };

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application-json; charset=UTF-8');
    res.write(JSON.stringify(response, null, "\t"));
    res.end();
};



/**
 * Установка IP адреса
 *
 * @method setAddress
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 */
exports.setAddress = function (req, res) {
    var response;

    if (req.params) {

        if (!validator.isLength(req.params.address, 1, 255)) {
            throw new Error('Validate error - address is invalid');
        }

        if (!validator.isIP(req.params.address)) {
            throw new Error('Validate error - address is invalid');
        }

        req.model.secure.setAddress(req.sissionId, req.params.address, function (result) {
            response = {
                auth: true,
                success: true
            };

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application-json; charset=UTF-8');
            res.write(JSON.stringify(response, null, "\t"));
            res.end();
        });

    } else {
        response = {
            auth: true,
            success: false
        };

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application-json; charset=UTF-8');
        res.write(JSON.stringify(response, null, "\t"));
        res.end();
    }
};