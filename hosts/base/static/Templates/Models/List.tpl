<table cellpadding="0" cellspacing="0" class="b-grid">
    <tr class="b-grid__row">
        <th class="b-grid__head">Название</th>
        <th class="b-grid__head">Макс. цена</th>
        <th class="b-grid__head">Мин. цена</th>
        <th class="b-grid__head">Средняя цена</th>
        <th class="b-grid__head">Предложений</th>
    </tr>
<% for (var i = 0; i < items.length; i++) { %>
	<tr class="b-grid__row">
		<td class="b-grid__cell b-grid__cell_item"><span><%= items[i].name %></span></td>
		<td class="b-grid__cell b-grid__cell_item"><span><%= items[i].prices.max %> <%= items[i].prices.curName %></span></td>
		<td class="b-grid__cell b-grid__cell_item"><span><%= items[i].prices.min %> <%= items[i].prices.curName %></span></td>
		<td class="b-grid__cell b-grid__cell_item"><span><%= items[i].prices.avg %> <%= items[i].prices.curName %></span></td>
		<td class="b-grid__cell b-grid__cell_item"><span><%= items[i].offersCount %></span></td>
	</tr>  
<% } %>
</table>