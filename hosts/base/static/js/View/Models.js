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
    'text!Templates/Models/Models.tpl',
    'text!Templates/Models/Path.tpl',
    'text!Templates/Models/Categories.tpl',
    'text!Templates/Models/List.tpl',
    'text!Templates/Popup/Success.tpl',
    'text!Templates/Popup/Error.tpl'
], function (Backbone, Validator, Popup, _models, _path, _categories, _list, _success, _error) {


    /**
     * Представление списка категорий и моделей
     *
     * @class       List
     * @namespace   View
     * @constructor
     * @extends     Backbone.View
     */
    var List = Backbone.View.extend({
        className:  'b-models b-switch b-switch_animate',

        events: {

        },

        render: function () {
            var me = this;

            me.path();
            me.categories();
            me.list(me.options.categoryId, me.options.page);

            me.$el.append(_.template(_models));
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
                url         : '/models/categories',
                type        : 'POST',
                dataType    : 'json',
                data        : {
                    categoryId: me.options.categoryId
                }
            }).done(function (data) {
                me.$el.find('.j-categories').replaceWith(_.template(_categories)(data));
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
                    categoryId: me.options.categoryId
                }
            }).done(function (data) {
                me.$el.find('.j-path').replaceWith(_.template(_path)(data));
            }).fail(function () {
                popup = new Popup({content: $(_error)});
                popup.render();
            });
        },

        list: function (categoryId, page) {
            var me = this,
                popup;

            $.ajax({
                url         : '/models',
                type        : 'POST',
                dataType    : 'json',
                data        : {
                    categoryId: categoryId,
                    page:       page
                }
            }).done(function (data) {
                data = _.extend(data, {categoryId: me.options.categoryId});
                me.$el.find('.j-models').replaceWith(_.template(_list)(data));
            }).fail(function () {
                popup = new Popup({content: $(_error)});
                popup.render();
            });
        }
    });

    return {
        List: List
    };
});