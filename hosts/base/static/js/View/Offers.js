/**
 * Модуль представления списка товарных предложений
 *
 * @module      View.Offers
 * @category    Client side
 * @main        Yandex.Market API
 * @author      Ismax <admin@ismax.ru>
 */


define([
    'backbone',
    'validator',
    'View/Popup',
    'text!Templates/Offers/Loader.tpl',
    'text!Templates/Offers/Layout.tpl',
    'text!Templates/Offers/Offers.tpl',
    'text!Templates/Popup/Success.tpl',
    'text!Templates/Popup/Error.tpl'
], function (Backbone, Validator, Popup, _loader, _layout, _offers, _success, _error) {


    /**
     * Представление списка товарных предложений
     *
     * @class       Layot
     * @namespace   View
     * @constructor
     * @extends     Backbone.View
     */
    var Layout = Backbone.View.extend({
        className:  'b-offers b-switch b-switch_animate',

        events: {
            'click .j-export > a': 'export'
        },

        _state:         0,
        _path:          null,
        _model:         null,
        _offers:        null,

        render: function () {
            var me = this;

            me.model(me.options.modelId);

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

        model: function (modelId) {
            var me = this,
                popup;

            $.ajax({
                url         : '/model',
                type        : 'POST',
                dataType    : 'json',
                data        : {
                    modelId:    modelId,
                    geo_id:     213
                }
            }).done(function (data) {
                me.path(data.model.categoryId);
                me._model = data;
                me.statge();
            }).fail(function () {
                popup = new Popup({content: $(_error)});
                popup.render();
            });
        },

        path: function (categoryId) {
            var me = this,
                popup;

            $.ajax({
                url         : '/path',
                type        : 'POST',
                dataType    : 'json',
                data        : {
                    categoryId: categoryId,
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

        offers: function (modelId, page) {
            var me      = this,
                params  = {},
                popup;

            params.modelId  = modelId;
            params.page     = page;
            params.count    = 30;
            params.geo_id   = 213;

            $.ajax({
                url         : '/offers',
                type        : 'POST',
                dataType    : 'json',
                data        : params
            }).done(function (data) {
                data = _.extend(data, {modelId: modelId});
                me._offers = data;
                me.statge();
            }).fail(function () {
                popup = new Popup({content: $(_error)});
                popup.render();
            });
        },

        statge: function () {
            if (this._state < 4) {
                this._state++;
            }

            if (this._state > 3) {
                this.$el.find('.j-offers').html(_.template(_offers)(this._offers));
            }

            if (this._state === 3) {
                this.$el.html(_.template(_layout)({
                    path:   this._path.path,
                    model:  this._model.model
                }));

                this.$el.find('.j-offers').html(_.template(_offers)(this._offers));
            }
        },

        export: function (e) {
            e.preventDefault();
            var me = this,
                popup;

            $.ajax({
                url         : '/csv',
                type        : 'POST',
                dataType    : 'json',
                data        : {
                    modelId:    me.options.modelId,
                    geo_id:     213,
                    count:      30
                }
            }).done(function (data) {
                var out = '',
                    i;

                for (i = 0; i < data.length; i++) {
                    out += '"' + data[i].name + '",';
                    out += '"' + data[i].price.value + '",';
                    out += '"' + data[i].price.currencyName + '"\n';
                }

                me.download(out, 'test.csv', 'text/csv');
            }).fail(function () {
                popup = new Popup({content: $(_error)});
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

    return {
        Layout: Layout
    };
});