<div class="b-table b-top__table">
    <div class="b-table__tr">
        <div class="b-table__tr__td b-table__tr__td_wide">
<%         if (category.childrenCount > 0) { %>
            <a href="/categories#<%= category.id %>" class="b-categories__path__item"><%= category.name %></a>
<%         } else { %>
            <a href="/models#<%= category.id %>" class="b-categories__path__item"><%= category.name %></a>
<%         } %>
        </div>
        <div class="b-table__tr__td b-table__tr__td_right j-search_panel"></div>
        <div class="b-table__tr__td b-table__tr__td_right j-georegion"></div>
    </div>
    <div class="b-table__tr">
        <div class="b-table__tr__td">
            <h2>Результаты поиска</h2>
        </div>
        <div class="b-table__tr__td"></div>
    </div>
</div>
<div class="b-table b-search__table">
    <div class="b-table__tr">
        <div class="b-table__tr__td b-table__tr__td_wide j-search"></div>
    </div>
</div>