/**
 * Модуль модели гео-региона
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

    var Geo = Backbone.Model.extend({
        localStorage: new Backbone.LocalStorage('ismax')
    });

    return Geo;
});