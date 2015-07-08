/**
 * Модуль данных фильтра товарных предложений
 *
 * @module      Store.OffersFilterParams
 * @category    Client side
 * @main        Prices monitoring service
 * @author      Ismax <admin@ismax.ru>
 */


define(['backbone'], function () {
    return [
        {
            id:         'shop_id',
            name:       'Магазин',
            options:    [],
            type:       'SHOPS'
        },
        {
            id:         'delivery',
            name:       'С учетом доставки',
            options:    [
                {valueId: 0, valueText: 'Нет'},
                {valueId: 1, valueText: 'Да'}
            ],
            type:       'SELECT'
        },
        {
            id:         'shipping',
            name:       'Тип точки продаж',
            options:    [
                {valueId: 'all', valueText: 'Все варианты'},
                {valueId: 'pickup', valueText: 'Пункт выдачи заказов'},
                {valueId: 'delivery', valueText: 'Магазин предоставляет доставку'},
                {valueId: 'store', valueText: 'Магазин-салон'}
            ],
            type:       'SELECT'
        },
        {
            id:         'sort',
            name:       'Сортировка',
            options:    [
                {valueId: 'distance', valueText: 'Расстояние'},
                {valueId: 'price', valueText: 'Цена'},
                {valueId: 'rating', valueText: 'Рейтиг'}
            ],
            type:       'SELECT'
        },
        {
            id:         'how',
            name:       'Направление сортировки',
            options:    [
                {valueId: 'asc', valueText: 'По возрастанию'},
                {valueId: 'desc', valueText: 'По убыванию'}
            ],
            type:       'SELECT'
        }
    ];
});