/**
 * Модуль представления стр. профиля
 *
 * @module      View.Profile
 * @category    Client side
 * @main        Prices monitoring service
 * @author      Ismax <admin@ismax.ru>
 */


define([
    'backbone',
    'validator',
    'View/Popup',
    'text!Templates/Profile/Form.tpl',
    'text!Templates/Profile/Password.tpl',
    'text!Templates/Popup/Success.tpl',
    'text!Templates/Popup/Error.tpl'
], function (Backbone, Validator, Popup, _form, _password, _success, _error) {
    var Form,
        Password;


    /**
     * Представление формы профиля
     *
     * @class       Form
     * @namespace   Profile
     * @constructor
     * @extends     Backbone.View
     */
    Form = Backbone.View.extend({
        tagName:    'form',
        className:  'b-form  b-switch b-switch_animate',

        events: {
            'input .j-form__field__input':      'input',
            'submit':                           'submit'
        },

        render: function () {
            var me = this,
                popup;

            me.$el.html(_.template(_form));

            me.options.obj.find('.b-switch').addClass('b-switch_animate');
            me.options.obj.append(me.$el);
            setTimeout(function () {
                me.$el.removeClass('b-switch_animate');
            });

            setTimeout(function () {
                me.options.obj.find('.b-switch_animate').remove();
            }, 200);


            $.ajax({
                url         : '/profile/get/',
                type        : 'GET',
                dataType    : 'json',
                global      : false
            }).done(function (data) {
                me.$el.find('input[name="email"]').val(data.profile.email);

                me.$el.find('.j-form__field__input').trigger('input');
            }).fail(function () {
                popup = new Popup({content: $(_error)});
                popup.render();
            });

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
                    this.$el.find('input[name="email"]').removeClass('invalid');
                    this.$el.find('input[name="email"]').next('.b-form__field__label').find('.b-form__field__label__invalid').text('');
                }
            }

            if (valid) {
                $.ajax({
                    url         : '/profile/email',
                    type        : 'POST',
                    dataType    : 'json',
                    data: JSON.stringify({
                        email: this.$el.find('input[name="email"]').val()
                    })
                }).done(function (data) {
                    if (data.exist) {
                        me.$el.find('input[name="email"]').addClass('b-form__field__input_invalid');
                        me.$el.find('input[name="email"]').next('.b-form__field__label').find('.b-form__field__label__invalid').text('Пользователь с таким Email уже существует');
                    } else {
                        popup = new Popup({content: $(_.template(_success)({message: 'Данные сохранены'}))});
                        popup.render();
                    }
                }).fail(function (data) {
                    popup = new Popup({content: $(_error)});
                    popup.render();
                });
            }

            return false;
        }
    });


    /**
     * Представление формы смены пароля
     *
     * @class       Password
     * @namespace   Profile
     * @constructor
     * @extends     Backbone.View
     */
    Password = Backbone.View.extend({
        tagName:    'form',
        className:  'b-form  b-switch b-switch_animate',

        events: {
            'input input':      'input',
            'submit':           'submit'
        },

        render: function () {
            var me = this;
            me.$el.html(_.template(_password));

            me.options.obj.find('.b-switch').addClass('b-switch_animate');
            me.options.obj.append(me.$el);
            setTimeout(function () {
                me.$el.removeClass('b-switch_animate');
            });

            setTimeout(function () {
                me.options.obj.find('.b-switch_animate').remove();
            }, 200);

            me.$el.find('.j-form__field__input').trigger('input');

            return this.$el;
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
            var valid   = true,
                popup;

            e.preventDefault();

            if (!Validator.isLength(this.$el.find('input[name="password"]').val(), 1, 255)) {
                this.$el.find('input[name="password"]').addClass('b-form__field__input_invalid');
                this.$el.find('input[name="password"]').next('.b-form__field__label').find('.b-form__field__label__invalid').text('Необходимо ввести новый пароль');
                valid = false;
            } else {
                this.$el.find('input[name="password"]').removeClass('invalid');
                this.$el.find('input[name="password"]').next('.b-form__field__label').find('.b-form__field__label__invalid').text('');
            }

            if (!Validator.isLength(this.$el.find('input[name="confirm"]').val(), 1, 255)) {
                this.$el.find('input[name="confirm"]').addClass('b-form__field__input_invalid');
                this.$el.find('input[name="confirm"]').next('.b-form__field__label').find('.b-form__field__label__invalid').text('Необходимо подтвердить новый пароль');
                valid = false;
            } else {
                this.$el.find('input[name="confirm"]').removeClass('invalid');
                this.$el.find('input[name="confirm"]').next('.b-form__field__label').find('.b-form__field__label__invalid').text('');
            }

            if (this.$el.find('input[name="confirm"]').val() !== this.$el.find('input[name="password"]').val()) {
                this.$el.find('input[name="confirm"]').addClass('b-form__field__input_invalid');
                this.$el.find('input[name="confirm"]').next('.b-form__field__label').find('.b-form__field__label__invalid').text('Пароли не совпадают');
                valid = false;
            } else {
                this.$el.find('input[name="confirm"]').removeClass('invalid');
                this.$el.find('input[name="confirm"]').next('.b-form__field__label').find('.b-form__field__label__invalid').text('');
            }

            if (valid) {
                $.ajax({
                    url         : '/profile/pass',
                    type        : 'POST',
                    dataType    : 'json',
                    data: JSON.stringify({
                        password: this.$el.find('input[name="password"]').val()
                    })
                }).done(function (data) {
                    popup = new Popup({content: $(_.template(_success)({message: 'Пароль обновлен'}))});
                    popup.render();
                }).fail(function (data) {
                    popup = new Popup({content: $(_error)});
                    popup.render();
                });
            }

            return false;
        }
    });


    return {
        Form        : Form,
        Password    : Password
    };
});