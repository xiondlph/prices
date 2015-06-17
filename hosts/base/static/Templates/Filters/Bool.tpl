<select>
    <option value="">Неважно</option>
    <option value="y" <% if (obj.hasOwnProperty('value') && value === "y") { %>selected="select"<% } %>>Да</option>
    <option value="n" <% if (obj.hasOwnProperty('value') && value === "n") { %>selected="select"<% } %>>Нет</option>
</select>