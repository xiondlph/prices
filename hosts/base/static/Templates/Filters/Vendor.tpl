<select>
    <option value="">Все</option>
<% for (index in option.options){ %>
    <option value="<%= option.options[index].valueId %>" <% if (obj.hasOwnProperty('value') && value === option.options[index].valueId) { %>selected="select"<% } %>><%= option.options[index].valueText %></option>
<% } %>
</select>