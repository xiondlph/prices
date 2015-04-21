<% if (obj.models && models.items.length > 0 && models.page > 0) { %>
            <table cellpadding="0" cellspacing="0" class="b-grid">
                <tr class="b-grid__row">
                    <th class="b-grid__head">Производитель</th>
                    <th class="b-grid__head">Название</th>
                    <th class="b-grid__head">Макс. цена</th>
                    <th class="b-grid__head">Мин. цена</th>
                    <th class="b-grid__head">Средняя цена</th>
                    <th class="b-grid__head">Предложений</th>
                </tr>
<%     for (var i = 0; i < models.items.length; i++) { %>
                <tr class="b-grid__row">
                    <td class="b-grid__cell b-grid__cell_item"><span><%= models.items[i].vendor %></span></td>
                    <td class="b-grid__cell b-grid__cell_item"><span><%= models.items[i].name %></span></td>
                    <td class="b-grid__cell b-grid__cell_item"><span><% if (models.items[i].prices) { print(models.items[i].prices.max + ' ' + models.items[i].prices.curName) } else { print('-')} %></span></td>
                    <td class="b-grid__cell b-grid__cell_item"><span><% if (models.items[i].prices) { print(models.items[i].prices.min + ' ' + models.items[i].prices.curName) } else { print('-')} %></span></td>
                    <td class="b-grid__cell b-grid__cell_item"><span><% if (models.items[i].prices) { print(models.items[i].prices.avg + ' ' + models.items[i].prices.curName) } else { print('-')} %></span></td>
                    <td class="b-grid__cell b-grid__cell_item"><a href="/offers#<%= models.items[i].id %>"><%= models.items[i].offersCount %></a></td>
                </tr>
<%     } %>
<%     if (models.total > 30) { %>
                <tr class="b-grid__row b-pagination j-pagination">
                    <td class="b-grid__cell" colspan="6">
<%         if (models.page > 1) { %>
                        <a href="#<%= categoryId %>/1">В начало</a>
                        <a href="#<%= categoryId %>/<%= models.page - 1 %>">&larr;</a>
<%         } %>
<%         for (var i = models.page - 2; i < models.page + 3; i++) { %>
<%             if (i > 0) { %>
<%                 if (i == models.page) { %>
                        <span><%= i %></span>
<%                 } else if (models.total > (i * 30) - 30) { %>
                        <a href="#<%= categoryId %>/<%= i %>"><%= i %></a>
<%                 } %>
<%             } %>
<%         } %>
<%         if (models.total > ((models.page + 1) * 30) - 30) { %>
                        <a href="#<%= categoryId %>/<%= models.page + 1 %>">&rarr;</a>
<%         } %>
                    </td>
                </tr>
<%     } %>
            </table>
<% } %>