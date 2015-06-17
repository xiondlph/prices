<% for (index in option.options){ %>
    <label><input type="checkbox" value="<%= option.options[index].valueId %>" /><%= option.options[index].valueText %></label><br />
<% } %>