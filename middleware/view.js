/**
 * Слой работы с шаблоном
 *
 * @module      Middleware.View
 * @class       View
 * @namespace   Middleware
 * @main        Prices monitoring service
 * @author      Ismax <admin@ismax.ru>
 */


// Объявление модулей
var JUST = require('just');

//---------------------- HTTP запросы ----------------------//

/**
 * Экспорт метода рендиринг заданного шаблона
 *
 * @method view
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
module.exports = function (req, res, next) {

    /**
     * Метод рендиринга заданного шаблона (метод интегрирован в объект запроса)
     * 
     * @method render
     * @param {String} root Корневая директория шаблонов
     * @param {String} page Название файла шаблона
     * @param {Boolean} _return Флаг возврата/редиринга контента
     */
    res.render = function (root, page, accept) {
        var just = new JUST({ root : root, useCache : false, ext : '.tpl', open: '<#', close: '#>' });

        just.render(page, req.local, function (err, html) {
            if (err) {
                throw new Error('Just error - ' + err.message);
            }

            if (typeof accept === 'function') {
                accept(html);
                return true;
            }

            //res.statusCode = 200;
            if (!res.getHeader('Content-Type')) {
                res.setHeader('Content-Type', 'text/html; charset=UTF-8');
            }

            res.write(html);
            res.end();
        });
    };

    next();
};