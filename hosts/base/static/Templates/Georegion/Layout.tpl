<div class="b-table b-georegion__table">
    <div class="b-table__tr">
        <div class="b-table__tr__td b-table__tr__td_wide b-georegion__table__path">
            <a href="#" data-index="0" class="j-georegion__path">Регионы</a>
<% if (path.length > 1) { %>
<%     for (var i = 1; i < path.length; i++) { %>
<%         if (path[i].georegion.childrenCount > 0) { %>
            <a href="#<%= path[i].georegion.id %>" data-index="<%= i %>" class="j-georegion__path"><%= path[i].georegion.name %></a>
<%         } %>
<%     } %>
<% } %>
        </div>
    </div>
<% if (georegions.items.length > 0) { %>
    <div class="b-table__tr">
        <div class="b-table__tr__td b-table__tr__td_wide b-table__tr__td_col3 b-georegion__table__items">
<%     for (var i = 0; i < georegions.items.length; i++) { %>
                <div class="b-georegion__item" title="<%= georegions.items[i].name %>"><input type="radio" name="<%= georegions.items[i].parentId %>" data-index="<%= i %>" class="j-georegion__item__input" /><a href="#<%= georegions.items[i].id %>" class="j-georegion__item__link" data-index="<%= i %>"><%= georegions.items[i].name %></a></div>
<%     } %>
        </div>
    </div>
<%     if (georegions.total > 5) { %>
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
<%                 } else if (georegions.total > (i * 5) - 5) { %>
            <a href="#" data-page="<%= i %>" class="j-page"><%= i %></a>
<%                 } %>
<%             } %>
<%         } %>
<%         if (georegions.total > ((georegions.page + 3) * 5) - 5) { %>
            <span>...</span>
            <a href="#" data-page="<%= Math.ceil(georegions.total / 5) %>" class="j-page"><%= Math.ceil(georegions.total / 5) %></a>
<%         } %>
<%         if (georegions.total > ((georegions.page + 1) * 5) - 5) { %>
            <a href="#" data-page="<%= georegions.page + 1 %>" class="j-page">&rarr;</a>
<%         } %>
        </div>
    </div>
<%     } %>
<% } else { %>
    <div class="b-table__tr">
        <div class="b-table__tr__td b-table__tr__td_wide">
            <h3><%= path[path.length - 1].georegion.name %></h3>
        </div>
    </div>
<% } %>
    <div class="b-table__tr">
        <div class="b-table__tr__td b-table__tr__td_wide">
            <button class="f-btn j-georegion__apply">Ok</button>
        </div>
    </div>
</div>