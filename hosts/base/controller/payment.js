/**
 * Payment контроллер
 *
 * @module      Hosts.Base.Controller.Payment
 * @class       Controller.Payment
 * @namespace   Hosts.Base
 * @main        Prices monitoring service
 * @author      Ismax <admin@ismax.ru>
 */


// Объявление модулей
var crypto          = require('crypto'),
    nodemailer      = require("nodemailer"),
    fs              = require('fs');


// Логирование уведоблений об оплате
function logPayment(data) {

    // Запись данных уведобления в лог файл
    fs.open(__dirname + '/../../../log/payment.log', 'a', function (e, id) {
        fs.write(id, JSON.stringify(data, null, "\t") + "\n", null, 'utf8', function () {
            fs.close(id);
        });
    });
}


// Отправка оповещения о платеже
function notice(data, subject) {
    var smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'notification@icsystem.ru',
            pass: '474484237QwErT'
        }
    });

    smtpTransport.sendMail({
        from: 'Notification Icsystem <notification@icsystem.ru>',
        to: 'ICSYSTEM ISMAX <support@icsystem.ru>',
        bcc: 'Исмаилов Шухрат <shukhrat@ismax.ru>',
        subject: subject,
        text: JSON.stringify(data, null, "\t"),
        headers: {
            'X-Mailer': 'ICSYSTEM'
        }
    }, function (error, response) {
        if (error) {
            throw new Error('Notice send error - ' + error.message);
        }
    });
}

//---------------------- HTTP запросы ----------------------//


/**
 * Страница контроллера
 *
 * @method index
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
exports.index = function (req, res, next) {
    res.render(__dirname + '/../view/', 'payment');
};


/**
 * Уведомление о платеже
 *
 * @method notification
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
exports.notification = function (req, res, next) {
    var hash,
        quantity = 0;

    // Логирование уведомления
    logPayment(req.params);


    //Уведомление о платеже по email
    notice(req.params, 'Входящий платеж');

    if (req.params) {
        hash = req.params.notification_type + '&' + req.params.operation_id + '&' + req.params.amount + '&' + req.params.currency + '&' + req.params.datetime + '&' + req.params.sender + '&' + req.params.codepro + '&DCb7b4n2+RsQEuk5Mw+V3xOx&' + req.params.label;
        hash = crypto.createHash('sha1').update(hash).digest('hex');

        if (req.params.sha1_hash === hash) {

            if (req.params.codepro === 'false') {
                quantity = Math.ceil(req.params.withdraw_amount / 0.1);
            }

            req.model.secure.incRequestsByEmail(req.params.label, quantity, function (user) {
                if (user) {
                    req.params._requests = user.requests;
                    req.params._quantity = quantity;
                    req.model.payment.add(req.params);

                    //Уведомление об успешном платеже по email
                    notice(req.params, 'Успешный входящий платеж');
                }
            });
        }
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.end();
};

/**
 * Получение последнего уведомления пользователя
 *
 * @method last
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
exports.last = function (req, res, next) {
    req.model.payment.lastByEmail(req.user.email, function (payment) {
        var response = {
            auth: true,
            success: true
        };

        if (payment) {
            response.payment = {
                withdraw_amount:    payment.withdraw_amount,
                datetime:           payment.datetime,
                requests:           payment._requests,
                quantity:           payment._quantity
            };
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application-json; charset=UTF-8');
        res.write(JSON.stringify(response, null, "\t"));
        res.end();
    });
};


/**
 * Получение списка уведомлений пользователя по email
 *
 * @method last
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
exports.list = function (req, res, next) {
    var skip = req.params.skip;

    req.model.payment.listByEmail(req.user.email, skip, 10, function (payments, count) {
        var response = {
            auth: true,
            success: true,
            payments: payments,
            total: count
        };

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application-json; charset=UTF-8');
        res.write(JSON.stringify(response, null, "\t"));
        res.end();
    });
};