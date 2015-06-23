/**
 * Модуль модели параметров фильтра товарных предложений
 *
 * @module      Model.OffersFilterParams
 * @category    Client side
 * @main        Prices monitoring service
 * @author      Ismax <admin@ismax.ru>
 */


define([
    'backbone',
    'localStorage'
], function (Backbone, localStorage) {

    var OffersFilterParams = Backbone.Model.extend({
        localStorage: new Backbone.LocalStorage('ismax')
    });

    return new OffersFilterParams({ id: 'offersFilterParams' });
});