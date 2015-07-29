/**
 * Модуль представления списка категорий
 *
 * @module      View.Categories
 * @category    Client side
 * @main        Prices monitoring service
 * @author      Ismax <admin@ismax.ru>
 */


define([
    'backbone',
    'validator',
    'View/Popup',
    'View/Georegion',
    'View/Search',
    'text!Templates/Offers/Loader.tpl',
    'text!Templates/Categories/Layout.tpl',
    'text!Templates/Popup/Success.tpl',
    'text!Templates/Popup/Error.tpl'
], function (Backbone, Validator, PopupView, GeoregionView, SearchView, loaderTpl, layoutTpl, successTpl, errorTpl) {


    /**
     * Представление списка товарных предложений
     *
     * @class       Layout
     * @namespace   View
     * @constructor
     * @extends     Backbone.View
     */
    var Layout = Backbone.View.extend({
        className:  'b-categories b-switch b-switch_animate',

        events: {

        },

        render: function () {
            var me = this;

            me.result = {};
            me.category();
            me.categories();

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

        categories: function () {
            var me = this,
                popup;

            $.ajax({
                url         : '/categories',
                type        : 'POST',
                dataType    : 'json',
                data        : {
                    categoryId: me.options.categoryId,
                    geo_id:     GeoregionView.getGeoId(),
                    count:      30
                }
            }).done(function (data) {
                me.result.categories = data.categories;
                me.statge();
            }).fail(function () {
                popup = new PopupView({content: $(errorTpl)});
                popup.render();
            });
        },

        category: function () {
            var me = this,
                popup;

            $.ajax({
                url         : '/category',
                type        : 'POST',
                dataType    : 'json',
                data        : {
                    categoryId: me.options.categoryId,
                    geo_id:     GeoregionView.getGeoId()
                }
            }).done(function (data) {
                me.result.category = data.category;
                me.statge();
            }).fail(function () {
                popup = new PopupView({content: $(errorTpl)});
                popup.render();
            });
        },

        statge: function () {
            var georegionPanel,
                searchPanel;

            if (this.result.hasOwnProperty('categories') && this.result.hasOwnProperty('category')) {
                this.$el.html(_.template(layoutTpl)(this.result));

                georegionPanel      = new GeoregionView.Panel();
                searchPanel         = new SearchView.Panel({
                    categoryId:     this.options.categoryId
                });

                this.$el.find('.j-georegion').html(georegionPanel.render());
                this.$el.find('.j-search_panel').html(searchPanel.render());
            }
        }
    });

    return {
        Layout: Layout
    };
});