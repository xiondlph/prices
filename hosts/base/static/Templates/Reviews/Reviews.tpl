<% if (obj.modelOpinions && modelOpinions.opinion.length > 0 && modelOpinions.page > 0) { %>
            <table cellpadding="0" cellspacing="0" class="b-grid">
                <tr class="b-grid__row">
                    <th class="b-grid__head">Автор</th>
                    <th class="b-grid__head">Текст</th>
                    <th class="b-grid__head b-grid__head_center">Оценка</th>
                </tr>
<%     for (var i = 0; i < modelOpinions.opinion.length; i++) { %>
                <tr class="b-grid__row">
                    <td class="b-grid__cell b-grid__cell_item">
<%         if (modelOpinions.opinion[i].hasOwnProperty('author')) { %>
                        <span class="b-grid__cell__cont<% if (modelOpinions.opinion[i].author.length > 72) { %> b-grid__cell__cont_break<% } %>" title='<%= modelOpinions.opinion[i].author %>'><%= modelOpinions.opinion[i].author %></span>
<%         } else { %>
                        <span class="b-grid__cell__cont">Гость</span>
<%         } %>
                    </td>
                    <td class="b-grid__cell b-grid__cell_item">
<%         if (modelOpinions.opinion[i].hasOwnProperty('text')) { %>
                        <span class="b-grid__cell__cont<% if (modelOpinions.opinion[i].text.length > 72) { %> b-grid__cell__cont_break<% } %>" title='<%= modelOpinions.opinion[i].text %>'><a href="#" class="j-reviews__item__text" data-index="<%= i %>"><%= modelOpinions.opinion[i].text %></a></span>
<%         } %>
                    </td>
                    <td class="b-grid__cell b-grid__cell_center b-grid__cell_item"><span class="b-grid__cell__cont"><%= modelOpinions.opinion[i].grade %></span></td>
                </tr>
<%     } %>
<%     if (modelOpinions.total > 30) { %>
                <tr class="b-grid__row b-pagination j-pagination">
                    <td class="b-grid__cell" colspan="4">
<%         if (modelOpinions.page > 1) { %>
                        <a href="#<%= modelId %>/1">В начало</a>
                        <a href="#<%= modelId %>/<%= modelOpinions.page - 1 %>">&larr;</a>
<%         } %>
<%         for (var i = modelOpinions.page - 2; i < modelOpinions.page + 3; i++) { %>
<%             if (i > 0) { %>
<%                 if (i == modelOpinions.page) { %>
                        <span><%= i %></span>
<%                 } else if (modelOpinions.total > (i * 30) - 30) { %>
                        <a href="#<%= modelId %>/<%= i %>"><%= i %></a>
<%                 } %>
<%             } %>
<%         } %>
<%         if (modelOpinions.total > ((modelOpinions.page + 3) * 30) - 30) { %>
                        <span>...</span>
                        <a href="#<%= modelId %>/<%= Math.ceil(modelOpinions.total / 30) %>"><%= Math.ceil(modelOpinions.total / 30) %></a>
<%         } %>
<%         if (modelOpinions.total > ((modelOpinions.page + 1) * 30) - 30) { %>
                        <a href="#<%= modelId %>/<%= modelOpinions.page + 1 %>">&rarr;</a>
<%         } %>
                    </td>
                </tr>
<%     } %>
            </table>
<% } %>