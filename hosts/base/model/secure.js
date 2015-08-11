/**
 * Модель данных системы безопастности
 *
 * @module      Hosts.Base.Model.Secure
 * @class       Hosts.Base.Model.Secure
 * @main        Prices monitoring service
 * @author      Ismax <admin@ismax.ru>
 */


// Объявление модулей
var mongo = require('../../../lib/db');


/**
 * Экспорт методов модели данных системы безопастности
 *
 * @method secure
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next Следующий слой обработки запроса
 * @param {Object} httpErr Объект перехвата исключений
 */
module.exports = function (req, res, next, httpErr) {
    // Инициализация объекта модели
    if (!req.hasOwnProperty('model')) {
        req.model = {};
    }

    /**
     * Объект модели данных
     * интегрированный в объект запроса
     *
     * @attribute model.secure 
     * @type Object
     */
    req.model.secure = {


        /**
         * Получения пользователя по индексу сессии
         *
         * @method getUserBySession
         * @param {String} index
         * @param {Function} accept
         */
        getUserBySession: function (index, accept) {
            mongo.db().collection('users', function (err, collection) {
                if (err) {
                    throw new Error('Mongo error - ' + err.message);
                }

                collection.findOne({'sid': index}, function (err, user) {
                    if (err) {
                        throw new Error('Mongo error - ' + err.message);
                    }

                    if (typeof accept === 'function') {
                        accept(user);
                    }
                });
            });
        },


        /**
         * Получения пользователя по Email
         *
         * @method getUserByEmail
         * @param {String} email
         * @param {Function} accept
         */
        getUserByEmail: function (email, accept) {
            mongo.db().collection('users', function (err, collection) {
                if (err) {
                    throw new Error('Mongo error - ' + err.message);
                }

                collection.findOne({'email': email}, function (err, user) {
                    if (err) {
                        throw new Error('Mongo error - ' + err.message);
                    }

                    if (typeof accept === 'function') {
                        accept(user);
                    }
                });
            });
        },


        /**
         * Получения пользователя по ключу
         *
         * @method getUserByKey
         * @param {String} key
         * @param {Function} accept
         */
        getUserByKey: function (key, accept) {
            mongo.db().collection('users', function (err, collection) {
                if (err) {
                    throw new Error('Mongo error - ' + err.message);
                }

                collection.findOne({'salt': key}, httpErr.bind(function (err, user) {
                    if (err) {
                        throw new Error('Mongo error - ' + err.message);
                    }

                    if (typeof accept === 'function') {
                        accept(user);
                    }
                }));
            });
        },


        /**
         * Проверка уникальности по Email
         *
         * @method isExistByEmail
         * @param {String} email
         * @param {Function} accept 
         */
        isExistByEmail: function (email, accept) {
            mongo.db().collection('users', function (err, collection) {
                if (err) {
                    throw new Error('Mongo error - ' + err.message);
                }

                collection.count({'email': email}, function (err, count) {
                    if (err) {
                        throw new Error('Mongo error - ' + err.message);
                    }

                    if (typeof accept === 'function') {
                        accept(count);
                    }
                });
            });
        },


        /**
         * Создание нового пользователя
         *
         * @method create
         * @param {Object} user
         * @param {Function} accept
         */
        create: function (user, accept) {
            mongo.db().collection('users', function (err, collection) {
                if (err) {
                    throw new Error('Mongo error - ' + err.message);
                }

                collection.insert({
                    email     : user.email,
                    password  : user.password,
                    salt      : user.salt,
                    active    : user.active
                }, function (err, user) {
                    if (err) {
                        throw new Error('Mongo error - ' + err.message);
                    }

                    if (typeof accept === 'function') {
                        accept(user);
                    }
                });
            });
        },


        /**
         * Установка нового почтового адреса для пользователя
         *
         * @method setEmail
         * @param {String} index
         * @param {String} email
         * @param {Function} accept 
         */
        setEmail: function (index, email, accept) {
            mongo.db().collection('users', function (err, collection) {
                if (err) {
                    throw new Error('Mongo error - ' + err.message);
                }

                collection.update({sid: index}, {$set: {'email': email}}, function (err, result) {
                    if (err) {
                        throw new Error('Mongo error - ' + err.message);
                    }

                    if (typeof accept === 'function') {
                        accept(result);
                    }
                });
            });
        },


        /**
         * Установка хеша текущей сессии для пользователя
         *
         * @method setSession
         * @param {String} email
         * @param {String} index
         * @param {Function} accept 
         */
        setSession: function (email, index, accept) {
            mongo.db().collection('users', function (err, collection) {
                if (err) {
                    throw new Error('Mongo error - ' + err.message);
                }

                collection.update({'email': email}, {$set: {sid: index}}, function (err, result) {
                    if (err) {
                        throw new Error('Mongo error - ' + err.message);
                    }

                    if (typeof accept === 'function') {
                        accept(result);
                    }
                });
            });
        },


        /**
         * Удаление хеша текущей сессии для пользователя
         *
         * @method unsetSession
         * @param {String} index
         * @param {Function} accept
         */
        unsetSession: function (index, accept) {
            mongo.db().collection('users', function (err, collection) {
                if (err) {
                    throw new Error('Mongo error - ' + err.message);
                }

                collection.update({'sid': index}, {$unset: {sid: index}}, function (err, result) {
                    if (err) {
                        throw new Error('Mongo error - ' + err.message);
                    }

                    if (typeof accept === 'function') {
                        accept(result);
                    }
                });
            });
        },


        /**
         * Установка нового пароля для пользователя
         *
         * @method setPassword
         * @param {Number} id
         * @param {String} password
         * @param {Function} accept
         */
        setPassword: function (id, password, accept) {
            mongo.db().collection('users', function (err, collection) {
                if (err) {
                    throw new Error('Mongo error - ' + err.message);
                }

                collection.update({sid: id}, {$set: {password: password}}, function (err, result) {
                    if (err) {
                        throw new Error('Mongo error - ' + err.message);
                    }

                    if (typeof accept === 'function') {
                        accept(result);
                    }
                });
            });
        },


        /**
         * Установка нового пароля для пользователя по Email
         *
         * @method setPasswordByEmail
         * @param {String} email
         * @param {String} password
         * @param {Function} accept
         */
        setPasswordByEmail: function (email, password, accept) {
            mongo.db().collection('users', function (err, collection) {
                if (err) {
                    throw new Error('Mongo error - ' + err.message);
                }

                collection.update({email: email}, {$set: {password: password}}, function (err, result) {
                    if (err) {
                        throw new Error('Mongo error - ' + err.message);
                    }

                    if (typeof accept === 'function') {
                        accept(result);
                    }
                });
            });
        },


        /**
         * Обновление периода действия аккаунта по Email
         *
         * @method updateperiodByEmail
         * @param {String} email
         * @param {String} password
         * @param {Function} accept
         */
        updatePeriodByEmail: function (email, period, accept) {
            mongo.db().collection('users', function (err, collection) {
                if (err) {
                    throw new Error('Mongo error - ' + err.message);
                }

                collection.update({email: email}, {$set: {period: period}}, function (err, result) {
                    if (err) {
                        throw new Error('Mongo error - ' + err.message);
                    }

                    if (typeof accept === 'function') {
                        accept(result);
                    }
                });
            });
        }
    };

    next();
};