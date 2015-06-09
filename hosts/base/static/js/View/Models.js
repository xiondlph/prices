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
    'text!Templates/Models/Loader.tpl',
    'text!Templates/Models/Layout.tpl',
    'text!Templates/Models/Models.tpl',
    'text!Templates/Models/Filters.tpl',
    'text!Templates/Popup/Success.tpl',
    'text!Templates/Popup/Error.tpl'
], function (Backbone, Validator, Popup, _loader, _layout, _models, _filters, _success, _error) {


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
            'change input':        'filtersChange',
            'change select':       'filtersChange'
        },

        render: function () {
            var me = this;

            me.result = {};
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

        filtersChange: function (e) {
            var filterUrl = document.location.protocol + '//' + document.location.hostname + document.location.pathname + '#' + this.options.categoryId;

            if (filterUrl === document.location.href) {
                this.models(this.options.categoryId);
            }
            document.location.href = filterUrl;
        },

        path: function () {
            var me = this,
                popup;

            $.ajax({
                url         : '/path',
                type        : 'POST',
                dataType    : 'json',
                data        : {
                    categoryId: me.options.categoryId || 90401,
                    geo_id:     213
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
                filters     = $('#filters').serializeArray(),
                params      = {},
                _categoryId = categoryId || 90401,
                popup,
                i;

            for (i = 0; i < filters.length; i++) {

                switch (filters[i].value) {
                case '0':
                    params[filters[i].name] = 'n';
                    break;

                case '1':
                    params[filters[i].name] = 'y';
                    break;

                case '-1':
                    break;

                default:
                    params[filters[i].name] = filters[i].value;
                    break;
                }
            }

            params.categoryId   = _categoryId;
            params.page         = page;
            params.count        = 30;
            params.geo_id       = 213;

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

            }).fail(function (data) {
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
                    geo_id:     213
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
            if (this.result.hasOwnProperty('path') && this.result.hasOwnProperty('models') && this.result.hasOwnProperty('filters')) {
                this.$el.html(_.template(_layout)({
                    path: this.result.path
                }));

                this.$el.find('.j-filters').html(_.template(_filters)({filters: this.result.filters}));
                this.list();
            }
        },

        list: function () {
            this.$el.find('.j-models').html(_.template(_models)({models: this.result.models}));
        }
    });

    return {
        Layout: Layout
    };
});