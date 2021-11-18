<%@ page import="model.Results" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<!DOCTYPE html>

<html lang="ru">
<!--
Студент,	 выполнивший работу: Курбанов Фарид
Группа: P3212
Вариант: 12010
-->
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="styles/style.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script defer src="scripts/graph.js"></script>
    <script defer src="scripts/valid.js"></script>
    <title>Web2</title>
</head>

<body onload="start()">
<table id="main-grid">
    <tr>
        <center>
            <td id="header-title" colspan="2">
                <center id="header-text" class="left-aligned">
                    Курбанов Фарид Афизович<br>
                    Группа: P3212<br>
                    Вариант: 12032
                </center>
            </td>
        </center>
    </tr>
    <tr>
        <td id="content-graph" width="40%">
            <center>
                <!--<p><img src="img/graph.png" alt="Координатная плоскость" width="50%"></p>-->
                <canvas id="graph" height="400%" width="400%" style="background: transparent;"></canvas>
                <!--<script src="scripts/graph.js"></script>-->
            </center>
        </td>
        <td id="content-form">
            <form id="input-form" action="<%= request.getContextPath() %>/ControllerServlet" method="POST">
                <fieldset>
                    <legend><span id="legend-text">Проверьте вашу точку</span></legend>
                    <table id="input-form-table">
                        <!-- X-input field -->
                        <tr class="label-col">
                            <td rowspan="2" class="input-grid-label">
                                <label class="bold-label">X[-5..3]: </label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input name="x" id="xtextinput" type="text" class="number1" data-min="-5" data-max="3"
                                       data-separator=".">
                            </td>
                        </tr>

                        <!-- Y-input field -->
                        <tr class="label-col">
                            <td rowspan="2" class="input-grid-label">
                                <label class="bold-label">Y: </label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <!-- There are a few checkbox fields that contained in one row of a table -->
                                <table>
                                    <tr>
                                        <td class="r-checkbox">
                                            <label>
                                                <input type="checkbox" class="y-input-checkbox" id="ycheckbox1"
                                                       value="-">
                                                <span>-2</span>
                                            </label>
                                        </td>
                                        <td class="r-checkbox">
                                            <label>
                                                <input type="checkbox" class="y-input-checkbox" id="ycheckbox2"
                                                       value="-1,5">
                                                <span>-1,5</span>
                                            </label>
                                        </td>
                                        <td class="r-checkbox">
                                            <label>
                                                <input type="checkbox" class="y-input-checkbox" id="ycheckbox3"
                                                       value="-1">
                                                <span>-1</span>
                                            </label>
                                        </td>
                                        <td class="r-checkbox">
                                            <label>
                                                <input type="checkbox" class="y-input-checkbox" id="ycheckbox4"
                                                       value="-0,5">
                                                <span>-0,5</span>
                                            </label>
                                        </td>
                                        <td class="r-checkbox">
                                            <label>
                                                <input type="checkbox" class="y-input-checkbox" id="ycheckbox5" value="0">
                                                <span>0</span>
                                            </label>
                                        </td>
                                        <td class="r-checkbox">
                                            <label>
                                                <input type="checkbox" class="y-input-checkbox" id="ycheckbox6"
                                                       value="0,5">
                                                <span>0,5</span>
                                            </label>
                                        </td>
                                        <td class="r-checkbox">
                                            <label>
                                                <input type="checkbox" class="y-input-checkbox" id="ycheckbox7" value="1">
                                                <span>1</span>
                                            </label>
                                        </td>
                                        <td class="r-checkbox">
                                            <label>
                                                <input type="checkbox" class="y-input-checkbox" id="ycheckbox8"
                                                       value="1,5">
                                                <span>1,5</span>
                                            </label>
                                        </td>
                                        <td class="r-checkbox">
                                            <label>
                                                <input type="checkbox" class="y-input-checkbox" id="ycheckbox9" value="2">
                                                <span>2</span>
                                            </label>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <!-- R-input field -->
                        <tr class="label-col">
                            <td rowspan="2" class="input-grid-label">
                                <label class="bold-label">R: </label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <!-- There are a few checkbox fields that contained in one row of a table -->
                                <table>
                                    <tr>
                                        <td class="r-checkbox">
                                            <label>
                                                <input type="checkbox" class="r-input-checkbox" id="rcheckbox1"
                                                       value="1">
                                                <span>1</span>
                                            </label>
                                        </td>
                                        <td class="r-checkbox">
                                            <label>
                                                <input type="checkbox" class="r-input-checkbox" id="rcheckbox2"
                                                       value="2">
                                                <span>2</span>
                                            </label>
                                        </td>
                                        <td class="r-checkbox">
                                            <label>
                                                <input type="checkbox" class="r-input-checkbox" id="rcheckbox3"
                                                       value="3">
                                                <span>3</span>
                                            </label>
                                        </td>
                                        <td class="r-checkbox">
                                            <label>
                                                <input type="checkbox" class="r-input-checkbox" id="rcheckbox4"
                                                       value="4">
                                                <span>4</span>
                                            </label>
                                        </td>
                                        <td class="r-checkbox">
                                            <label>
                                                <input type="checkbox" class="r-input-checkbox" id="rcheckbox5" value="5"
                                                       checked>
                                                <span>5</span>
                                            </label>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    <input name='form' id="forsubmit" class="button-form" type="button" value="Проверить"
                           onclick="startPHP()">
                    <input id="forreset" class="button-form" type="reset" value="Сбросить">
                </fieldset>
            </form>
        </td>

    </tr>

    <tr>
        <td colspan="2" id="answer">
            <center id="textwindow">
                (✿◡‿◡)☆*: .｡. o(≧▽≦)o .｡.:*☆ヾ(≧▽≦*)o
            </center>
        </td>
    </tr>
    <jsp:include page="table.jsp"/>
    <tr>
        <td id="footer-title" colspan="2">
            <center class="center-aligned">Если возникли вопросы писать <a href="https://t.me/fk1203">сюда</a></center>
        </td>
    </tr>
</table>
<!--<script src="scripts/valid.js"></script>-->
</body>

</html>