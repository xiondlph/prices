/**
 * Модуль представления меню
 *
 * @module      View.User
 * @category    Client side
 * @main        Prices monitoring service
 * @author      Ismax <admin@ismax.ru>
 */


define([
    'backbone'
], function (Backbone) {


    /**
     * Представление меню
     *
     * @class       Menu
     * @namespace   View
     * @constructor
     * @extends     Backbone.View
     */
    var Menu = Backbone.View.extend({
        events: {
            'click .b-menu__label':         'active',
            'mouseenter':                   'mouseenter',
            'mouseleave':                   'mouseleave'
        },

        initialize: function () {
            this.hideTimer = null;
        },

        render: function () {
            $('.b-nav__item[href="' + document.location.pathname + '"]').addClass('b-nav__item_active');

            this.$el.find('.b-menu__sub__item__link').each(function (index, el) {
                if ($(el).attr('href') === document.location.pathname + document.location.hash) {
                    $(el).addClass('b-menu__sub__item__link_active');
                    $(el).parents('.b-menu__sub').next().addClass('b-menu__label_active');
                }
            });
            return this.$el;
        },

        active: function (e) {
            var menu = $(e.currentTarget).parent();

            menu.siblings('.b-menu').find('.b-menu__sub_active').removeClass('b-menu__sub_active');
            if (menu.find('.b-menu__sub').hasClass('b-menu__sub_active')) {
                menu.find('.b-menu__sub').removeClass('b-menu__sub_active');
            } else {
                menu.find('.b-menu__sub').addClass('b-menu__sub_active');

                $(document).click(function doc(e) {
                    if ($(e.target).closest(menu).length === 0) {
                        menu.find('.b-menu__sub').removeClass('b-menu__sub_active');
                        $(document).unbind('click', doc);
                    }
                });
                return false;
            }
        },

        mouseenter: function (e) {
            clearTimeout(this.hideTimer);
        },

        mouseleave: function (e) {
            var menu = $(e.currentTarget).parent();
            this.hideTimer = setTimeout(function () {
                menu.find('.b-menu__sub').removeClass('b-menu__sub_active');
            }, 1000);
        }
    });

    return Menu;
});