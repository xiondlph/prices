        <div class="b-table__tr__td b-table__tr__td_wide">
            <a href="/models">Категории</a>
<% if (path.length > 1) { %>
<%     for (var i = 1; i < path.length; i++) { %>
            <a href="/models#<%= path[i].category.id %>"><%= path[i].category.name %></a>
<%     } %>
<% } %>
        </div>