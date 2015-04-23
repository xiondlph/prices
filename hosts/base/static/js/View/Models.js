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
    'text!Templates/Popup/Success.tpl',
    'text!Templates/Popup/Error.tpl'
], function (Backbone, Validator, Popup, _loader, _layout, _models, _success, _error) {


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

        },

        _state: 0,
        _path: null,
        _categories: null,
        _models: null,

        render: function () {
            var me = this;

            me.path();
            me.categories();

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

        categories: function () {
            var me = this,
                popup;

            $.ajax({
                url         : '/categories',
                type        : 'POST',
                dataType    : 'json',
                data        : {
                    categoryId: me.options.categoryId,
                    geo_id:     213,
                    count:      30
                }
            }).done(function (data) {
                me._categories = data;
                me.statge();
            }).fail(function () {
                popup = new Popup({content: $(_error)});
                popup.render();
            });
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
                me._path = data;
                me.statge();
            }).fail(function () {
                popup = new Popup({content: $(_error)});
                popup.render();
            });
        },

        models: function (categoryId, page) {
            var me          = this,
                _categoryId = categoryId || 90401,
                popup;

            $.ajax({
                url         : '/models',
                type        : 'POST',
                dataType    : 'json',
                data        : {
                    categoryId: _categoryId,
                    count:      30,
                    page:       page,
                    geo_id:     213
                }
            }).done(function (data) {
                me._models = _.extend(data, {categoryId: categoryId});
                me.statge();
            }).fail(function (data) {
                popup = new Popup({content: $(_error)});
                popup.render();
            });
        },

        statge: function () {
            if (this._state < 4) {
                this._state++;
            }

            if (this._state > 3) {
                this.$el.find('.j-models').html(_.template(_models)(this._models));
            }

            if (this._state === 3) {
                this.$el.html(_.template(_layout)({
                    path: this._path.path,
                    categories: this._categories.categories
                }));

                this.$el.find('.j-models').html(_.template(_models)(this._models));
            }
        }
    });

    return {
        Layout: Layout
    };
});