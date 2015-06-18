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
    'validator',
    'Model/Filter',
    'View/Popup',
    'View/Georegion',
    'View/Filters',
    'text!Templates/Models/Loader.tpl',
    'text!Templates/Models/Layout.tpl',
    'text!Templates/Models/Models.tpl',
    'text!Templates/Models/Filters.tpl',
    'text!Templates/Popup/Success.tpl',
    'text!Templates/Popup/Error.tpl'
], function (Backbone, Validator, Filter, Popup, Georegion, Filters, _loader, _layout, _models, _filters, _success, _error) {


    var FilterModel = new Filter({ id: 'filter' });

    /**
     * Представление списка категорий и моделей
     *
     * @class       Layout
     * @namespace   View
     * @constructor
     * @extends     Backbone.View
     */
    var Layout = Backbone.View.extend({
        className:  'b-models b-switch b-switch_animate',

        events: {
            // 'change input':             'filtersChange',
            // 'change select':            'filtersChange',
            'click .j-filter__item_label':      'toggleWidget',
            'click .j-filters__reset':          'filtersReset'
        },

        render: function () {
            var me = this;

            me.result   = {};

            if (FilterModel.get('categoryId') === this.options.categoryId) {
                me.params = FilterModel.get('params')
            } else {
               me.params   = {}; 
            }

            me.path();
            me.filters();

            me.$el.append(_.template(_loader));
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

        toggleWidget: function (e) {
            var widget,
                type,
                me      = this,
                item    = $(e.currentTarget).parent(),
                option  = this.result.filters[item.attr('filter-index')],
                value   = item.attr('filter-value');

            e.preventDefault();
            item.toggleClass('b-filter__item_open');

            if (item.hasClass('b-filter__item_open') && Filters.hasOwnProperty(option.type)) {
                if (option.shortname === 'Vendor') {
                    type = 'VENDOR'
                } else {
                    type = option.type
                }

                widget = new Filters[type]({option: option, value: value, accept: function (value) {
                    var key;

                    if (option.shortname === 'Vendor') {
                        key = 'vendor_id'
                    } else {
                        key = option.id
                    }

                    if (value && value.length > 0) {
                        item.attr('filter-value', value);
                        me.params[key] = value;
                    } else {
                        item.removeAttr('filter-value');
                        delete me.params[key];
                    }

                    me.filtersChangeWait();
                }});
                $(e.currentTarget).next().html(widget.render());
            } else {
                $(e.currentTarget).next().html('');
            }
        },

        filtersChange: function () {
            FilterModel.save({
                id:         'filter',
                categoryId: this.options.categoryId,
                params:     this.params
            });

            var filterUrl = document.location.protocol + '//' + document.location.hostname + document.location.pathname + '#' + this.options.categoryId;

            if (filterUrl === document.location.href) {
                this.models(this.options.categoryId);
            }
            document.location.href = filterUrl;
        },

        filtersChangeWait: _.debounce(function () {
            this.filtersChange();
        }, 1000),

        path: function () {
            var me = this,
                popup;

            $.ajax({
                url         : '/path',
                type        : 'POST',
                dataType    : 'json',
                data        : {
                    categoryId: me.options.categoryId || 90401,
                    geo_id:     Georegion.getGeoId()
                }
            }).done(function (data) {
                me.result.path = data.path;
                me.statge();
            }).fail(function () {
                popup = new Popup({content: $(_error)});
                popup.render();
            });
        },

        models: function (categoryId, page) {
            var me          = this,
                params      = _.extend({}, me.params),
                _categoryId = categoryId || 90401,
                popup,
                i;

            params.categoryId   = _categoryId;
            params.page         = page;
            params.count        = 30;
            params.geo_id       = Georegion.getGeoId();

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
                popup = new Popup({content: $(_error)});
                popup.render();
            });
        },

        filters: function () {
            var me = this,
                popup;

            $.ajax({
                url         : '/filters',
                type        : 'POST',
                dataType    : 'json',
                data        : {
                    categoryId: me.options.categoryId || 90401,
                    geo_id:     Georegion.getGeoId()
                }
            }).done(function (data) {
                me.result.filters = data.filters;
                me.statge();
            }).fail(function () {
                popup = new Popup({content: $(_error)});
                popup.render();
            });
        },

        statge: function () {
            var georegion;

            if (this.result.hasOwnProperty('path') && this.result.hasOwnProperty('models') && this.result.hasOwnProperty('filters')) {
                this.$el.html(_.template(_layout)({
                    path: this.result.path
                }));

                this.$el.find('.j-filters').html(_.template(_filters)({filters: this.result.filters, params: this.params}));
                this.list();

                georegion = new Georegion.Panel();
                this.$el.find('.j-georegion').html(georegion.render());
            }
        },

        list: function () {
            this.$el.find('.j-models').html(_.template(_models)({models: this.result.models}));
        },

        filtersReset: function () {
            if (this.$el.find('.j-filter__item[filter-value]').length) {
                this.$el.find('.j-filter__item_widget').text('').parent()
                    .removeAttr('filter-value')
                    .removeClass('b-filter__item_open');

                this.params = {};
                this.filtersChange();
            }
        }
    });

    FilterModel.fetch();

    return {
        Layout: Layout
    };
});