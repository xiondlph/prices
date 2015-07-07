/**
 * Модуль модели параметров фильтра списка отзывов на товар
 *
 * @module      Model.ReviewsFilterParams
 * @category    Client side
 * @main        Prices monitoring service
 * @author      Ismax <admin@ismax.ru>
 */


define([
    'backbone',
    'localStorage'
], function (Backbone, localStorage) {

    var ReviewsFilterParams = Backbone.Model.extend({
        localStorage: new Backbone.LocalStorage('ismax')
    });

    return new ReviewsFilterParams({ id: 'reviewsFilterParams' });
});