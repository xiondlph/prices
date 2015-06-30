/**
 * Модуль представления страницы поиска
 *
 * @module      View.Search
 * @category    Client side
 * @main        Prices monitoring service
 * @author      Ismax <admin@ismax.ru>
 */


define([
    'backbone',
    'View/Popup',
    'View/Georegion',
    'text!Templates/Search/Loader.tpl',
    'text!Templates/Search/Layout.tpl',
    'text!Templates/Search/Search.tpl',
    'text!Templates/Search/Panel.tpl',
    'text!Templates/Popup/Success.tpl',
    'text!Templates/Popup/Error.tpl'
], function (Backbone, PopupView, GeoregionView, loaderTpl, layoutTpl, searchTpl, panelTpl, successPopupTpl, errorPopupTpl) {


        /**
         * Представление панели формы поиска
         *
         * @class       Panel
         * @namespace   View
         * @constructor
         * @extends     Backbone.View
         */
    var Panel = Backbone.View.extend({
            className:  'b-search-form',
            tagName:    'form',

            events: {
                'submit': 'searchFormSubmit'
            },

            render: function () {
                this.$el.html(_.template(panelTpl)({searchText: this.options.searchText}));
                return this.$el;
            },

            searchFormSubmit: function (e) {
                e.preventDefault();
                window.location.href = '/search#' + this.options.categoryId + '/' + this.$el.find('.j-search-form__input').val();
            }
        }),


        /**
         * Представление страницы поиска
         *
         * @class       Layout
         * @namespace   View
         * @constructor
         * @extends     Backbone.View
         */
        Layout = Backbone.View.extend({
            className:  'b-search b-switch b-switch_animate',

            events: {
                'submit':   'searchFormSubmit'
            },

            render: function () {
                var me = this;

                me.result   = {};

                me.getCategory();

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


            getSearch: function (text, page) {
                var me = this,
                    popup;

                $.ajax({
                    url         : '/search',
                    type        : 'POST',
                    dataType    : 'json',
                    data        : {
                        category_id:    me.options.categoryId,
                        geo_id:         GeoregionView.getGeoId(),
                        text:           text,
                        page:           page
                    }
                }).done(function (data) {
                    var call;

                    if (me.result.hasOwnProperty('search')) {
                        call = me.list.bind(me);
                    } else {
                        call = me.statge.bind(me);
                    }

                    me.result.search = data.searchResult;
                    call();
                }).fail(function () {
                    popup = new PopupView({content: $(errorPopupTpl)});
                    popup.render();
                });
            },

            getCategory: function () {
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
                    popup = new PopupView({content: $(errorPopupTpl)});
                    popup.render();
                });
            },

            statge: function () {
                var georegion,
                    searchPanel;

                if (this.result.hasOwnProperty('search') && this.result.hasOwnProperty('category')) {
                    this.$el.html(_.template(layoutTpl)({
                        category:   this.result.category
                    }));

                    this.list();

                    georegion   = new GeoregionView.Panel();
                    searchPanel = new Panel({
                        categoryId:     this.result.category.id,
                        searchText:     this.result.search.requestParams.text
                    });

                    this.$el.find('.j-georegion').html(georegion.render());
                    this.$el.find('.j-search_panel').html(searchPanel.render());
                }
            },

            list: function () {
                this.$el.find('.j-search').html(_.template(searchTpl)({categoryId: this.options.categoryId, search: this.result.search}));
            }
        });


    return {
        Layout: Layout,
        Panel:  Panel
    };
});