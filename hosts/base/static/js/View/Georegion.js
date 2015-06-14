/**
 * Модуль представления гео-регионов
 *
 * @module      View.Georegion
 * @category    Client side
 * @main        Prices monitoring service
 * @author      Ismax <admin@ismax.ru>
 */


define([
    'backbone',
    'Model/Geo',
    'View/Popup',
    'text!Templates/Georegion/Loader.tpl',
    'text!Templates/Georegion/Layout.tpl',
    'text!Templates/Georegion/Panel.tpl',
    'text!Templates/Popup/Success.tpl',
    'text!Templates/Popup/Error.tpl'
], function (Backbone, Geo, Popup, _loader, _layout, _panel, _success, _error) {

    var GeoModel = new Geo({ id: 'geo' }),

        getGeoModel = function () {
            return GeoModel;
        },


        /**
         * Представление списка гео-регионов
         *
         * @class       Layout
         * @namespace   View
         * @constructor
         * @extends     Backbone.View
         */
        Layout = Backbone.View.extend({
            className:  'b-georegion',

            events: {
                'click .j-georegion':   'select',
                'click .j-page':        'page'
            },

            render: function () {
                this.options.geoId  = 10000;
                this.options.page   = 1;
                this.fetch();
                return this.$el;
            },

            fetch: function () {
                this.result = {};
                this.$el.html(_.template(_loader));

                this.path();
                this.list();
            },

            page: function (e) {
                e.preventDefault();
                if ($(e.currentTarget).data('page')) {
                    this.options.page = $(e.currentTarget).data('page');
                    this.fetch();
                }
            },

            select: function (e) {
                var items;

                e.preventDefault();
                if ($(e.currentTarget).data('id')) {
                    items = this.result.georegions.items[$(e.currentTarget).parents('.b-grid__row').index()];
                    GeoModel.save({
                        id:     'geo',
                        geo:    items.id,
                        name:   items.name
                    });

                    this.options.geoId = $(e.currentTarget).data('id');
                    this.fetch();
                }
            },

            path: function () {
                var me = this,
                    popup;

                $.ajax({
                    url         : 'georegion/path',
                    type        : 'POST',
                    dataType    : 'json',
                    data        : {
                        geo_id: me.options.geoId
                    }
                }).done(function (data) {
                    me.result.path = data.path;
                    me.statge();
                }).fail(function () {
                    popup = new Popup({content: $(_error)});
                    popup.render();
                });
            },

            list: function () {
                var me = this,
                    popup;

                $.ajax({
                    url         : '/georegions',
                    type        : 'POST',
                    dataType    : 'json',
                    data        : {
                        geo_id: me.options.geoId,
                        page:   me.options.page,
                        count:      5
                    }
                }).done(function (data) {
                    me.result.georegions = data.georegions;
                    me.statge();
                }).fail(function () {
                    popup = new Popup({content: $(_error)});
                    popup.render();
                });
            },

            statge: function () {
                if (this.result.hasOwnProperty('path') && this.result.hasOwnProperty('georegions')) {
                    this.$el.html(_.template(_layout)(this.result));
                }
            }
        }),


        /**
         * Представление панели гео-регионов
         *
         * @class       Panel
         * @namespace   View
         * @constructor
         * @extends     Backbone.View
         */
        Panel = Backbone.View.extend({
            className:  'b-georegion-panel',

            events: {
                'click .j-georegion_select': 'selectRegion'
            },

            initialize: function () {
                GeoModel.on('change', this.changeRegion, this);
            },

            render: function () {
                this.$el.html(_.template(_panel)(GeoModel.toJSON()));
                return this.$el;
            },

            selectRegion: function (e) {
                var georegion,
                    popup;

                e.preventDefault();

                georegion = new Layout();
                popup = new Popup({content: georegion.render()});
                popup.render();
            },

            changeRegion: function (model) {
                this.$el.html(_.template(_panel)(GeoModel.toJSON()));
            }
        });


    GeoModel.fetch();

    return {
        getGeoModel:    getGeoModel,
        Layout:         Layout,
        Panel:          Panel
    };
});