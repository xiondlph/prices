/**
 * Главный модуль приложения - точка входа
 *
 * @module      Main
 * @main        Prices monitoring service
 * @author      Ismax <admin@ismax.ru>
 */

// Объявление модулей
var cluster       = require('cluster'),
    debug         = require('debug')('app');

// Главный процесс
if (cluster.isMaster) {
    debug('%s - Start master', (new Date()).toUTCString());

    cluster.fork();

    // В случае падения процесса, запуск нового (арг. функ - worker)
    cluster.on('disconnect', function () {
        console.error('%s - Worker disconnect!', (new Date()).toUTCString());

        cluster.fork();
    });

// Дочерний процесс
} else {
    debug('%s - Start worker', (new Date()).toUTCString());
    debug('Worker %s pid %s', cluster.worker && cluster.worker.id, process.pid);

    // Модуль web-сервера
    var server        = require('./server');


    // Модуль виртуальных хостов
    var index         = require('./hosts/base');

    // Запуск сервера
    server.start();
}