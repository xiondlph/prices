<form id="filters">
<% for (var i = 1; i < filters.length; i++) { %>
<%     if (filters[i].type === 'BOOL') { %>
    <label for="<%= filters[i].id %>"><%= filters[i].name %></label>
    <select name="<%= filters[i].id %>" id="<%= filters[i].id %>">
        <option value="1">Да</option>
        <option value="0">Нет</option>
        <option value="-1" selected="">Неважно</option>
    </select>
<%     } else { %>
    <%= filters[i].name %>
<%     } %>
<br />
<% } %>
</form>