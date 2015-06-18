<div class="b-fiters">
<% for (index in filters) { %>
<%     if (filters[index].shortname === 'Vendor') { %>
    <div class="b-filter__item j-filter__item" filter-id="<%= filters[index].id %>" filter-index="<%= index %>" <% if (params.hasOwnProperty('vendor_id')) {%>filter-value="<%= params['vendor_id'] %>"<% } %>>
<%     } else { %>
    <div class="b-filter__item j-filter__item" filter-id="<%= filters[index].id %>" filter-index="<%= index %>" <% if (params.hasOwnProperty(filters[index].id)) {%>filter-value="<%= params[filters[index].id] %>"<% } %>>
<%     } %>
        <div class="b-filter__item__label j-filter__item_label"><%= filters[index].name %></div>
        <div class="b-filter__item__widget j-filter__item_widget"></div>
    </div>
<% } %>
    <button class="f-btn j-filters__reset">Сбросить фильтр</button>
</div>