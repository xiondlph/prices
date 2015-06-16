<select>
    <option value="-1" <% if (obj.hasOwnProperty('value') || value === "-1") { %>selected="select"<% } %>>Неважно</option>
    <option value="1" <% if (obj.hasOwnProperty('value') && value === "1") { %>selected="select"<% } %>>Да</option>
    <option value="0" <% if (obj.hasOwnProperty('value') && value === "0") { %>selected="select"<% } %>>Нет</option>
</select>