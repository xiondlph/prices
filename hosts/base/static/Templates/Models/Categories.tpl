<% if (categories.items.length > 0) { %>
		<div class="b-table__tr__td b-table__tr__td_wide b-table__tr__td_col3">
<%     for (var i = 0; i < categories.items.length; i++) { %>
            <a href="#<%= categories.items[i].id %>" class="b-categories__item"><%= categories.items[i].name %></a>
<%     } %>
		</div>
<% } else { %>
		<div class="b-table__tr__td b-table__tr__td_wide">
			<h3><%= last.category.name %></h3>
		</div>
<% } %>