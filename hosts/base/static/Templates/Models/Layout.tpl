<div class="b-table b-path__table">
    <div class="b-table__tr">
        <div class="b-table__tr__td b-table__tr__td_right b-table__tr__td_wide j-georegion"></div>
    </div>
    <div class="b-table__tr">
        <div class="b-table__tr__td b-table__tr__td_wide">
            <a href="/categories">Категории</a>
<% if (path.length > 1) { %>
<%     for (var i = 1; i < path.length; i++) { %>
<%         if (path[i].category.childrenCount > 0) { %>
            <a href="/categories#<%= path[i].category.id %>"><%= path[i].category.name %></a>
<%         } %>
<%     } %>
<% } %>
        </div>
    </div>
    <div class="b-table__tr">
        <div class="b-table__tr__td b-table__tr__td_wide">
            <h3><%= path[path.length - 1].category.name %></h3>
        </div>
    </div>
</div>
<div class="b-table b-models__table">
    <div class="b-table__tr">
        <div class="b-table__tr__td j-filters"></div>
        <div class="b-table__tr__td j-models"></div>
    </div>
</div>