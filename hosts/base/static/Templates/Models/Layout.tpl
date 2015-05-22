<div class="b-table b-categories__table">
    <div class="b-table__tr">
        <div class="b-table__tr__td b-table__tr__td_wide">
            <a href="/models">Категории</a>
<% if (path.length > 1) { %>
<%     for (var i = 1; i < path.length; i++) { %>
<%         if (path[i].category.childrenCount > 0) { %>
            <a href="#<%= path[i].category.id %>"><%= path[i].category.name %></a>
<%         } %>
<%     } %>
<% } %>
        </div>
    </div>
    <div class="b-table__tr j-categories">
<% if (categories.items.length > 0) { %>
        <div class="b-table__tr__td b-table__tr__td_wide b-table__tr__td_col3">
<%     for (var i = 0; i < categories.items.length; i++) { %>
            <a href="#<%= categories.items[i].id %>" class="b-categories__item"><%= categories.items[i].name %></a>
<%     } %>
        </div>
<% } else { %>
        <div class="b-table__tr__td b-table__tr__td_wide">
            <h3><%= path[path.length - 1].category.name %></h3>
        </div>
<% } %>
    </div>
</div>
<div class="b-table b-models__table">
    <div class="b-table__tr">
        <div class="b-table__tr__td j-filters"></div>
        <div class="b-table__tr__td b-table__tr__td_wide j-models"></div>
    </div>
</div>