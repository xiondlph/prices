/**
 * Модуль представления списка магазинов
 *
 * @module      View.Shops
 * @category    Client side
 * @main        Prices monitoring service
 * @author      Ismax <admin@ismax.ru>
 */


define([
    'backbone',
    'View/Popup',
    'View/Georegion',
    'text!Templates/Shops/Loader.tpl',
    'text!Templates/Shops/Layout.tpl',
    'text!Templates/Popup/Success.tpl',
    'text!Templates/Popup/Error.tpl'
], function (Backbone, PopupView, GeoregionView, _loader, _layout, _success, _error) {


    /**
     * Представление списка гео-регионов
     *
     * @class       Layout
     * @namespace   View
     * @constructor
     * @extends     Backbone.View
     */
    var Layout = Backbone.View.extend({
        className:  'b-shops',

        events: {
            'click .j-shops__item__link':   'selectItem',
            'click .j-page':                'page'
        },

        render: function () {
            this.options.page   = 1;
            this.fetch();
            return this.$el;
        },

        fetch: function () {
            this.result = {};
            this.$el.html(_.template(_loader));

            this.list();
        },

        page: function (e) {
            e.preventDefault();
            if ($(e.currentTarget).data('page')) {
                this.options.page = $(e.currentTarget).data('page');
                this.fetch();
            }
        },

        selectItem: function (e) {
            e.preventDefault();
            this.options.setValue($(e.currentTarget).data('id').toString());
        },

        list: function () {
            var me = this,
                popup;

            $.ajax({
                url         : '/model/outlets',
                type        : 'POST',
                dataType    : 'json',
                data        : {
                    modelId:    me.options.modelId,
                    geo_id:     GeoregionView.getGeoId(),
                    page:       me.options.page,
                    count:      9
                }
            }).done(function (data) {
                me.result.outlets = data.outlets;
                me.statge();
            }).fail(function () {
                popup = new PopupView({content: $(_error)});
                popup.render();
            });
        },

        statge: function () {
            if (this.result.hasOwnProperty('outlets')) {
                this.$el.html(_.template(_layout)(this.result));
            }
        }
    });


    return {
        Layout:         Layout
    };
});