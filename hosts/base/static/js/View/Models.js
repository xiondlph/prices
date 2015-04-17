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
    'text!Templates/Models/Categories.tpl',
    'text!Templates/Models/Category.tpl',
    'text!Templates/Models/List.tpl',
    'text!Templates/Popup/Success.tpl',
    'text!Templates/Popup/Error.tpl'
], function (Backbone, Validator, Popup, _categories, _category, _list, _success, _error) {


    /**
     * Представление списка категорий
     *
     * @class       Categories
     * @namespace   View
     * @constructor
     * @extends     Backbone.View
     */
    var Categories = Backbone.View.extend({
        className:  'b-categories',

        events: {

        },

        render: function () {
            this.$el.append(_.template(_categories));

            this.options.obj.append(this.$el);
            return this.$el;
        },

        fetch: function (categoryId) {
            var me = this;

            $('.b-models').trigger('clear');
            $.ajax({
                url         : '/models/categories',
                type        : 'POST',
                dataType    : 'json',
                data        : {
                    categoryId: categoryId
                }
            }).done(function (data) {
                me.$el.find('.j-categories__container').html(_.template(_category)(data.categories));

                if (categoryId) {
                    $('.b-models').trigger('fetch', [categoryId]);
                }
                
            }).fail(function () {
                popup = new Popup({content: $(_error)});
                popup.render();
            });
        }
    });


    /**
     * Представление списка моделей
     *
     * @class       List
     * @namespace   View
     * @constructor
     * @extends     Backbone.View
     */
    var List = Backbone.View.extend({
        className:  'b-models',

        events: {
            'fetch':    'fetch',
            'clear':    'clear'
        },

        render: function () {
            this.options.obj.append(this.$el);
            return this.$el;
        },

        fetch: function (e, categoryId) {
            var me = this;

            $.ajax({
                url         : '/models',
                type        : 'POST',
                dataType    : 'json',
                data        : {
                    categoryId: categoryId
                }
            }).done(function (data) {
                me.$el.html(_.template(_list)(data.models));
            }).fail(function () {
                popup = new Popup({content: $(_error)});
                popup.render();
            });
        },

        clear: function () {
            this.$el.html('');
        }
    });

    return {
        Categories: Categories,
        List: List
    };
});