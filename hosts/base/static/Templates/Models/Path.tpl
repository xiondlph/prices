            <a href="/models">Категории</a>
<% if (path.length > 1) { %>
<%     for (var i = 1; i < path.length; i++) { %>
<%         if (path[i].category.childrenCount > 0) { %>
            <a href="#<%= path[i].category.id %>"><%= path[i].category.name %></a>
<%         } %>
<%     } %>
<% } %>