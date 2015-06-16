<form id="filters">
    <table>
        <tr>
            <td>
                <label for="vendor"><%= filters[2].name %></label>
            </td>
            <td>
                <select id="vendor">
                    <option value="0">Все</option>
<%          for (index in filters[2].options){ %>
                    <option value="<%= filters[2].options[index].valueId %>"><%= filters[2].options[index].valueText %></option>
<%          } %>
                </select>
            </td>
        </tr>
<% for (var i = 1; i < filters.length; i++) { %>
<%     if (filters[i].type === 'BOOL') { %>
        <tr>
            <td>
                <label for="<%= filters[i].id %>"><%= filters[i].name %></label>
            </td>
            <td>
                <select name="<%= filters[i].id %>" id="<%= filters[i].id %>">
                    <option value="1">Да</option>
                    <option value="0">Нет</option>
                    <option value="-1" selected="">Неважно</option>
                </select>
            </td>
        </tr>
<%     } %>
<%     if (filters[i].type === 'ENUMERATOR' && filters[i].enumFilterType !== 'VENDOR') { %>
        <tr>
            <td>
                <label for="<%= filters[i].id %>"><%= filters[i].name %></label>
            </td>
            <td>
                <select name="<%= filters[i].id %>" id="<%= filters[i].id %>" multiple size="5">
<%          for (index in filters[i].options){ %>
                    <option value="<%= filters[i].options[index].valueId %>"><%= filters[i].options[index].valueText %></option>
<%          } %>
                </select>
            </td>
        </tr>
<%     } %>
<% } %>
    </table>
</form>