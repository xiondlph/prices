<div class="b-table b-shops__table">
<% if (outlets.outlet.length > 0) { %>
    <div class="b-table__tr">
        <div class="b-table__tr__td b-table__tr__td_wide b-table__tr__td_col3 b-shops__table__items">
<%     for (var i = 0; i < outlets.outlet.length; i++) { %>
                <div class="b-shops__item" title="<%= outlets.outlet[i].shopName %>"><a href="#" class="j-shops__item__link j-popup__close" data-id="<%= outlets.outlet[i].shopId %>"><%= outlets.outlet[i].shopName %></a></div>
<%     } %>
        </div>
    </div>
<%     if (outlets.total > 9) { %>
    <div class="b-table__tr">
        <div class="b-table__tr__td b-table__tr__td_wide b-shops__table__pagination">
<%         if (outlets.page > 1) { %>
            <a href="#" data-page="1" class="j-page">В начало</a>
            <a href="#" data-page="<%= outlets.page - 1 %>" class="j-page">&larr;</a>
<%         } %>
<%         for (var i = outlets.page - 2; i < outlets.page + 3; i++) { %>
<%             if (i > 0) { %>
<%                 if (i == outlets.page) { %>
            <span><%= i %></span>
<%                 } else if (outlets.total > (i * 9) - 9) { %>
            <a href="#" data-page="<%= i %>" class="j-page"><%= i %></a>
<%                 } %>
<%             } %>
<%         } %>
<%         if (outlets.total > ((outlets.page + 3) * 9) - 9) { %>
            <span>...</span>
            <a href="#" data-page="<%= Math.ceil(outlets.total / 9) %>" class="j-page"><%= Math.ceil(outlets.total / 9) %></a>
<%         } %>
<%         if (outlets.total > ((outlets.page + 1) * 9) - 9) { %>
            <a href="#" data-page="<%= outlets.page + 1 %>" class="j-page">&rarr;</a>
<%         } %>
        </div>
    </div>
<%     } %>
<% } %>
</div>