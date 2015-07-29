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
        <div class="b-table__tr__td b-table__tr__td_right j-georegion"></div>
    </div>
    <div class="b-table__tr">
        <div class="b-table__tr__td">
<% if (obj.model) { %>
            <h2>Товарные предложения</h2>
            <a href="/model#<%= model.id %>"><%= model.name %></a>
<% } %>
        </div>
        <div class="b-table__tr__td b-table__tr__td_right j-export">
            Экспорт: <a href="#">csv</a>
        </div>
    </div>
</div>
<div class="b-table b-offers__table">
    <div class="b-table__tr">
        <div class="b-table__tr__td b-table__tr__td_nowidth j-filters"></div>
        <div class="b-table__tr__td b-table__tr__td_wide j-offers"></div>
    </div>
</div>