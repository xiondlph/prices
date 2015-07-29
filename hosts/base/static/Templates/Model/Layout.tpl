<div class="b-table b-top__table">
    <div class="b-table__tr">
        <div class="b-table__tr__td b-table__tr__td_wide">
            <a href="/models#<%= category.id %>" class="b-categories__path__item"><%= category.name %></a>
        </div>
        <div class="b-table__tr__td b-table__tr__td_right j-georegion"></div>
    </div>
    <div class="b-table__tr">
        <div class="b-table__tr__td">
            <h2>Модель</h2>
        </div>
        <div class="b-table__tr__td"></div>
    </div>
</div>
<div class="b-table b-model__table">
    <div class="b-table__tr">
        <div class="b-table__tr__td b-table__tr__td_nowidth">
            <img width="300" src="<%= model.mainPhoto.url %>" />
        </div>
        <div class="b-table__tr__td b-table__tr__td_wide">
            <table border="0" cellpadding="10" cellspacing="0">
                <tr>
                    <th valign="top" align="right">Производитель</th>
                    <td><%= model.vendor %></td>
                </tr>
                <tr>
                    <th valign="top" align="right">Название</th>
                    <td><%= model.name %></td>
                </tr>
                <tr>
                    <th valign="top" align="right">Описание</th>
                    <td><%= model.description %></td>
                </tr>
                <tr>
                    <td colspan="2" align="right">
                        <a href="offers#<%= model.id %>">Товариные предложения</a><br />
                        <a href="reviews#<%= model.id %>">Отзывы (<%= model.reviewsCount %>)</a>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</div>