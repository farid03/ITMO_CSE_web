function onlyDigits() {
    var separator = ".";
    var replaced = new RegExp('[^\\d\\'+separator+'\\-]', "g");
    var regex = new RegExp('\\'+separator, "g");
    this.value = this.value.replace(replaced, "");

    var minValue = parseFloat(-3);
    var maxValue = parseFloat(5);
    var val = parseFloat(separator === "." ? this.value : this.value.replace(new RegExp(separator, "g"), "."));

    if (minValue <= maxValue) {
        if (this.value[0] === "-") {
            if (this.value.length > 8) {
                this.value = this.value.substr(0, 8);
            }
        } else {
            if (this.value.length > 7) {
                this.value = this.value.substr(0, 7);
            }
        }

        if (this.value[0] === separator) {
            this.value = "0" + this.value;
        }

        if (minValue < 0 && maxValue < 0) {
            if (this.value[0] !== "-")
                this.value = "-" + this.value[0];
        } else if (minValue >= 0 && maxValue >= 0) {
            if (this.value[0] === "-")
                this.value = this.value.substr(0, 0);
        }

        if (val < minValue || val > maxValue) {
            this.value = this.value.substr(0, 0);
        }
        if (this.value.match(regex))
            if (this.value.match(regex).length > 1) {
                this.value = this.value.substr(0, 0);
            }

        if (this.value.match(/\-/g))
            if (this.value.match(/\-/g).length > 1) {
                this.value = this.value.substr(0, 0);
            }

        //let y = parseFloat('input-form:y-text-input'.value.replace(new RegExp(separator, "g"), "."));
    }
}
//
// function rCheckboxHandler() {
//     for (let i = 0; i < rInputs.length; i++)
//         if (rInputs[i].checked && rInputs[i] !== this) rInputs[i].checked = false;
// }
//
// function yCheckboxHandler() {
//     for (let i = 0; i < yInputs.length; i++)
//         if (yInputs[i].checked && yInputs[i] !== this) yInputs[i].checked = false;
// }
//
// function clearHistory() {
//     //localStorage.clear();
//     historyBrowser.innerHTML = "";
//     clearCanvas();
//     draw();
//     $.ajax({
//         type: "POST",
//         url: "ControllerServlet",
//         data: {
//             "clear": "true"
//         },
//         beforeSend: function() {
//             $('.button-form').attr('disabled', 'disabled');
//         },
//         success: onAnswer,
//         dataType: "text"
//     });
// }
//
// function onAnswer(res) {
//     $('.button-form').attr('disabled', false);
//     if (res === "Invalid-data") {
//         textwindow.innerHTML = '<b style="color:#ba0000; -webkit-text-stroke-width: 0.75px; -webkit-text-stroke-color: ' +
//             'black;">' +  'Некорректно введены данные!' + '</b>';
//         return;
//     }
//
//     if (res === "Successfully-cleared" ) {
//         textwindow.innerHTML = '<b>Данные успешно удалены!<b>';
//         return;
//     }
//     var timer = res;
//     var data = JSON.parse(timer);
//     var result = "<b>Проверка точки (" + +data.x + "; " + +data.y + ")</b><br>";
//     result += "<b>Параметр: </b>" + +data.r + "<br>";
//     result += "<b>Время отправки: </b>" + data.currentTime + "<br>";
//     result += "<b>Время исполнения: </b>" + (parseFloat(data.scriptTime) / 1000000).toFixed(5) + " ms<br>";
//     result += "<b>Результат: </b>" + data.hit;
//     textwindow.innerHTML = result;
//     //localStorage.setItem("1dd67bc30438cd" + localStorage.length, timer);
//     createTableRow(timer)
//     loadGraph();
// }
//
// function onFormAnswer(res) {
//     $('.button-form').attr('disabled', false);
//     if (res === "Invalid-data") {
//         textwindow.innerHTML = '<b style="color:#ba0000; -webkit-text-stroke-width: 0.75px; -webkit-text-stroke-color: ' +
//             'black;">' +  'Некорректно введены данные!' + '</b>';
//         return;
//     }
//     document.body.innerHTML = res;
// }
//
// function createTableRow(data) {
//     data = JSON.parse(data);
//     let result;
//     result = `<tr class='historyTd' data-x="${parseFloat(data.x)}" data-y="${parseFloat(data.y)}"  data-r="${parseFloat(data.r)}" data-hit="${data.hit}">`;
//     result += `<td class='historyElem'> Точка: (${parseFloat(data.x)}, ${parseFloat(data.y)}) </td>`;
//     result += `<td class='historyElem'> Параметр: ${parseFloat(data.r)} </td>`;
//     result += `<td class='historyElem'> Отправка: ${data.currentTime} </td>`;
//     result += `<td class='historyElem'> Исполнение: ${(parseFloat(data.scriptTime) / 1000000).toFixed(5)} ms</td>`;
//     result += `<td class='historyElem'> Результат: ${data.hit} </td>`; // можно упростить
//     result += "</tr>"
//     historyBrowser.innerHTML = result + historyBrowser.innerHTML;
// }
//
// function loadTable() {
//     for (let i = 0; i < localStorage.length; i++) {
//         try {
//             createTableRow(localStorage.getItem("1dd67bc30438cd" + i));
//         } catch (TypeError) {
//             console.log(":)");
//         }
//     }
// }
//
// function sendRequest() {
//     var x = xtextinput.value;
//     var r = false;
//     if (rcheckbox1.checked) r = "1";
//     if (rcheckbox2.checked) r = "2";
//     if (rcheckbox3.checked) r = "3";
//     if (rcheckbox4.checked) r = "4";
//     if (rcheckbox5.checked) r = "5";
//     var y = false;
//     if (ycheckbox1.checked) y = "-2";
//     if (ycheckbox2.checked) y = "-1.5";
//     if (ycheckbox3.checked) y = "-1";
//     if (ycheckbox4.checked) y = "-0.5";
//     if (ycheckbox5.checked) y = "0";
//     if (ycheckbox6.checked) y = "0.5";
//     if (ycheckbox7.checked) y = "1";
//     if (ycheckbox8.checked) y = "1.5";
//     if (ycheckbox9.checked) y = "2";
//     if (x&&y&&r) {
//         $.ajax({
//             type: "POST",
//             url: "ControllerServlet",
//             data: {
//                 "x": x,
//                 "y": y,
//                 "r": r,
//                 "time": (new Date()).getTimezoneOffset(), //возвращает смещение часового пояса относительно часового пояса UTC в минутах для текущей локали.
//                 "clear": "false",
//                 "resource": "form"
//             },
//             beforeSend: function() {
//                 $('.button-form').attr('disabled', 'disabled');
//             },
//             success: onFormAnswer,
//             dataType: "text"
//         });
//
//     }
//     else {
//         textwindow.innerHTML = '<b style="color:#ba0000; -webkit-text-stroke-width: 0.75px; -webkit-text-stroke-color: black;">Заполните форму до конца!</b>';
//     }
// }
//
// var yInputs = document.getElementsByClassName("y-input-checkbox");
// var rInputs = document.getElementsByClassName("r-input-checkbox");
//
// function start() {
//     document.querySelector(".number1").oninput = onlyDigits;
//
//     for (let i = 0; i < yInputs.length; i++) yInputs[i].onchange = yCheckboxHandler;
//     for (let i = 0; i < rInputs.length; i++) rInputs[i].onchange = rCheckboxHandler;
//
//     document.querySelector("#forsubmit").onclick = sendRequest;
//     document.querySelector("#forreset").onclick = clearHistory;
//
//     startGraph();
// }

let lastValueX = 0;
let lastValueY = 0;
document.getElementById("input-form:y-text-input").oninput = onlyDigits;

function changeX(number, value) {
    document.querySelectorAll(".x-button").forEach(button => button.removeAttribute("disabled"));
    document.getElementById(("input-form:x-button" + number)).setAttribute("disabled", "true");
    document.querySelector('.input_form_hidden_x input[type=hidden]').setAttribute("value", value);
    lastValueX = value;
    console.log("пхпхпхпхпххпхпхпхпххп")
}

function changeY(value) {
    document.querySelector('.input_form_hidden_y input[type=hidden]').setAttribute("value", value);
    lastValueY = value;
    console.log("(((((((")
}

function validateForm() {
    if (lastValueX !== undefined) {
        document.querySelector('.input_form_hidden_x input[type=hidden]').setAttribute("value", lastValueX); //changeX
    }
    if (lastValueY !== undefined) {
        changeY(lastValueY)
    }
}