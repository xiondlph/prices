<h3 class="b-last-payment__title">Последний платеж</h3>
<table cellpadding="0" cellspacing="0" class="b-grid">
    <tr class="b-grid__row">
        <th class="b-grid__head">Дата</th>
        <th class="b-grid__head">Сумма</th>
        <th class="b-grid__head">Запросы</th>
        <th class="b-grid__head">Статус</th>
    </tr>
    <tr class="b-grid__row">
        <td class="b-grid__cell b-grid__cell_item">
<% var _datetime = new Date(datetime); %>
            <% print(_datetime.getDate() > 10 ? _datetime.getDate() : '0'+_datetime.getDate()) %>.
            <% print(_datetime.getMonth() > 10 ? _datetime.getMonth() : '0'+_datetime.getMonth()) %>.
            <% print(_datetime.getFullYear()) %><br />
            <% print(_datetime.getHours() > 10 ? _datetime.getHours() : '0'+_datetime.getHours()) %>:
            <% print(_datetime.getMinutes() > 10 ? _datetime.getMinutes() : '0'+_datetime.getMinutes()) %>:
            <% print(_datetime.getSeconds() > 10 ? _datetime.getSeconds() : '0'+_datetime.getSeconds()) %>
        </td>
        <td class="b-grid__cell b-grid__cell_item"><%= withdraw_amount %> руб.</td>
        <td class="b-grid__cell b-grid__cell_item"><%= quantity %></td>
        <td class="b-grid__cell b-grid__cell_item">
<% if(quantity > 0){ %>
            <img src="/images/success.svg" alt="Платеж успешно выполнен" title="Платеж успешно выполнен"/>
<% }else{ %>
            <img src="/images/error.svg" alt="Платеж не выполнен" title="Платеж не выполнен"/>
<% } %>
        </td>
    </tr>
    <tr class="b-grid__row">
        <td colspan="4" align="right" class="b-grid__cell"><a href="#history" class="b-grid__cell__action icon-move-down">Все операций</a></td>
    </tr>
</table>