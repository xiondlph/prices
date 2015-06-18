/**
 * Модуль модели параметров фильтра
 *
 * @module      Model.Georegion
 * @category    Client side
 * @main        Prices monitoring service
 * @author      Ismax <admin@ismax.ru>
 */


define([
    'backbone',
    'localStorage'
], function (Backbone, localStorage) {

    var Filter = Backbone.Model.extend({
        localStorage: new Backbone.LocalStorage('ismax')
    });

    return Filter;
});