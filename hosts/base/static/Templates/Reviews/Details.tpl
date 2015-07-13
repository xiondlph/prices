<div class="b-reviews__details__popup">
    <table border="0" cellpadding="10" cellspacing="0" width="100%">
        <tr>
            <th align="right">Автор</th>
<% if (details.hasOwnProperty('author')) { %>
            <td><%= details.author %></td>
<% } else { %>
            <td>Гость</td>
<% } %>
        </tr>
<% if (details.hasOwnProperty('date')) { %>
        <tr>
            <th valign="top" align="right">Дата</th>
            <td><%= dateParse(details.date) %></td>
        </tr>
<% } %>
<% if (details.hasOwnProperty('grade')) { %>
        <tr>
            <th valign="top" align="right">Оценка</th>
            <td><%= details.grade %></td>
        </tr>
<% } %>
<% if (details.hasOwnProperty('pro')) { %>
        <tr>
            <th valign="top" align="right">Достоинства</th>
            <td><%= details.pro %></td>
        </tr>
<% } %>
<% if (details.hasOwnProperty('contra')) { %>
        <tr>
            <th valign="top" align="right">Недостатки</th>
            <td><%= details.contra %></td>
        </tr>
<% } %>
<% if (details.hasOwnProperty('text')) { %>
        <tr>
            <th valign="top" align="right">Отзыв</th>
            <td><%= details.text %></td>
        </tr>
<% } %>
    </table>
</div>