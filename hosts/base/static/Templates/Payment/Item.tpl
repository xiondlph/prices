<% for(var i=0; i <= payments.length -1; i++){ %>
    <tr class="b-grid__row">
        <td class="b-grid__cell b-grid__cell_item">
<% var _datetime = new Date(payments[i].datetime); %>
            <% print(_datetime.getDate() > 10 ? _datetime.getDate() : '0'+_datetime.getDate()) %>.
            <% print(_datetime.getMonth() > 10 ? _datetime.getMonth() : '0'+_datetime.getMonth()) %>.
            <% print(_datetime.getFullYear()) %><br />
            <% print(_datetime.getHours() > 10 ? _datetime.getHours() : '0'+_datetime.getHours()) %>:
            <% print(_datetime.getMinutes() > 10 ? _datetime.getMinutes() : '0'+_datetime.getMinutes()) %>:
            <% print(_datetime.getSeconds() > 10 ? _datetime.getSeconds() : '0'+_datetime.getSeconds()) %>
        </td>
        <td class="b-grid__cell b-grid__cell_item"><%= payments[i].withdraw_amount %> руб.</td>
        <td class="b-grid__cell b-grid__cell_item"><%= payments[i]._quantity %></td>
        <td class="b-grid__cell b-grid__cell_item"><%= payments[i]._requests %></td>
        <td class="b-grid__cell b-grid__cell_item">
<%  if(payments[i]._quantity > 0){ %>
            <img src="/images/success.svg" alt="Платеж успешно выполнен" title="Платеж успешно выполнен"/>
<%  }else{ %>
            <img src="/images/icons/error.svg" alt="Платеж не выполнен" title="Платеж не выполнен"/>
<%  } %>
        </td>
    </tr>
<% } %>