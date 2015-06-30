<div class="b-table b-top__table">
    <div class="b-table__tr">
        <div class="b-table__tr__td b-table__tr__td_wide">
            <a href="/models#<%= category.id %>" class="b-categories__path__item"><%= category.name %></a>
        </div>
        <div class="b-table__tr__td b-table__tr__td_right j-georegion"></div>
    </div>
</div>
<div class="b-table b-model__table">
    <div class="b-table__tr">
        <div class="b-table__tr__td b-table__tr__td_nowidth"><img src="<%= model.mainPhoto.url %>" /></div>
        <div class="b-table__tr__td b-table__tr__td_wide">
            <p><%= model.vendor %></p>
            <p><%= model.name %></p>
            <p><%= model.description %></p>
        </div>
    </div>
</div>