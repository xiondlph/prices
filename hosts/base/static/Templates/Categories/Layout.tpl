<div class="b-table b-top__table">
    <div class="b-table__tr">
        <div class="b-table__tr__td b-table__tr__td_wide">
            <a href="/categories" class="b-categories__path__item">Категории</a>
<% if (obj.hasOwnProperty('category') && category.parentId !== 0) { %>
<%     if (category.parentId !== 90401) { %>
            <a href="#<%= category.parentId %>" class="b-categories__path__item"> . . . </a>
<%     } %>
            <a href="#<%= category.id %>" class="b-categories__path__item"><%= category.name %></a>
<% } %>
        </div>
        <div class="b-table__tr__td b-table__tr__td_right j-search_panel"></div>
        <div class="b-table__tr__td b-table__tr__td_right j-georegion"></div>
    </div>
</div>
<div class="b-table b-categories__table">
    <div class="b-table__tr">
<% if (categories.items.length > 0) { %>
        <div class="b-table__tr__td b-table__tr__td_wide b-table__tr__td_col3">
<%     for (var count = 0, i = 0; i < categories.items.length; i++) { %>
<%         if (categories.items[i].childrenCount > 0) {  count++ %>
            <a href="#<%= categories.items[i].id %>" class="b-categories__item" title="<%= categories.items[i].name %>"><%= categories.items[i].name %></a>
<%         } else { %>
<%             if (categories.items[i].modelsNum > 0) { count++ %>
            <a href="/models#<%= categories.items[i].id %>" class="b-categories__item" title="<%= categories.items[i].name %> (<%= categories.items[i].modelsNum %>)"><%= categories.items[i].name %> (<%= categories.items[i].modelsNum %>)</a>
<%             } %>
<%         } %>
<%     } %>
<%     if (count === 0) { %>
          <p>В данной категории нет моделей</p>
<%     } %>
        </div>
<% } else { %>
        <div class="b-table__tr__td b-table__tr__td_wide">
            <h3><%= category.name %></h3>
        </div>
<% } %>
    </div>
</div>