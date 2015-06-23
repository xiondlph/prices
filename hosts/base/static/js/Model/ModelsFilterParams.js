/**
 * Модуль модели параметров фильтра списка моделей
 *
 * @module      Model.ModelsFilterParams
 * @category    Client side
 * @main        Prices monitoring service
 * @author      Ismax <admin@ismax.ru>
 */


define([
    'backbone',
    'localStorage'
], function (Backbone, localStorage) {

    var ModelsFilterParams = Backbone.Model.extend({
        localStorage: new Backbone.LocalStorage('ismax')
    });

    return new ModelsFilterParams({ id: 'мodelsFilterParams' });
});