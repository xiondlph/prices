/**
 * Модуль представления главной стр. системы безопастности
 *
 * @module      View.Secure
 * @category    Client side
 * @main        Prices monitoring service
 * @author      Ismax <admin@ismax.ru>
 */


define([
    'backbone',
    'validator',
    'View/Popup',
    'text!Templates/Secure/Signin.tpl',
    'text!Templates/Secure/Forgot.tpl',
    'text!Templates/Popup/Success.tpl',
    'text!Templates/Popup/Error.tpl'
], function (Backbone, Validator, PopupView, signinTpl, forgotTpl, successTpl, errorTpl) {
    var Signin,
        Forgot;

    /**
     * Представление формы авторизации
     *
     * @class       Signin
     * @namespace   View.Secure
     * @constructor
     * @extends     Backbone.View
     */
    Signin = Backbone.View.extend({
        tagName:    'form',
        className:  'b-form b-switch b-switch_animate',

        events: {
            'input .j-form__field__input':          'input',
            'submit':                               'submit'
        },


        /**
         * Рендеринг формы авторизации
         *
         * @method render
         * @return {HTMLElement} el
         */
        render: function () {
            var me = this;
            me.$el.html(_.template(signinTpl));

            me.options.obj.find('.b-switch').addClass('b-switch_animate');
            me.options.obj.append(me.$el);
            setTimeout(function () {
                me.$el.removeClass('b-switch_animate');
            });

            setTimeout(function () {
                me.options.obj.find('.b-switch_animate').remove();
            }, 200);

            me.$el.find('.j-form__field__input').trigger('input');
            return me.$el;
        },

        input: function (e) {
            if ($(e.currentTarget).val().length > 0) {
                $(e.currentTarget).addClass('b-form__field__input_fill');
                $(e.currentTarget).removeClass('b-form__field__input_invalid');
            } else {
                $(e.currentTarget).removeClass('b-form__field__input_fill');
            }
        },

        submit: function (e) {
            var me      = this,
                valid   = true,
                popup;

            e.preventDefault();

            if (!Validator.isLength(this.$el.find('input[name="email"]').val(), 1, 255)) {
                this.$el.find('input[name="email"]').addClass('b-form__field__input_invalid');
                this.$el.find('input[name="email"]').next('.b-form__field__label').find('.b-form__field__label__invalid').text('Необходимо ввести Email');
                valid = false;
            } else {
                if (!Validator.isEmail(this.$el.find('input[name="email"]').val())) {
                    this.$el.find('input[name="email"]').addClass('b-form__field__input_invalid');
                    this.$el.find('input[name="email"]').next('.b-form__field__label').find('.b-form__field__label__invalid').text('Неверный формат Email');
                    valid = false;
                } else {
                    this.$el.find('input[name="email"]').removeClass('b-form__field__input_invalid');
                    this.$el.find('input[name="email"]').next('.b-form__field__label').find('.b-form__field__label__invalid').text('');
                }
            }


            if (!Validator.isLength(this.$el.find('input[name="password"]').val(), 1, 255)) {
                this.$el.find('input[name="password"]').addClass('b-form__field__input_invalid');
                this.$el.find('input[name="password"]').next('.b-form__field__label').find('.b-form__field__label__invalid').text('Необходимо ввести пароль');
                valid = false;
            } else {
                this.$el.find('input[name="password"]').removeClass('b-form__field__input_invalid');
                this.$el.find('input[name="password"]').next('.b-form__field__label').find('.b-form__field__label__invalid').text('');
            }


            if (valid) {
                $.ajax({
                    url         : 'https://' + document.domain + '/user/signin',
                    type        : 'POST',
                    dataType    : 'json',
                    data: JSON.stringify({
                        email: this.$el.find('input[name="email"]').val(),
                        password: this.$el.find('input[type="password"]').val()
                    })
                }).done(function (data) {
                    if (data.auth && data.auth === true) {
                        window.location.href = '/categories';
                    } else {
                        me.$el.find('input[name="email"]').addClass('b-form__field__input_invalid');
                        me.$el.find('input[name="email"]').next('.b-form__field__label').find('.b-form__field__label__invalid').text('Неверные Email или пароль');
                    }
                }).fail(function (data) {
                    popup = new PopupView({content: $(errorTpl)});
                    popup.render();
                });
            }

            return false;
        }
    });


    /**
     * Представление формы востановления доступа
     *
     * @class       Forgot
     * @namespace   View.Secure
     * @constructor
     * @extends     Backbone.View
     */
    Forgot = Backbone.View.extend({
        tagName:    'form',
        className:  'b-form b-switch b-switch_animate',

        events: {
            'input .j-form__field__input':          'input',
            'submit':                               'submit'
        },


        /**
         * Рендеринг формы востановления доступа
         *
         * @method render
         * @return {HTMLElement} el
         */
        render: function () {
            var me = this;
            me.$el.html(_.template(forgotTpl));

            me.options.obj.find('.b-switch').addClass('b-switch_animate');
            me.options.obj.append(me.$el);
            setTimeout(function () {
                me.$el.removeClass('b-switch_animate');
            });

            setTimeout(function () {
                me.options.obj.find('.b-switch_animate').remove();
            }, 200);

            me.$el.find('.j-form__field__input').trigger('input');
            return me.$el;
        },

        input: function (e) {
            if ($(e.currentTarget).val().length > 0) {
                $(e.currentTarget).addClass('b-form__field__input_fill');
                $(e.currentTarget).removeClass('b-form__field__input_invalid');
            } else {
                $(e.currentTarget).removeClass('b-form__field__input_fill');
            }
        },

        submit: function (e) {
            var me      = this,
                valid   = true,
                popup;

            e.preventDefault();

            if (!Validator.isLength(this.$el.find('input[name="email"]').val(), 1, 255)) {
                this.$el.find('input[name="email"]').addClass('b-form__field__input_invalid');
                this.$el.find('input[name="email"]').next('.b-form__field__label').find('.b-form__field__label__invalid').text('Необходимо ввести Email');
                valid = false;
            } else {
                if (!Validator.isEmail(this.$el.find('input[name="email"]').val())) {
                    this.$el.find('input[name="email"]').addClass('b-form__field__input_invalid');
                    this.$el.find('input[name="email"]').next('.b-form__field__label').find('.b-form__field__label__invalid').text('Неверный формат Email');
                    valid = false;
                } else {
                    this.$el.find('input[name="email"]').removeClass('b-form__field__input_invalid');
                    this.$el.find('input[name="email"]').next('.b-form__field__label').find('.b-form__field__label__invalid').text('');
                }
            }


            if (valid) {
                $.ajax({
                    url         : 'https://' + document.domain + '/user/forgot',
                    type        : 'POST',
                    dataType    : 'json',
                    data: JSON.stringify({
                        email: this.$el.find('input[name="email"]').val()
                    })
                }).done(function (data) {
                    if (data.success === true) {
                        popup = new PopupView({content: $(_.template(successTpl)({message: 'На Ваш Email адрес было отправлено сообщение с инструкцией по входу в систему'}))});
                        popup.render();
                    } else {
                        me.$el.find('input[name="email"]').addClass('b-form__field__input_invalid');
                        me.$el.find('input[name="email"]').next('.b-form__field__label').find('.b-form__field__label__invalid').text('Пользователь не найден');
                    }
                }).fail(function (data) {
                    popup = new PopupView({content: $(errorTpl)});
                    popup.render();
                });
            }

            return false;
        }
    });

    return {
        Signin: Signin,
        Forgot: Forgot
    };
});