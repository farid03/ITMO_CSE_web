<%@ page import="model.Point" %>
<%@ page import="model.Results" %>
<%@ page import="java.text.DecimalFormat" %>
<%@ page import="java.text.DecimalFormatSymbols" %><%--
  Created by IntelliJ IDEA.
  User: fkurb
  Date: 16.11.2021
  Time: 20:36
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<tr>
    <td colspan="2" id="history-td">
        Таблица результатов
    </td>
</tr>
<tr>
    <td colspan="2" id="historyRow">
        <table id="historyBrowser">
            <% if (application.getAttribute("Collection") != null) {
               DecimalFormatSymbols symbols = new DecimalFormatSymbols();
               symbols.setDecimalSeparator('.');
               DecimalFormat f = new DecimalFormat("#0.00000", symbols);
               Results res = (Results) application.getAttribute("Collection");
               for (int i = res.getPoints().size() - 1; i >= 0 ; i--) {
               Point point = res.getPoints().get(i); %>
            <tr class='historyTd' data-x="<%= point.getX() %>" data-y="<%= point.getY() %>"  data-r="<%=point.getR()%>"  data-hit="<%=point.getHit()%>">
                <td class='historyElem'> Точка: (<%= point.getX()%>, <%= point.getY()%>)</td>
                <td class='historyElem'> Параметр: <%= point.getR()%></td>
                <td class='historyElem'> Отправка: <%=point.getCurrentTime()%></td>
                <td class='historyElem'> Исполнение: <%=f.format(Float.parseFloat(point.getScriptTime()) / 1_000_000) %> ms</td>
                <td class='historyElem'> Результат: <%= point.getHit()%></td>
            </tr>
            <% } %>
            <% } %>

        </table>
    </td>
</tr>