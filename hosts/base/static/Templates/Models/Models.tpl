<div class="b-table b-categories__table">
    <div class="b-table__tr">
        <div class="b-table__tr__td b-table__tr__td_wide">
            <a href="/models">Категории</a>
<% if (path.length > 1) { %>
<%     for (var i = 1; i < path.length; i++) { %>
            <a href="#<%= path[i].category.id %>"><%= path[i].category.name %></a>
<%     } %>
<% } %>
        </div>
    </div>
<% if (categories.items.length > 0) { %>
    <div class="b-table__tr">
        <div class="b-table__tr__td b-table__tr__td_wide b-table__tr__td_col3">
<%     for (var i = 0; i < categories.items.length; i++) { %>
            <a href="#<%= categories.items[i].id %>" class="b-categories__item"><%= categories.items[i].name %></a>
<%     } %>
        </div>
    </div>
<% } %>
</div>
<% if (obj.models && models.items.length > 0) { %>
<div class="b-table b-models__table">
    <div class="b-table__tr">
        <div class="b-table__tr__td">
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
                    <td class="b-grid__cell b-grid__cell_item"><span><%= models.items[i].prices.max %> <%= models.items[i].prices.curName %></span></td>
                    <td class="b-grid__cell b-grid__cell_item"><span><%= models.items[i].prices.min %> <%= models.items[i].prices.curName %></span></td>
                    <td class="b-grid__cell b-grid__cell_item"><span><%= models.items[i].prices.avg %> <%= models.items[i].prices.curName %></span></td>
                    <td class="b-grid__cell b-grid__cell_item"><span><%= models.items[i].offersCount %></span></td>
                </tr>  
<%     } %>
            </table>
        </div>
    </div>
</div>
<% } %>