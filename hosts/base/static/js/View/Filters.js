/**
 * Модуль представления виджетов фильтра
 *
 * @module      View.Filters
 * @category    Client side
 * @main        Prices monitoring service
 * @author      Ismax <admin@ismax.ru>
 */


define([
    'backbone',
    'text!Templates/Filters/Bool.tpl',
    'text!Templates/Popup/Success.tpl',
    'text!Templates/Popup/Error.tpl'
], function (Backbone, _bool, _success, _error) {

    /**
     * Представление виджета BOOL
     *
     * @class       Bool
     * @namespace   View
     * @constructor
     * @extends     Backbone.View
     */
    var Bool = Backbone.View.extend({
        className:  'b-filter__item__widget_bool',

        events: {
            'change select': 'change'
        },

        render: function () {
            this.$el.append(_.template(_bool)({
                option: this.options.option,
                value:  this.options.value
            }));
            return this.$el;
        },

        change: function (e) {
            this.options.accept($(e.currentTarget).val());
        }
    });

    return {
        BOOL: Bool
    };
});