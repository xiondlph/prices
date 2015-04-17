/**
 * Модуль представления списка моделей
 *
 * @module      View.Models
 * @category    Client side
 * @main        Yandex.Market API
 * @author      Ismax <admin@ismax.ru>
 */


define([
    'backbone',
    'validator',
    'View/Popup',
    'text!Templates/Models/Models.tpl',
    'text!Templates/Popup/Success.tpl',
    'text!Templates/Popup/Error.tpl'
], function (Backbone, Validator, Popup, _models, _success, _error) {


    /**
     * Представление списка категорий и моделей
     *
     * @class       List
     * @namespace   View
     * @constructor
     * @extends     Backbone.View
     */
    var List = Backbone.View.extend({
        className:  'b-models b-switch b-switch_animate',

        events: {

        },

        render: function () {
            var me = this,
                popup;

            $.ajax({
                url         : '/models/categories',
                type        : 'POST',
                dataType    : 'json',
                data        : {
                    categoryId: me.options.categoryId
                }
            }).done(function (data) {
                me.$el.append(_.template(_models)(data));
                me.$el.removeClass('b-switch_animate');

                setTimeout(function () {
                    me.options.obj.find('.b-switch_animate').remove();
                }, 200);
            }).fail(function () {
                popup = new Popup({content: $(_error)});
                popup.render();
            });

            me.options.obj.find('.b-switch').addClass('b-switch_animate');
            me.options.obj.append(me.$el);

            return this.$el;
        }
    });

    return {
        List: List
    };
});