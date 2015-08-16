/**
 * User контроллер
 *
 * @module      Hosts.Base.Controller.User
 * @class       Controller.User
 * @namespace   Hosts.Base
 * @main        Prices monitoring service
 * @author      Ismax <admin@ismax.ru>
 */


// Объявление модулей
var crypto            = require('crypto'),
    nodemailer        = require("nodemailer"),
    validator         = require('validator'),
    generatePassword  = require('password-generator');

//---------------------- HTTP запросы ----------------------//


/**
 * Создание пользователя
 *
 * @method create
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 */
exports.create = function (req, res) {
    var response;

    res.setHeader('Access-Control-Allow-Origin', 'http://www.' + req.currentHost + '.ru');

    if (req.params) {
        if (!validator.isEmail(req.params.email)) {
            throw new Error('Validate error - email is invalid');
        }

        req.model.secure.isExistByEmail(req.params.email, function (count) {
            var smtpTransport,
                password,
                data;

            if (count > 0) {
                response = {
                    exist: true
                };

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application-json; charset=UTF-8');
                res.write(JSON.stringify(response, null, "\t"));
                res.end();
            } else {
                password   = generatePassword(12, false);
                data        = {
                    email: req.params.email,
                    active: false
                };

                // Шифрование
                data.password   = crypto.createHmac('sha256', password).digest('hex');
                data.salt       = crypto.createHmac('sha256', req.params.email).digest('hex');

                req.model.secure.create(data, function (user) {

                    req.local.email     = data.email;
                    req.local.password  = password;

                    res.render(__dirname + '/../view/mail', 'register', function (text) {

                        smtpTransport = nodemailer.createTransport({
                            service: 'Gmail',
                            auth: {
                                user: 'support@ismax.ru',
                                pass: '159753qSeFt'
                            }
                        });

                        smtpTransport.sendMail({
                            from: 'Support Ismax <support@ismax.ru>',
                            to: data.email,
                            bcc: 'Notification Ismax <notification@ismax.ru>',
                            subject: 'Регистрация в сервисе ISMAX',
                            text: text,
                            headers: {
                                'X-Mailer': 'ISMAX'
                            }
                        }, function (error, response) {
                            if (error) {
                                response = {
                                    success: false
                                };
                            } else {
                                response = {
                                    success: true
                                };
                            }

                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application-json; charset=UTF-8');
                            res.write(JSON.stringify(response, null, "\t"));
                            res.end();
                        });

                    });
                });
            }
        });
    } else {
        response = {
            success: false
        };

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application-json; charset=UTF-8');
        res.write(JSON.stringify(response, null, "\t"));
        res.end();
    }
};


/**
 * Генирация нового паролья (востановления доступа)
 *
 * @method forgot
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 */
exports.forgot = function (req, res) {
    var response;

    if (req.params) {
        if (!validator.isEmail(req.params.email)) {
            throw new Error('Validate error - email is invalid');
        }

        req.model.secure.getUserByEmail(req.params.email, function (user) {
            var smtpTransport,
                password = generatePassword(12, false);

            if (!user) {
                response = {
                    success: false
                };

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application-json; charset=UTF-8');
                res.write(JSON.stringify(response, null, "\t"));
                res.end();

                return;
            }

            req.model.secure.setPasswordByEmail(req.params.email, crypto.createHmac('sha256', password).digest('hex'), function (result) {

                req.local.password = password;

                res.render(__dirname + '/../view/mail', 'forgot', function (text) {

                    smtpTransport = nodemailer.createTransport({
                        service: 'Gmail',
                        auth: {
                            user: 'support@ismax.ru',
                            pass: '159753qSeFt'
                        }
                    });

                    smtpTransport.sendMail({
                        from: 'Support Ismax <support@ismax.ru>',
                        to: user.email,
                        bcc: 'Notification Ismax <notification@ismax.ru>',
                        subject: 'Востановления доступа к сервису ISMAX',
                        text: text,
                        headers: {
                            'X-Mailer': 'ISMAX'
                        }
                    }, function (error, response) {
                        if (error) {
                            response = {
                                success: false
                            };
                        } else {
                            response = {
                                success: true
                            };
                        }

                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application-json; charset=UTF-8');
                        res.write(JSON.stringify(response, null, "\t"));
                        res.end();
                    });
                });
            });
        });
    }
};


/**
 * Количество оставшихся запросов
 *
 * @method remaining
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 */
exports.remaining = function (req, res) {
    function proceed(user) {
        var format,
            requests;

        if (user) {
            requests = user.requests;
        } else {
            requests = -1;
        }

        format = /[\w\W]*(xml|json)[\w\W]*/.exec(req.url) ? /[\w\W]*(xml|json)[\w\W]*/.exec(req.url)[1] : '';

        res.setHeader('Server', 'ISMAX');
        res.statusCode = 200;
        if (format === 'xml') {
            res.setHeader('Content-Type', 'application/xml;charset=UTF-8');
            res.end('<?xml version="1.0" encoding="UTF-8"?>\n<request remaining="' + requests.toString() + '"/>');
        } else if (format === 'json') {
            res.setHeader('Content-Type', 'application/json;charset=UTF-8');
            res.end('{"request":{"remaining":' + requests.toString() + '}}');
        } else {
            res.setHeader('Content-Type', 'text/html; charset=UTF-8');
            res.end(requests.toString());
        }
    }

    if (req.headers.hasOwnProperty('x-ismax-key')) {
        req.model.secure.getUserByKey(req.headers['x-ismax-key'], proceed);
    } else {
        req.model.secure.getUserByAddress(req.headers['x-forwarded-for'], proceed);
    }
};