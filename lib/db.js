/**
 * Адаптер Базы данных MongoDB
 *
 * @module      Lib.Db
 * @class       Db
 * @namespace   Lib
 * @main        Prices monitoring service
 * @author      Ismax <admin@ismax.ru>
 */


// Объявление модулей
var mongo               = require('mongodb'),
    Server              = mongo.Server,
    ReplSet             = mongo.ReplSet,
    Db                  = mongo.Db,
    BSON                = mongo.BSONPure,

    // Набор реплисетов
    // replSet = new ReplSet([
    //     new Server('185.20.224.62', 27017),
    //     new Server('151.248.118.151', 27017)
    // ]),

    // Объект БД
    db = new Db('ismax', new Server('ds059722.mongolab.com', 59722), {safe: true}),

    // Инициализация объекта БД для последующего
    // экспорта (до соединения и авторизации)
    _db = {};

// Соединение с БД (во время запуска сервера)
db.open(function (err, db) {
    if (err) {
        throw new Error('Mongo error - ' + err.message);
    }

    // Авторизация
    db.authenticate('ismax', '474484237QwErT', function (err, result) {
        if (err) {
            throw new Error('Mongo error - ' + err.message);
        }

        _db = db;
    });
});


/**
 * Експорт объекта базы данных
 *
 * @method db
 * @return {Object} db
 */
exports.db = function () {
    return _db;
};


/**
 * Експорт объекта bson
 *
 * @attribute bson
 * @type Object
 */
exports.bson = BSON;