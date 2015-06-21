/**
 * Модуль модели параметров фильтра товарных предложений
 *
 * @module      Model.OffersFilter
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