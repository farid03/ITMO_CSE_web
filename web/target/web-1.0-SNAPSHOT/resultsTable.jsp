<%--
  Created by IntelliJ IDEA.
  User: fkurb
  Date: 17.11.2021
  Time: 12:59
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!--<html>
<head>
<title>Web2 Results</title>
</head>
<body> -->
<table id="main-grid">
    <tr>
        <td>
            <form method="GET" action="<%= request.getContextPath() %>/ControllerServlet">
                <button id="button" type="submit">Вернуться назад</button>
            </form>
        </td>
    </tr>
    <jsp:include page="table.jsp"/>

    <tr>
        <td id="footer-title" colspan="2">
            <center class="center-aligned">Если возникли вопросы писать <a href="https://t.me/fk1203">сюда</a></center>
        </td>
    </tr>
</table>
<!--</body>
</html>-->
