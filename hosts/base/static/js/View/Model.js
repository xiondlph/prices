/**
 * Модуль представления информации о модели
 *
 * @module      View.Model
 * @category    Client side
 * @main        Prices monitoring service
 * @author      Ismax <admin@ismax.ru>
 */


define([
    'backbone',
    'View/Popup',
    'View/Georegion',
    'text!Templates/Model/Loader.tpl',
    'text!Templates/Model/Layout.tpl',
    'text!Templates/Popup/Success.tpl',
    'text!Templates/Popup/Error.tpl'
], function (Backbone, PopupView, GeoregionView, loaderTpl, layoutTpl, successPopupTpl, errorPopupTpl) {


    /**
     * Представление информации о модели
     *
     * @class       Layout
     * @namespace   View
     * @constructor
     * @extends     Backbone.View
     */
    var Layout = Backbone.View.extend({
        className:  'b-model b-switch b-switch_animate',

        events: {

        },

        render: function () {
            var me = this;

            me.result   = {};

            me.getModel();

            me.$el.append(_.template(loaderTpl));
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


        getModel: function () {
            var me = this,
                popup;

            $.ajax({
                url         : '/model',
                type        : 'POST',
                dataType    : 'json',
                data        : {
                    modelId:    me.options.modelId,
                    geo_id:     GeoregionView.getGeoId()
                }
            }).done(function (data) {
                me.result.model = data.model;
                me.getCategory(me.result.model.categoryId);
                me.statge();
            }).fail(function () {
                popup = new PopupView({content: $(errorPopupTpl)});
                popup.render();
            });
        },

        getCategory: function (categoryId) {
            var me = this,
                popup;

            $.ajax({
                url         : '/category',
                type        : 'POST',
                dataType    : 'json',
                data        : {
                    categoryId: categoryId,
                    geo_id:     GeoregionView.getGeoId()
                }
            }).done(function (data) {
                me.result.category = data.category;
                me.statge();
            }).fail(function () {
                popup = new PopupView({content: $(errorPopupTpl)});
                popup.render();
            });
        },

        statge: function () {
            var georegion;

            if (this.result.hasOwnProperty('model') && this.result.hasOwnProperty('category')) {
                this.$el.html(_.template(layoutTpl)({
                    category:   this.result.category,
                    model:      this.result.model
                }));

                georegion = new GeoregionView.Panel();
                this.$el.find('.j-georegion').html(georegion.render());
            }
        }
    });

    return {
        Layout: Layout
    };
});