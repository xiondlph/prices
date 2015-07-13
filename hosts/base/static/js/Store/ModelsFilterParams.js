/**
 * Модуль данных фильтра списка моделей
 *
 * @module      Store.ModelsFilterParams
 * @category    Client side
 * @main        Prices monitoring service
 * @author      Ismax <admin@ismax.ru>
 */


define(['backbone'], function () {
    return [
        {
            id:         'sort',
            name:       'Сортировка',
            options:    [
                {valueId: 'popularity', valueText: 'По популярности'},
                {valueId: 'date', valueText: 'По дате '},
                {valueId: 'noffers', valueText: 'По количеству товарных предложений'},
                {valueId: 'price', valueText: 'По цене'}
            ],
            type:       'SELECT'
        },
        {
            id:         'how',
            name:       'Направление сортировки',
            options:    [
                {valueId: 'desc', valueText: 'По убыванию'},
                {valueId: 'asc', valueText: 'По возрастанию'}
            ],
            type:       'SELECT'
        }
    ];
});