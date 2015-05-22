<form id="filters">
    <table>
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
<%     if (filters[i].type === 'ENUMERATOR') { %>
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