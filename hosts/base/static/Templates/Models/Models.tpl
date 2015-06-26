<% if (obj.models && models.items.length > 0 && models.page > 0) { %>
            <table cellpadding="0" cellspacing="0" class="b-grid">
                <tr class="b-grid__row">
                    <th class="b-grid__head">Производитель</th>
                    <th class="b-grid__head">Название</th>
                    <th class="b-grid__head b-grid__head_center">Макс. цена</th>
                    <th class="b-grid__head b-grid__head_center">Мин. цена</th>
                    <th class="b-grid__head b-grid__head_center">Ср. цена</th>
                    <th class="b-grid__head b-grid__head_center">Рейтинг</th>
                    <th class="b-grid__head b-grid__head_center">Предложений</th>
                </tr>
<%     for (var i = 0; i < models.items.length; i++) { %>
                <tr class="b-grid__row">
                    <td class="b-grid__cell b-grid__cell_item"><span class="b-grid__cell__cont"><%= models.items[i].vendor %></span></td>
                    <td class="b-grid__cell b-grid__cell_item"><span class="b-grid__cell__cont"><a href="/model#<%= models.items[i].id %>"><%= models.items[i].name %></a></span></td>
                    <td class="b-grid__cell b-grid__cell_center b-grid__cell_item"><span class="b-grid__cell__cont"><% if (models.items[i].prices) { print(models.items[i].prices.max) } else { print('-')} %></span></td>
                    <td class="b-grid__cell b-grid__cell_center b-grid__cell_item"><span class="b-grid__cell__cont"><% if (models.items[i].prices) { print(models.items[i].prices.min) } else { print('-')} %></span></td>
                    <td class="b-grid__cell b-grid__cell_center b-grid__cell_item"><span class="b-grid__cell__cont"><% if (models.items[i].prices) { print(models.items[i].prices.avg) } else { print('-')} %></span></td>
                    <td class="b-grid__cell b-grid__cell_center b-grid__cell_item"><span class="b-grid__cell__cont"><%= models.items[i].rating %></span></td>
                    <td class="b-grid__cell b-grid__cell_center b-grid__cell_item"><span class="b-grid__cell__cont"><a href="/offers#<%= models.items[i].id %>"><%= models.items[i].offersCount %></a></span></td>
                </tr>
<%     } %>
<%
       models.total = models.total <= 1500 ? models.total : 1500;

       if (models.total > 30) { %>
                <tr class="b-grid__row b-pagination j-pagination">
                    <td class="b-grid__cell" colspan="8">
<%         if (models.page > 1) { %>
                        <a href="#<%= models.categoryId %>/1">В начало</a>
                        <a href="#<%= models.categoryId %>/<%= models.page - 1 %>">&larr;</a>
<%         } %>
<%         for (var i = models.page - 2; i < models.page + 3; i++) { %>
<%             if (i > 0) { %>
<%                 if (i == models.page) { %>
                        <span><%= i %></span>
<%                 } else if (models.total > (i * 30) - 30) { %>
                        <a href="#<%= models.categoryId %>/<%= i %>"><%= i %></a>
<%                 } %>
<%             } %>
<%         } %>
<%         if (models.total > ((models.page + 3) * 30) - 30) { %>
                        <span>...</span>
                        <a href="#<%= models.categoryId %>/<%= Math.ceil(models.total / 30) %>"><%= Math.ceil(models.total / 30) %></a>
<%         } %>
<%         if (models.total > ((models.page + 1) * 30) - 30) { %>
                        <a href="#<%= models.categoryId %>/<%= models.page + 1 %>">&rarr;</a>
<%         } %>
                    </td>
                </tr>
<%     } %>
            </table>
<% } %>