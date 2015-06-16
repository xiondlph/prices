<% for (var i = 1; i < filters.length; i++) { %>
<div class="b-filter__item j-filter__item" filter-id="<%= filters[i].id %>" filter-type="<%= filters[i].type %>" filter-index="<%= i %>">
	<div class="b-filter__item__widget j-filter__item_label"><%= filters[i].name %></div>
	<div class="b-filter__item__widget j-filter__item_widget"></div>
</div>
<% } %>