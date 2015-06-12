<div class="b-table b-offers__table">
    <div class="b-table__tr j-path">
        <div class="b-table__tr__td b-table__tr__td_wide">
            <a href="/categories">Категории</a>
<% if (path.length > 1) { %>
<%     for (var i = 1; i < path.length; i++) { %>
            <a href="/categories#<%= path[i].category.id %>"><%= path[i].category.name %></a>
<%     } %>
<% } %>
        </div>
    </div>
<% if (obj.model) { %>
    <div class="b-table__tr">
        <div class="b-table__tr__td">
            <h3><%= model.name %></h3>
            <p><%= model.description %></p>
        </div>
    </div>
<% } %>
    <div class="b-table__tr">
        <div class="b-table__tr__td j-export">
            <a href="#">Экспорт</a>
        </div>
    </div>
</div>
<div class="b-table b-offers__table">
    <div class="b-table__tr">
        <div class="b-table__tr__td j-offers"></div>
    </div>
</div>