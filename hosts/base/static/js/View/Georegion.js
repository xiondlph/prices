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


        /**
         * Получение модели текущего гео-региона
         *
         * @method getGeoModel
         * @return {Object} GeoModel
         */
        getGeoModel = function () {
            return GeoModel;
        },


        /**
         * Получение id текущего гео-региона
         *
         * @method getGeoModel
         * @return {Object} GeoModel
         */
        getGeoId = function () {
            return GeoModel.get('geo') || 213;
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
                'click .j-georegion__path':             'selectPath',
                'click .j-georegion__item__select':     'selectItem',
                'click .j-georegion__item__forward':    'forward',
                'click .j-page':                        'page'
            },

            render: function () {
                this.options.geoId  = GeoModel.get('geo') || 10000;
                this.options.page   = 1;
                this.fetch();
                return this.$el;
            },

            fetch: function () {
                this.result = {};
                this.$el.html(_.template(_loader));

                this.region();
                this.list();
            },

            page: function (e) {
                e.preventDefault();
                if ($(e.currentTarget).data('page')) {
                    this.options.page = $(e.currentTarget).data('page');
                    this.fetch();
                }
            },

            selectPath: function (e) {
                var id;

                e.preventDefault();
                id = $(e.currentTarget).data('id');

                GeoModel.save({
                    id:     'geo',
                    geo:    id
                });

                this.options.geoId = id;
                this.fetch();
            },

            selectItem: function (e) {
                var item,
                    index = $(e.currentTarget).data('index');

                e.preventDefault();
                item = this.result.georegions.items[index];
                if (item) {
                    GeoModel.save({
                        id:     'geo',
                        geo:    item.id
                    });

                    this.options.geoId = item.id;
                    this.fetch();
                }
            },

            region: function () {
                var me = this,
                    popup;

                $.ajax({
                    url         : '/georegion',
                    type        : 'POST',
                    dataType    : 'json',
                    data        : {
                        geo_id: me.options.geoId
                    }
                }).done(function (data) {
                    me.result.region = data.georegion;
                    me.statge();

                    GeoModel.save({
                        id:     'geo',
                        name:   data.georegion.name,
                        parent: data.georegion.parentId
                    });
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
                        count:      6
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
                if (this.result.hasOwnProperty('region') && this.result.hasOwnProperty('georegions')) {
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

            changeRegion: function () {
                this.$el.html(_.template(_panel)(GeoModel.toJSON()));
            }
        });


    GeoModel.fetch();

    return {
        getGeoModel:    getGeoModel,
        getGeoId:       getGeoId,
        Layout:         Layout,
        Panel:          Panel
    };
});