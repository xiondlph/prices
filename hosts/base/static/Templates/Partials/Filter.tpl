<div class="b-fiters">
<% for (index in filter) { %>
<%     if (filter[index].shortname === 'Vendor') { %>
    <div class="b-filter__item j-filter__item" filter-id="<%= filter[index].id %>" filter-index="<%= index %>" <% if (params.hasOwnProperty('vendor_id')) {%>filter-value="<%= params['vendor_id'] %>"<% } %>>
<%     } else { %>
    <div class="b-filter__item j-filter__item" filter-id="<%= filter[index].id %>" filter-index="<%= index %>" <% if (params.hasOwnProperty(filter[index].id)) {%>filter-value="<%= params[filter[index].id] %>"<% } %>>
<%     } %>
        <div class="b-filter__item__label j-filter__item_label"><%= filter[index].name %></div>
        <div class="b-filter__item__widget j-filter__item_widget"></div>
    </div>
<% } %>
<% if (params.hasOwnProperty('shop_id')) { %>
	<div class="b-filter__item">
		<div class="b-filter__item__label j-filter__item_label">Магазин</div>
	</div>
<% } %>
    <button class="f-btn j-filter__reset">Сбросить фильтр</button>
</div>