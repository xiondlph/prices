/**
 * Модуль представления виджетов фильтра
 *
 * @module      View.Filters
 * @category    Client side
 * @main        Prices monitoring service
 * @author      Ismax <admin@ismax.ru>
 */


define([
    'backbone',
    'text!Templates/Filters/Bool.tpl',
    'text!Templates/Filters/Enumerator.tpl',
    'text!Templates/Filters/Vendor.tpl',
    'text!Templates/Filters/Numeric.tpl',
    'text!Templates/Popup/Success.tpl',
    'text!Templates/Popup/Error.tpl'
], function (Backbone, _bool, _enumerator, _vendor, _numeric, _success, _error) {


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
                this.$el.append(_.template(_bool)({
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


                this.$el.append(_.template(_enumerator)({
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
                this.$el.append(_.template(_vendor)({
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
                this.$el.append(_.template(_numeric)({
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
        VENDOR:     Vendor,
        NUMERIC:    Numeric
    };
});