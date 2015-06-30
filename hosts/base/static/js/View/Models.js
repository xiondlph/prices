/**
 * Модуль представления списка моделей
 *
 * @module      View.Models
 * @category    Client side
 * @main        Prices monitoring service
 * @author      Ismax <admin@ismax.ru>
 */


define([
    'backbone',
    'Model/ModelsFilterParams',
    'Store/ModelsFilterParams',
    'View/Popup',
    'View/Georegion',
    'View/Search',
    'View/Filter',
    'text!Templates/Models/Loader.tpl',
    'text!Templates/Models/Layout.tpl',
    'text!Templates/Models/Models.tpl',
    'text!Templates/Partials/Filter.tpl',
    'text!Templates/Popup/Success.tpl',
    'text!Templates/Popup/Error.tpl'
], function (Backbone, ModelsFilterParamsModel, ModelsFilterParamsStore, PopupView, GeoregionView, SearchView, FilterView, loaderTpl, layoutTpl, modelsTpl, filterTpl, successPopupTpl, errorPopupTpl) {


    /**
     * Представление списка моделей
     *
     * @class       Layout
     * @namespace   View
     * @constructor
     * @extends     Backbone.View
     */
    var Layout = Backbone.View.extend({
        className:  'b-models b-switch b-switch_animate',

        events: {
            'click .j-filter__item_label':      'toggleFilterItem',
            'click .j-filter__reset':           'filterReset'
        },

        render: function () {
            var me = this;

            me.result   = {};

            if (ModelsFilterParamsModel.get('categoryId') === this.options.categoryId) {
                me.params = ModelsFilterParamsModel.get('params');
            } else {
                me.params   = {};
            }

            me.getPath();
            me.getFilter();

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

        toggleFilterItem: function (e) {
            var widget,
                type,
                me      = this,
                item    = $(e.currentTarget).parent(),
                option  = this.result.filter[item.attr('filter-index')],
                value   = item.attr('filter-value');

            e.preventDefault();
            item.toggleClass('b-filter__item_open');

            if (item.hasClass('b-filter__item_open') && FilterView.hasOwnProperty(option.type)) {
                if (option.shortname === 'Vendor') {
                    type = 'VENDOR';
                } else {
                    type = option.type;
                }

                widget = new FilterView[type]({option: option, value: value, accept: function (value) {
                    var key;

                    if (option.shortname === 'Vendor') {
                        key = 'vendor_id';
                    } else {
                        key = option.id;
                    }

                    if (value && value.length > 0) {
                        item.attr('filter-value', value);
                        me.params[key] = value;
                    } else {
                        item.removeAttr('filter-value');
                        delete me.params[key];
                    }

                    me.filterChangeWait();
                }});
                $(e.currentTarget).next().html(widget.render());
            } else {
                $(e.currentTarget).next().html('');
            }
        },

        filterChange: function () {
            ModelsFilterParamsModel.save({
                id:         'мodelsFilterParams',
                categoryId: this.options.categoryId,
                params:     this.params
            });

            this.options.reloadModels();
        },

        filterChangeWait: _.debounce(function () {
            this.filterChange();
        }, 1000),

        getPath: function () {
            var me = this,
                popup;

            $.ajax({
                url         : '/path',
                type        : 'POST',
                dataType    : 'json',
                data        : {
                    categoryId: me.options.categoryId || 90401,
                    geo_id:     GeoregionView.getGeoId()
                }
            }).done(function (data) {
                me.result.path = data.path;
                me.statge();
            }).fail(function () {
                popup = new PopupView({content: $(errorPopupTpl)});
                popup.render();
            });
        },

        getModels: function (categoryId, page) {
            var me          = this,
                params      = _.extend({}, me.params),
                _categoryId = categoryId || 90401,
                popup;

            params.categoryId   = _categoryId;
            params.page         = page;
            params.count        = 30;
            params.geo_id       = GeoregionView.getGeoId();

            $.ajax({
                url         : '/models',
                type        : 'POST',
                dataType    : 'json',
                data        : params
            }).done(function (data) {
                var call;

                if (me.result.hasOwnProperty('models')) {
                    call = me.list.bind(me);
                } else {
                    call = me.statge.bind(me);
                }

                me.result.models = _.extend(data.models, {categoryId: categoryId});
                call();

            }).fail(function () {
                popup = new PopupView({content: $(errorPopupTpl)});
                popup.render();
            });
        },

        getFilter: function () {
            var me = this,
                popup;

            $.ajax({
                url         : '/filters',
                type        : 'POST',
                dataType    : 'json',
                data        : {
                    categoryId: me.options.categoryId || 90401,
                    geo_id:     GeoregionView.getGeoId()
                }
            }).done(function (data) {
                me.result.filter = ModelsFilterParamsStore.concat(data.filters);
                me.statge();
            }).fail(function () {
                popup = new PopupView({content: $(errorPopupTpl)});
                popup.render();
            });
        },

        statge: function () {
            var georegion;

            if (this.result.hasOwnProperty('path') && this.result.hasOwnProperty('models') && this.result.hasOwnProperty('filter')) {
                this.$el.html(_.template(layoutTpl)({
                    path: this.result.path
                }));

                this.$el.find('.j-filters').html(_.template(filterTpl)({filter: this.result.filter, params: this.params}));
                this.list();

                georegionPanel      = new GeoregionView.Panel();
                searchPanel         = new SearchView.Panel({
                    categoryId:     this.options.categoryId
                });

                this.$el.find('.j-georegion').html(georegionPanel.render());
                this.$el.find('.j-search_panel').html(searchPanel.render());
            }
        },

        list: function () {
            this.$el.find('.j-models').html(_.template(modelsTpl)({models: this.result.models}));
        },

        filterReset: function () {
            if (this.$el.find('.j-filter__item[filter-value]').length) {
                this.$el.find('.j-filter__item_widget').text('').parent()
                    .removeAttr('filter-value')
                    .removeClass('b-filter__item_open');

                this.params = {};
                this.filterChange();
            }
        }
    });

    ModelsFilterParamsModel.fetch();

    return {
        Layout: Layout
    };
});