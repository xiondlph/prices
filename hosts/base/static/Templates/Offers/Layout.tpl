<div class="b-table b-top__table">
    <div class="b-table__tr">
        <div class="b-table__tr__td b-table__tr__td_wide">
            <a href="/categories" class="b-categories__path__item">Категории</a>
<% if (path.length > 1) { %>
<%     for (var i = 1; i < path.length; i++) { %>
<%         if (i < path.length-1) { %>
            <a href="/categories#<%= path[i].category.id %>" class="b-categories__path__item"><%= path[i].category.name %></a>
<%         } else { %>
            <a href="/models#<%= path[i].category.id %>" class="b-categories__path__item"><%= path[i].category.name %></a>
<%         }  %>
<%     } %>
<% } %>
        </div>
        <div class="b-table__tr__td b-table__tr__td_right j-georegion"></div>
    </div>
    <div class="b-table__tr">
        <div class="b-table__tr__td">
<% if (obj.model) { %>
            <a><%= model.name %></a>
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