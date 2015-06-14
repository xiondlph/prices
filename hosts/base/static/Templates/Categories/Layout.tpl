<div class="b-table b-categories__table">
    <div class="b-table__tr">
        <div class="b-table__tr__td b-table__tr__td_right b-table__tr__td_wide j-georegion"></div>
    </div>
    <div class="b-table__tr">
        <div class="b-table__tr__td b-table__tr__td_wide">
            <a href="/categories">Категории</a>
<% if (path.length > 1) { %>
<%     for (var i = 1; i < path.length; i++) { %>
<%         if (path[i].category.childrenCount > 0) { %>
            <a href="#<%= path[i].category.id %>"><%= path[i].category.name %></a>
<%         } %>
<%     } %>
<% } %>
        </div>
    </div>
    <div class="b-table__tr">
<% if (categories.items.length > 0) { %>
        <div class="b-table__tr__td b-table__tr__td_wide b-table__tr__td_col3">
<%     for (var i = 0; i < categories.items.length; i++) { %>
<%         if (categories.items[i].childrenCount > 0) { %>
            <a href="#<%= categories.items[i].id %>" class="b-categories__item" title="<%= categories.items[i].name %>"><%= categories.items[i].name %></a>
<%         } else { %>
<%             if (categories.items[i].modelsNum > 0) { %>
            <a href="/models#<%= categories.items[i].id %>" class="b-categories__item" title="<%= categories.items[i].name %> (<%= categories.items[i].modelsNum %>)"><%= categories.items[i].name %> (<%= categories.items[i].modelsNum %>)</a>
<%             } %>
<%         } %>
<%     } %>
        </div>
<% } else { %>
        <div class="b-table__tr__td b-table__tr__td_wide">
            <h3><%= path[path.length - 1].category.name %></h3>
        </div>
<% } %>
    </div>
</div>