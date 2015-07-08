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
    'Model/OffersFilterParams',
    'Store/OffersFilterParams',
    'View/Popup',
    'View/Georegion',
    'View/Filter',
    'text!Templates/Offers/Loader.tpl',
    'text!Templates/Offers/Layout.tpl',
    'text!Templates/Offers/Offers.tpl',
    'text!Templates/Partials/Filter.tpl',
    'text!Templates/Popup/Success.tpl',
    'text!Templates/Popup/Error.tpl'
], function (Backbone, OffersFilterParamsModel, OffersFilterParamsStore, PopupView, GeoregionView, FilterView, loaderTpl, layoutTpl, offersTpl, filterTpl, successPopupTpl, errorPopupTpl) {


    /**
     * Представление списка товарных предложений
     *
     * @class       Layout
     * @namespace   View
     * @constructor
     * @extends     Backbone.View
     */
    var Layout = Backbone.View.extend({
        className:  'b-offers b-switch b-switch_animate',

        events: {
            'click .j-filter__item_label':      'toggleFilterItem',
            'click .j-filter__reset':           'filterReset',
            'click .j-shop':                    'selectShop',
            'click .j-export > a':              'export'
        },

        render: function () {
            var me = this;

            me.result   = {
                filter: OffersFilterParamsStore
            };

            if (OffersFilterParamsModel.get('modelId') === me.options.modelId) {
                me.params = OffersFilterParamsModel.get('params');
            } else {
                me.params   = {};
            }

            me.result.filter[0].options.push({valueId: me.options.modelId, valueText: 'Магаз'});

            me.getModel(me.options.modelId);

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
                me      = this,
                item    = $(e.currentTarget).parent(),
                option  = this.result.filter[item.attr('filter-index')],
                value   = item.attr('filter-value');

            e.preventDefault();
            item.toggleClass('b-filter__item_open');

            if (item.hasClass('b-filter__item_open') && FilterView.hasOwnProperty(option.type)) {
                widget = new FilterView[option.type]({option: option, value: value, accept: function (value) {
                    if (value && value.length > 0) {
                        item.attr('filter-value', value);
                        me.params[option.id] = value;
                    } else {
                        item.removeAttr('filter-value');
                        delete me.params[option.id];
                    }

                    me.filterChangeWait();
                }});
                $(e.currentTarget).next().html(widget.render());
            } else {
                $(e.currentTarget).next().html('');
            }
        },

        filterChange: function () {
            OffersFilterParamsModel.save({
                id:         'offersFilterParams',
                modelId:    this.options.modelId,
                params:     this.params
            });

            this.options.reloadOffers();
        },

        filterChangeWait: _.debounce(function () {
            this.filterChange();
        }, 1000),

        getModel: function (modelId) {
            var me = this,
                popup;

            $.ajax({
                url         : '/model',
                type        : 'POST',
                dataType    : 'json',
                data        : {
                    modelId:    modelId,
                    geo_id:     GeoregionView.getGeoId()
                }
            }).done(function (data) {
                me.result.model = data.model;
                me.getPath(data.model.categoryId);
                me.statge();
            }).fail(function () {
                popup = new PopupView({content: $(errorPopupTpl)});
                popup.render();
            });
        },

        getPath: function (categoryId) {
            var me = this,
                popup;

            $.ajax({
                url         : '/path',
                type        : 'POST',
                dataType    : 'json',
                data        : {
                    categoryId: categoryId,
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

        getOffers: function (modelId, page) {
            var me      = this,
                params  = _.extend({}, me.params),
                popup;

            params.modelId  = modelId;
            params.page     = page;
            params.count    = 30;
            params.geo_id   = GeoregionView.getGeoId();

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
                popup = new PopupView({content: $(errorPopupTpl)});
                popup.render();
            });
        },

        statge: function () {
            var georegion;

            if (this.result.hasOwnProperty('path') && this.result.hasOwnProperty('model') && this.result.hasOwnProperty('offers')) {
                this.$el.html(_.template(layoutTpl)({
                    path:   this.result.path,
                    model:  this.result.model
                }));

                this.$el.find('.j-filters').html(_.template(filterTpl)({filter: this.result.filter, params: this.params}));
                this.list();

                georegion = new GeoregionView.Panel();
                this.$el.find('.j-georegion').html(georegion.render());
            }
        },

        list: function () {
            this.$el.find('.j-offers').html(_.template(offersTpl)(this.result.offers));
        },

        filterReset: function () {
            if (this.$el.find('.j-filter__item[filter-value]').length) {
                this.$el.find('.j-filter__item_widget').text('').parent()
                    .removeAttr('filter-value')
                    .removeClass('b-filter__item_open');

                this.params = {};
                this.filterChange();
            }
        },

        selectShop: function (e) {
            e.preventDefault();
            this.params.shop_id = $(e.currentTarget).data('shop');
            this.filterChange();
            return false;
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
                    geo_id:     GeoregionView.getGeoId(),
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
                popup = new PopupView({content: $(errorPopupTpl)});
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

    OffersFilterParamsModel.fetch();

    return {
        Layout: Layout
    };
});