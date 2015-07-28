<div class="b-table b-georegion__table">
    <div class="b-table__tr">
        <div class="b-table__tr__td b-table__tr__td_wide b-georegion__table__path">
            <a href="#" data-index="0" class="b-georegion__path__item j-georegion__path">Регионы</a>
<% if (path.length > 1) { %>
<%     for (var i = 1; i < path.length - 1; i++) { %>
<%         if (path[i].georegion.childrenCount > 0) { %>
            <a href="#<%= path[i].georegion.id %>" data-index="<%= i %>" class="b-georegion__path__item j-georegion__path"><%= path[i].georegion.name %></a>
<%         } %>
<%     } %>
<% } %>
        </div>
    </div>
    <div class="b-table__tr">
        <div class="b-table__tr__td b-table__tr__td_wide b-georegion__table__current">
            Текущий регион: <strong><%= path[path.length - 1].georegion.id === 10000 ? 'Все регионы' : path[path.length - 1].georegion.name %></strong>
        </div>
    </div>
<% if (georegions.items.length > 0) { %>
    <div class="b-table__tr">
        <div class="b-table__tr__td b-table__tr__td_wide b-table__tr__td_col3 b-georegion__table__items">
<%     for (var i = 0; i < georegions.items.length; i++) { %>
                <div class="b-georegion__item" title="<%= georegions.items[i].name %>"><a href="#<%= georegions.items[i].id %>" class="b-georegion__item__select j-georegion__item__select" data-index="<%= i %>"><%= georegions.items[i].name %></a></div>
<%     } %>
        </div>
    </div>
<%     if (georegions.total > 6) { %>
    <div class="b-table__tr">
        <div class="b-table__tr__td b-table__tr__td_wide b-georegion__table__pagination">
<%         if (georegions.page > 1) { %>
            <a href="#" data-page="1" class="j-page">В начало</a>
            <a href="#" data-page="<%= georegions.page - 1 %>" class="j-page">&larr;</a>
<%         } %>
<%         for (var i = georegions.page - 2; i < georegions.page + 3; i++) { %>
<%             if (i > 0) { %>
<%                 if (i == georegions.page) { %>
            <span><%= i %></span>
<%                 } else if (georegions.total > (i * 6) - 6) { %>
            <a href="#" data-page="<%= i %>" class="j-page"><%= i %></a>
<%                 } %>
<%             } %>
<%         } %>
<%         if (georegions.total > ((georegions.page + 3) * 6) - 6) { %>
            <span>...</span>
            <a href="#" data-page="<%= Math.ceil(georegions.total / 6) %>" class="j-page"><%= Math.ceil(georegions.total / 6) %></a>
<%         } %>
<%         if (georegions.total > ((georegions.page + 1) * 6) - 6) { %>
            <a href="#" data-page="<%= georegions.page + 1 %>" class="j-page">&rarr;</a>
<%         } %>
        </div>
    </div>
<%     } %>
<% } %>
</div>