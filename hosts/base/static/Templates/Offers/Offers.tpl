<% if (obj.offers && offers.items.length > 0 && offers.page > 0) { %>
            <table cellpadding="0" cellspacing="0" class="b-grid">
                <tr class="b-grid__row">
                    <th class="b-grid__head">Магазин</th>
                    <th class="b-grid__head">Название</th>
                    <th class="b-grid__head b-grid__head_center">Цена</th>
                    <th class="b-grid__head b-grid__head_center">В наличии</th>
                </tr>
<%     for (var i = 0; i < offers.items.length; i++) { %>
                <tr class="b-grid__row">
                    <td class="b-grid__cell b-grid__cell_item"><span class="b-grid__cell__cont"><a href="#" class="j-shop" data-shop="<%= offers.items[i].shopInfo.id %>"><%= offers.items[i].shopInfo.name %></a></span></td>
                    <td class="b-grid__cell b-grid__cell_item"><span class="b-grid__cell__cont<% if (offers.items[i].name.length > 72) { %> b-grid__cell__cont_break<% } %>" title='<%= offers.items[i].name %>'><%= offers.items[i].name %></span></td>
                    <td class="b-grid__cell b-grid__cell_center b-grid__cell_item"><span class="b-grid__cell__cont"><%= offers.items[i].price.value %></span></td>
                    <td class="b-grid__cell b-grid__cell_center b-grid__cell_item">
                        <span class="b-grid__cell__cont">
<%     if (offers.items[i].onStock > 0) { %>
                            Да
<%     } else { %>
                            Нет
<%     } %>
                        </span>
                    </td>
                </tr>
<%     } %>
<%     if (offers.total > 30) { %>
                <tr class="b-grid__row b-pagination j-pagination">
                    <td class="b-grid__cell" colspan="4">
<%         if (offers.page > 1) { %>
                        <a href="#<%= modelId %>/1">В начало</a>
                        <a href="#<%= modelId %>/<%= offers.page - 1 %>">&larr;</a>
<%         } %>
<%         for (var i = offers.page - 2; i < offers.page + 3; i++) { %>
<%             if (i > 0) { %>
<%                 if (i == offers.page) { %>
                        <span><%= i %></span>
<%                 } else if (offers.total > (i * 30) - 30) { %>
                        <a href="#<%= modelId %>/<%= i %>"><%= i %></a>
<%                 } %>
<%             } %>
<%         } %>
<%         if (offers.total > ((offers.page + 3) * 30) - 30) { %>
                        <span>...</span>
                        <a href="#<%= modelId %>/<%= Math.ceil(offers.total / 30) %>"><%= Math.ceil(offers.total / 30) %></a>
<%         } %>
<%         if (offers.total > ((offers.page + 1) * 30) - 30) { %>
                        <a href="#<%= modelId %>/<%= offers.page + 1 %>">&rarr;</a>
<%         } %>
                    </td>
                </tr>
<%     } %>
            </table>
<% } %>