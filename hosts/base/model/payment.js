/**
 * Модель данных системы платежей
 *
 * @module      Hosts.Base.Model.Payment
 * @class       Hosts.Base.Model.Payment
 * @main        Prices monitoring service
 * @author      Ismax <admin@ismax.ru>
 */


// Объявление модулей
var mongo = require('../../../lib/db');


/**
 * Экспорт методов модели данных системы безопастности
 *
 * @method payment
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
module.exports = function (req, res, next) {


    // Инициализация объекта модели
    if (!req.hasOwnProperty('model')) {
        req.model = {};
    }

    /**
     * Объект модели данных
     * интегрированный в объект запроса
     *
     * @attribute model.payment 
     * @type Object
     */
    req.model.payment = {


        /**
         * Добавление нового уведомления
         *
         * @method add
         * @param {Object} data
         * @param {Function} accept
         */
        add: function (data, accept) {
            mongo.db().collection('payments', function (err, collection) {
                if (err) {
                    throw new Error('Mongo error - ' + err.message);
                }

                collection.insert(data, function (err, payment) {
                    if (err) {
                        throw new Error('Mongo error - ' + err.message);
                    }

                    if (typeof accept === 'function') {
                        accept(payment);
                    }
                });
            });
        },


        /**
         * Получение последнего уведомления пользователя по email
         *
         * @method lastByEmail
         * @param {Object} data
         * @param {Function} accept
         */
        lastByEmail: function (email, accept) {
            mongo.db().collection('payments', function (err, collection) {
                if (err) {
                    throw new Error('Mongo error - ' + err.message);
                }

                collection.findOne({label: email}, {sort: {_id: -1}}, function (err, payment) {
                    if (err) {
                        throw new Error('Mongo error - ' + err.message);
                    }

                    if (typeof accept === 'function') {
                        accept(payment);
                    }
                });
            });
        },


        /**
         * Получение списка уведомлений пользователя по email
         *
         * @method listByEmail
         * @param {Object} data
         * @param {Function} accept
         */
        listByEmail: function (email, skip, limit, accept) {
            skip  = skip  || 0;
            limit = limit || 0;

            mongo.db().collection('payments', function (err, collection) {
                if (err) {
                    throw new Error('Mongo error - ' + err.message);
                }

                collection.find({label: email}, {sort: {_id: -1}}).count(function (err, count) {
                    if (err) {
                        throw new Error('Mongo error - ' + err.message);
                    }

                    collection.find({label: email}, {fields: {'datetime': 1, 'withdraw_amount': 1, '_quantity': 1, '_requests': 1}, sort: {_id: -1}, skip: skip, limit: limit}).toArray(function (err, payments) {
                        if (err) {
                            throw new Error('Mongo error - ' + err);

                        }

                        if (typeof accept === 'function') {
                            accept(payments, count);
                        }
                    });
                });
            });
        }
    };

    next();
};