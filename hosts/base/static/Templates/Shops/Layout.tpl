<div class="b-table b-georegion__table">
<% if (outlets.outlet.length > 0) { %>
    <div class="b-table__tr">
        <div class="b-table__tr__td b-table__tr__td_wide b-table__tr__td_col3 b-georegion__table__items">
<%     for (var i = 0; i < outlets.outlet.length; i++) { %>
                <div class="b-georegion__item" title="<%= outlets.outlet[i].shopName %>"><a href="#<%= outlets.outlet[i].shopId %>" class="j-georegion__item__link" data-index="<%= i %>"><%= outlets.outlet[i].shopName %></a></div>
<%     } %>
        </div>
    </div>
<%     if (outlets.total > 5) { %>
    <div class="b-table__tr">
        <div class="b-table__tr__td b-table__tr__td_wide b-georegion__table__pagination">
<%         if (outlets.page > 1) { %>
            <a href="#" data-page="1" class="j-page">В начало</a>
            <a href="#" data-page="<%= outlets.page - 1 %>" class="j-page">&larr;</a>
<%         } %>
<%         for (var i = outlets.page - 2; i < outlets.page + 3; i++) { %>
<%             if (i > 0) { %>
<%                 if (i == outlets.page) { %>
            <span><%= i %></span>
<%                 } else if (outlets.total > (i * 5) - 5) { %>
            <a href="#" data-page="<%= i %>" class="j-page"><%= i %></a>
<%                 } %>
<%             } %>
<%         } %>
<%         if (outlets.total > ((outlets.page + 3) * 5) - 5) { %>
            <span>...</span>
            <a href="#" data-page="<%= Math.ceil(outlets.total / 5) %>" class="j-page"><%= Math.ceil(outlets.total / 5) %></a>
<%         } %>
<%         if (outlets.total > ((outlets.page + 1) * 5) - 5) { %>
            <a href="#" data-page="<%= outlets.page + 1 %>" class="j-page">&rarr;</a>
<%         } %>
        </div>
    </div>
<%     } %>
<% } %>
</div>