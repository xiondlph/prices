<% if (obj.search && search.results.length > 0 && search.page > 0) { %>
            <table cellpadding="0" cellspacing="0" class="b-grid">
                <tr class="b-grid__row">
                    <th class="b-grid__head">Название</th>
                    <th class="b-grid__head">Цена</th>
                    <th class="b-grid__head">Тип</th>
                </tr>
<%     for (var i = 0; i < search.results.length; i++) { %>
                <tr class="b-grid__row">
<%         if (search.results[i].hasOwnProperty('offer')) { %>
                    <td class="b-grid__cell b-grid__cell_item"><span class="b-grid__cell__cont"><%= search.results[i].offer.name %></span></td>
                    <td class="b-grid__cell b-grid__cell_item"><span class="b-grid__cell__cont"><%= search.results[i].offer.price.value %></span></td>
                    <td class="b-grid__cell b-grid__cell_item"><span class="b-grid__cell__cont">Предложение</span></td>
<%         } else { %>
                    <td class="b-grid__cell b-grid__cell_item"><span class="b-grid__cell__cont"><a href="/model#<%= search.results[i].model.id %>"><%= search.results[i].model.name %></a></span></td>
<%             if (search.results[i].model.hasOwnProperty('prices')) { %>
                    <td class="b-grid__cell b-grid__cell_item"><span class="b-grid__cell__cont"><%= [search.results[i].model.prices.min, search.results[i].model.prices.max].join('-') %></span></td>
<%             } else { %>
                    <td class="b-grid__cell b-grid__cell_item"><span class="b-grid__cell__cont">-</span></td>
<%             } %>
                    <td class="b-grid__cell b-grid__cell_item"><span class="b-grid__cell__cont">Модель</span></td>
<%         } %>
                </tr>
<%     } %>
<%
       search.total = search.total <= 15000 ? search.total : 15000;

       if (search.total > 30) { %>
                <tr class="b-grid__row b-pagination j-pagination">
                    <td class="b-grid__cell" colspan="8">
<%         if (search.page > 1) { %>
                        <a href="#<%= categoryId %>/<%= search.requestParams.text %>/1">В начало</a>
                        <a href="#<%= categoryId %>/<%= search.requestParams.text %>/<%= search.page - 1 %>">&larr;</a>
<%         } %>
<%         for (var i = search.page - 2; i < search.page + 3; i++) { %>
<%             if (i > 0) { %>
<%                 if (i == search.page) { %>
                        <span><%= i %></span>
<%                 } else if (search.total > (i * 30) - 30) { %>
                        <a href="#<%= categoryId %>/<%= search.requestParams.text %>/<%= i %>"><%= i %></a>
<%                 } %>
<%             } %>
<%         } %>
<%         if (search.total > ((search.page + 3) * 30) - 30) { %>
                        <span>...</span>
                        <a href="#<%= categoryId %>/<%= search.requestParams.text %>/<%= Math.ceil(search.total / 30) %>"><%= Math.ceil(search.total / 30) %></a>
<%         } %>
<%         if (search.total > ((search.page + 1) * 30) - 30) { %>
                        <a href="#<%= categoryId %>/<%= search.requestParams.text %>/<%= search.page + 1 %>">&rarr;</a>
<%         } %>
                    </td>
                </tr>
<%     } %>
            </table>
<% } %>