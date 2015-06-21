/**
 * Модуль представления списка товарных предложений
 *
 * @module      View.Offers
 * @category    Client side
 * @main        Prices monitoring service
 * @author      Ismax <admin@ismax.ru>
 */


define([
    'backbone',
    'validator',
    'Model/OffersFilter',
    'Config/OffersFilter',
    'View/Popup',
    'View/Georegion',
    'View/Filters',
    'text!Templates/Offers/Loader.tpl',
    'text!Templates/Offers/Layout.tpl',
    'text!Templates/Offers/Offers.tpl',
    'text!Templates/Models/Filters.tpl',
    'text!Templates/Popup/Success.tpl',
    'text!Templates/Popup/Error.tpl'
], function (Backbone, Validator, OffersFilter, OffersFilterConfig, Popup, Georegion, Filters, _loader, _layout, _offers, _filters, _success, _error) {

    var FilterModel = new OffersFilter({ id: 'offersFilter' }),


        /**
         * Представление списка товарных предложений
         *
         * @class       Layout
         * @namespace   View
         * @constructor
         * @extends     Backbone.View
         */
        Layout = Backbone.View.extend({
            className:  'b-offers b-switch b-switch_animate',

            events: {
                'click .j-filter__item_label':      'toggleWidget',
                'click .j-filters__reset':          'filtersReset',
                'click .j-export > a':              'export'
            },

            render: function () {
                var me = this;

                me.result   = {};

                if (FilterModel.get('modelId') === this.options.modelId) {
                    me.params = FilterModel.get('params');
                } else {
                    me.params   = {};
                }

                me.filters();
                me.model(me.options.modelId);

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

            filters: function () {
                this.result.filters = OffersFilterConfig;
            },

            toggleWidget: function (e) {
                var widget,
                    me      = this,
                    item    = $(e.currentTarget).parent(),
                    option  = this.result.filters[item.attr('filter-index')],
                    value   = item.attr('filter-value');

                e.preventDefault();
                item.toggleClass('b-filter__item_open');

                if (item.hasClass('b-filter__item_open') && Filters.hasOwnProperty(option.type)) {
                    widget = new Filters[option.type]({option: option, value: value, accept: function (value) {
                        if (value && value.length > 0) {
                            item.attr('filter-value', value);
                            me.params[option.id] = value;
                        } else {
                            item.removeAttr('filter-value');
                            delete me.params[option.id];
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
                    id:         'offersFilter',
                    modelId:    this.options.modelId,
                    params:     this.params
                });

                this.options.reloadOffers();
            },

            filtersChangeWait: _.debounce(function () {
                this.filtersChange();
            }, 1000),

            model: function (modelId) {
                var me = this,
                    popup;

                $.ajax({
                    url         : '/model',
                    type        : 'POST',
                    dataType    : 'json',
                    data        : {
                        modelId:    modelId,
                        geo_id:     Georegion.getGeoId()
                    }
                }).done(function (data) {
                    me.result.model = data.model;
                    me.path(data.model.categoryId);
                    me.statge();
                }).fail(function () {
                    popup = new Popup({content: $(_error)});
                    popup.render();
                });
            },

            path: function (categoryId) {
                var me = this,
                    popup;

                $.ajax({
                    url         : '/path',
                    type        : 'POST',
                    dataType    : 'json',
                    data        : {
                        categoryId: categoryId,
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

            offers: function (modelId, page) {
                var me      = this,
                    params  = _.extend({}, me.params),
                    popup;

                params.modelId  = modelId;
                params.page     = page;
                params.count    = 30;
                params.geo_id   = Georegion.getGeoId();

                $.ajax({
                    url         : '/offers',
                    type        : 'POST',
                    dataType    : 'json',
                    data        : params
                }).done(function (data) {
                    var call;

                    if (me.result.hasOwnProperty('offers')) {
                        call = me.list.bind(me);
                    } else {
                        call = me.statge.bind(me);
                    }

                    me.result.offers = _.extend(data, {modelId: modelId});
                    call();
                }).fail(function () {
                    popup = new Popup({content: $(_error)});
                    popup.render();
                });
            },

            statge: function () {
                var georegion;

                if (this.result.hasOwnProperty('path') && this.result.hasOwnProperty('model') && this.result.hasOwnProperty('offers')) {
                    this.$el.html(_.template(_layout)({
                        path:   this.result.path,
                        model:  this.result.model
                    }));

                    this.$el.find('.j-filters').html(_.template(_filters)({filters: this.result.filters, params: this.params}));
                    this.list();

                    georegion = new Georegion.Panel();
                    this.$el.find('.j-georegion').html(georegion.render());
                }
            },

            list: function () {
                this.$el.find('.j-offers').html(_.template(_offers)(this.result.offers));
            },

            filtersReset: function () {
                if (this.$el.find('.j-filter__item[filter-value]').length) {
                    this.$el.find('.j-filter__item_widget').text('').parent()
                        .removeAttr('filter-value')
                        .removeClass('b-filter__item_open');

                    this.params = {};
                    this.filtersChange();
                }
            },

            export: function (e) {
                e.preventDefault();
                var me = this,
                    popup;

                $.ajax({
                    url         : '/offers/all',
                    type        : 'POST',
                    dataType    : 'json',
                    data        : {
                        modelId:    me.options.modelId,
                        geo_id:     Georegion.getGeoId(),
                        count:      30
                    }
                }).done(function (data) {
                    var out = '',
                        i;

                    for (i = 0; i < data.length; i++) {
                        out += '"' + data[i].name + '",';
                        out += '"' + data[i].price.value + '",';
                        //out += '"' + data[i].price.currencyName + '"\n';
                    }

                    me.download(out, 'test.csv', 'text/csv');
                }).fail(function () {
                    popup = new Popup({content: $(_error)});
                    popup.render();
                });
                return false;
            },

            download: function (content, fileName, mimeType) {
                var a = document.createElement('a'),
                    f;
                mimeType = mimeType || 'application/octet-stream';

                if (navigator.msSaveBlob) { // IE10
                    return navigator.msSaveBlob(new Blob([content], {type: mimeType}), fileName);
                }

                if (a.hasOwnProperty('download')) { //html5 A[download]
                    a.href = 'data:' + mimeType + ',' + encodeURIComponent(content);
                    a.setAttribute('download', fileName);
                    document.body.appendChild(a);
                    setTimeout(function () {
                        a.click();
                        document.body.removeChild(a);
                    }, 66);
                    return true;
                }

                //do iframe dataURL download (old ch+FF):
                f = document.createElement('iframe');
                document.body.appendChild(f);
                f.src = 'data:' + mimeType + ',' + encodeURIComponent(content);

                setTimeout(function () {
                    document.body.removeChild(f);
                }, 333);
                return true;
            }
        });

    FilterModel.fetch();

    return {
        Layout: Layout
    };
});