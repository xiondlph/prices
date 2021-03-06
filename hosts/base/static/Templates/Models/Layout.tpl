<div class="b-table b-top__table">
    <div class="b-table__tr">
        <div class="b-table__tr__td b-table__tr__td_wide">
            <a href="/categories" class="b-categories__path__item">Категории</a>
<% if (obj.hasOwnProperty('category') && category.parentId !== 0) { %>
<%     if (category.parentId !== 90401) { %>
            <a href="/categories#<%= category.parentId %>" class="b-categories__path__item"> . . . </a>
<%     } %>
            <a href="/categories#<%= category.id %>" class="b-categories__path__item"><%= category.name %></a>
<% } %>
        </div>
        <div class="b-table__tr__td b-table__tr__td_right j-search_panel"></div>
        <div class="b-table__tr__td b-table__tr__td_right j-georegion"></div>
    </div>
    <div class="b-table__tr">
        <div class="b-table__tr__td b-table__tr__td_wide">
            <h3><%= category.name %></h3>
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