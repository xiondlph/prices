<% for (index in option.options){ %>
    <label><input type="checkbox" value="<%= option.options[index].valueId %>" <% if (obj.hasOwnProperty('value') && value.indexOf(option.options[index].valueId) > -1) { %>checked<% } %>/><%= option.options[index].valueText %></label><br />
<% } %>