<% if (obj.hasOwnProperty('shop')) { %>
<table width="100%">
    <tr>
        <td><%= shop.name %> (<%= shop.shopName %>)</td>
        <td align="right" valign="top"><a href="#" class="j-filter__item__widget_shops__delete">Удалить</a></td>
    </tr>
    <tr>
        <td colspan="2"><a href="#" class="j-filter__item__widget_shops__select">Выбрать другой</a></td>
    </tr>
</table>
<% } else {%>
<a href="#" class="j-filter__item__widget_shops__select">Выбрать</a>
<% } %>