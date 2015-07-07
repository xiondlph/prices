/**
 * Модуль представления списка отзывов на товар
 *
 * @module      View.Reviews
 * @category    Client side
 * @main        Prices monitoring service
 * @author      Ismax <admin@ismax.ru>
 */


define([
    'backbone',
    'Model/ReviewsFilterParams',
    'Store/ReviewsFilterParams',
    'View/Popup',
    'View/Georegion',
    'View/Filter',
    'text!Templates/Reviews/Loader.tpl',
    'text!Templates/Reviews/Layout.tpl',
    'text!Templates/Reviews/Reviews.tpl',
    'text!Templates/Partials/Filter.tpl',
    'text!Templates/Popup/Success.tpl',
    'text!Templates/Popup/Error.tpl'
], function (Backbone, ReviewsFilterParamsModel, ReviewsFilterParamsStore, PopupView, GeoregionView, FilterView, loaderTpl, layoutTpl, reviewsTpl, filterTpl, successPopupTpl, errorPopupTpl) {


    /**
     * Представление списка отзывов на товар
     *
     * @class       Layout
     * @namespace   View
     * @constructor
     * @extends     Backbone.View
     */
    var Layout = Backbone.View.extend({
        className:  'b-reviews b-switch b-switch_animate',

        events: {
            'click .j-filter__item_label':      'toggleFilterItem',
            'click .j-filter__reset':           'filterReset',
            'click .j-shop':                    'selectShop',
            'click .j-export > a':              'export'
        },

        render: function () {
            var me = this;

            me.result   = {
                filter: ReviewsFilterParamsStore
            };

            if (ReviewsFilterParamsModel.get('modelId') === this.options.modelId) {
                me.params = ReviewsFilterParamsModel.get('params');
            } else {
                me.params   = {};
            }

            delete me.params.shop_id;

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
            ReviewsFilterParamsModel.save({
                id:         'reviewsFilterParams',
                modelId:    this.options.modelId,
                params:     this.params
            });

            this.options.reloadReviews();
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

        getReviews: function (modelId, page) {
            var me      = this,
                params  = _.extend({}, me.params),
                popup;

            params.modelId  = modelId;
            params.page     = page;
            params.count    = 30;
            params.geo_id   = GeoregionView.getGeoId();

            $.ajax({
                url         : '/reviews',
                type        : 'POST',
                dataType    : 'json',
                data        : params
            }).done(function (data) {
                var call;

                if (me.result.hasOwnProperty('reviews')) {
                    call = me.list.bind(me);
                } else {
                    call = me.statge.bind(me);
                }

                me.result.reviews = _.extend(data, {modelId: modelId});
                call();
            }).fail(function () {
                popup = new PopupView({content: $(errorPopupTpl)});
                popup.render();
            });
        },

        statge: function () {
            var georegion;

            if (this.result.hasOwnProperty('path') && this.result.hasOwnProperty('model') && this.result.hasOwnProperty('reviews')) {
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
            this.$el.find('.j-reviews').html(_.template(reviewsTpl)(this.result.reviews));
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
        }
    });

    ReviewsFilterParamsModel.fetch();

    return {
        Layout: Layout
    };
});