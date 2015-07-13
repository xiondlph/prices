/**
 * Модуль данных фильтра списка отзывов на товар
 *
 * @module      Store.ReviewsFilterParams
 * @category    Client side
 * @main        Prices monitoring service
 * @author      Ismax <admin@ismax.ru>
 */


define(['backbone'], function () {
    return [
        {
            id:         'grade',
            name:       'Отценка',
            options:    [
                {valueId: '', valueText: 'все'},
                {valueId: '2', valueText: '2'},
                {valueId: '1', valueText: '1'},
                {valueId: '0', valueText: '0'},
                {valueId: '-1', valueText: '-1'},
                {valueId: '-2', valueText: '-2'}
            ],
            type:       'SELECT'
        },
        {
            id:         'sort',
            name:       'Сортировка',
            options:    [
                {valueId: 'grade', valueText: 'По оценке'},
                {valueId: 'date', valueText: 'По дате'},
                {valueId: 'rank', valueText: 'По полезности'}
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