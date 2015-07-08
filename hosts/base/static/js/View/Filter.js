/**
 * Модуль представления виджетов фильтра
 *
 * @module      View.Filter
 * @category    Client side
 * @main        Prices monitoring service
 * @author      Ismax <admin@ismax.ru>
 */


define([
    'backbone',
    'View/Shops',
    'View/Popup',
    'text!Templates/Filter/Bool.tpl',
    'text!Templates/Filter/Enumerator.tpl',
    'text!Templates/Filter/Select.tpl',
    'text!Templates/Filter/Vendor.tpl',
    'text!Templates/Filter/Shops.tpl',
    'text!Templates/Filter/Numeric.tpl',
    'text!Templates/Popup/Success.tpl',
    'text!Templates/Popup/Error.tpl'
], function (Backbone, ShopsView, PopupView, boolTpl, enumeratorTpl, selectTpl, vendorTpl, shopsTpl, numericTpl, successPopupTpl, errorPopupTpl) {


    /**
     * Представление виджета BOOL
     *
     * @class       Bool
     * @namespace   View
     * @constructor
     * @extends     Backbone.View
     */
    var Bool = Backbone.View.extend({
            className:  'b-filter__item__widget_bool',

            events: {
                'change select': 'change'
            },

            render: function () {
                this.$el.append(_.template(boolTpl)({
                    option: this.options.option,
                    value:  this.options.value
                }));
                return this.$el;
            },

            change: function (e) {
                this.options.accept($(e.currentTarget).val());
            }
        }),


        /**
         * Представление виджета Enumerator
         *
         * @class       Enumerator
         * @namespace   View
         * @constructor
         * @extends     Backbone.View
         */
        Enumerator = Backbone.View.extend({
            className:  'b-filter__item__widget_enumerator',

            events: {
                'change input': 'change'
            },

            render: function () {
                if (this.options.value && this.options.value.length > 0) {
                    this.value = this.options.value.split(',');
                } else {
                    this.value = [];
                }


                this.$el.append(_.template(enumeratorTpl)({
                    option: this.options.option,
                    value:  this.value
                }));
                return this.$el;
            },

            change: function (e) {
                if ($(e.currentTarget).is(':checked')) {
                    this.value.push($(e.currentTarget).val());
                } else {
                    this.value.splice(this.value.indexOf($(e.currentTarget).val()), 1);
                }

                this.options.accept(this.value.join(','));
            }
        }),


        /**
         * Представление виджета Select
         *
         * @class       Select
         * @namespace   View
         * @constructor
         * @extends     Backbone.View
         */
        Select = Backbone.View.extend({
            className:  'b-filter__item__widget_select',

            events: {
                'change select': 'change'
            },

            render: function () {
                this.$el.append(_.template(selectTpl)({
                    option: this.options.option,
                    value:  this.options.value
                }));
                return this.$el;
            },

            change: function (e) {
                this.options.accept($(e.currentTarget).val());
            }
        }),

        /**
         * Представление виджета Vendor
         *
         * @class       Vendor
         * @namespace   View
         * @constructor
         * @extends     Backbone.View
         */
        Vendor = Backbone.View.extend({
            className:  'b-filter__item__widget_vendor',

            events: {
                'change select': 'change'
            },

            render: function () {
                this.$el.append(_.template(vendorTpl)({
                    option: this.options.option,
                    value:  this.options.value
                }));
                return this.$el;
            },

            change: function (e) {
                this.options.accept($(e.currentTarget).val());
            }
        }),

        /**
         * Представление виджета Shops
         *
         * @class       Shops
         * @namespace   View
         * @constructor
         * @extends     Backbone.View
         */
        Shops = Backbone.View.extend({
            className:  'b-filter__item__widget_shops',

            events: {
                'click a': 'list'
            },

            render: function () {
                this.$el.append(_.template(shopsTpl));
                return this.$el;
            },

            list: function (e) {
                var shopsView,
                    popup;

                e.preventDefault();

                shopsView   = new ShopsView.Layout({modelId: this.options.option.options[0].valueId});
                popup       = new PopupView({content: shopsView.render()});
                popup.render();

                //this.options.accept($(e.currentTarget).val());
            }
        }),

        /**
         * Представление виджета NUMERIC
         *
         * @class       Numeric
         * @namespace   View
         * @constructor
         * @extends     Backbone.View
         */
        Numeric = Backbone.View.extend({
            className:  'b-filter__item__widget_numeric',

            events: {
                'input input': 'change'
            },

            render: function () {
                this.$el.append(_.template(numericTpl)({
                    option: this.options.option,
                    value:  this.options.value
                }));
                return this.$el;
            },

            change: _.debounce(function (e) {
                var min = this.$el.find('.j-filters__input_min').val(),
                    max = this.$el.find('.j-filters__input_max').val(),
                    rang = [];

                if (min.length > 0 && !isNaN(+min)) {
                    rang.push(+min);
                }

                if (max.length > 0 && !isNaN(+max)) {
                    rang.push(+max);
                }

                this.options.accept(rang.join(','));
            }, 300)
        });

    return {
        BOOL:       Bool,
        ENUMERATOR: Enumerator,
        SELECT:     Select,
        VENDOR:     Vendor,
        SHOPS:      Shops,
        NUMERIC:    Numeric
    };
});