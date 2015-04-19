/**
 * Модуль представления списка товарных предложений
 *
 * @module      View.Offers
 * @category    Client side
 * @main        Yandex.Market API
 * @author      Ismax <admin@ismax.ru>
 */


define([
    'backbone',
    'validator',
    'View/Popup',
    'text!Templates/Offers/Offers.tpl',
    'text!Templates/Offers/List.tpl',
    'text!Templates/Popup/Success.tpl',
    'text!Templates/Popup/Error.tpl'
], function (Backbone, Validator, Popup, _offers, _list, _success, _error) {


    /**
     * Представление списка категорий и товарных предложений
     *
     * @class       List
     * @namespace   View
     * @constructor
     * @extends     Backbone.View
     */
    var List = Backbone.View.extend({
        className:  'b-offers b-switch b-switch_animate',

        events: {

        },

        render: function () {
            var me = this;

            me.list(me.options.modelId, me.options.page);

            me.$el.append(_.template(_offers));
            me.options.obj.find('.b-switch').addClass('b-switch_animate');
            me.options.obj.append(me.$el);
            setTimeout(function () {
                me.$el.removeClass('b-switch_animate');
            });

            setTimeout(function () {
                me.options.obj.find('.b-switch_animate').remove();
            }, 200);

            return this.$el;
        },

        list: function (modelId, page) {
            var me = this,
                popup;

            $.ajax({
                url         : '/offers',
                type        : 'POST',
                dataType    : 'json',
                data        : {
                    modelId: modelId,
                    page:       page
                }
            }).done(function (data) {
                data = _.extend(data, {modelId: modelId});
                me.$el.find('.j-offers').replaceWith(_.template(_list)(data));
            }).fail(function () {
                popup = new Popup({content: $(_error)});
                popup.render();
            });
        }
    });

    return {
        List: List
    };
});