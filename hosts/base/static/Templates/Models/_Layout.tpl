<div class="b-table b-top__table">
    <div class="b-table__tr">
        <div class="b-table__tr__td b-table__tr__td_wide">
            <a href="/categories" class="b-categories__path__item">Категории</a>
<% if (path.length > 1) { %>
<%     for (var i = 1; i < path.length; i++) { %>
<%         if (path[i].category.childrenCount > 0) { %>
            <a href="/categories#<%= path[i].category.id %>" class="b-categories__path__item"><%= path[i].category.name %></a>
<%         } %>
<%     } %>
<% } %>
        </div>
        <div class="b-table__tr__td b-table__tr__td_right j-search_panel"></div>
        <div class="b-table__tr__td b-table__tr__td_right j-georegion"></div>
    </div>
    <div class="b-table__tr">
        <div class="b-table__tr__td b-table__tr__td_wide">
            <h3><%= path[path.length - 1].category.name %></h3>
        </div>
        <div class="b-table__tr__td"></div>
    </div>
</div>
<div class="b-table b-models__table">
    <div class="b-table__tr">
        <div class="b-table__tr__td b-table__tr__td_nowidth j-filters"></div>
        <div class="b-table__tr__td b-table__tr__td_wide j-models"></div>
    </div>
</div>