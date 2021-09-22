function onlyDigits() {
	var separator = this.dataset.separator;
	var replaced = new RegExp('[^\\d\\'+separator+'\\-]', "g");
	var regex = new RegExp('\\'+separator, "g");
	this.value = this.value.replace(replaced, "");

	var minValue = parseFloat(this.dataset.min);
	var maxValue = parseFloat(this.dataset.max);
	var val = parseFloat(separator == "." ? this.value : this.value.replace(new RegExp(separator, "g"), "."));
	if (minValue <= maxValue) {
		if (this.value[0] == "-") {
			if (this.value.length > 8) {
				this.value = this.value.substr(0, 8);
			}
		} else {
			if (this.value.length > 7) {
				this.value = this.value.substr(0, 7);
			}
		}
		
		if (this.value[0] == separator) {
			this.value = "0" + this.value;
		}
		
		if (minValue < 0 && maxValue < 0) {
			if (this.value[0] != "-")
				this.value = "-" + this.value[0];
		} else if (minValue >= 0 && maxValue >= 0) {
			if (this.value[0] == "-") 
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
		
		let x = parseFloat(ytextinput.value.replace(new RegExp(separator, "g"), "."));
		let y = parseFloat(rtextinput.value.replace(new RegExp(separator, "g"), "."));
	}
}

document.querySelector(".number1").oninput = onlyDigits;
document.querySelector(".number2").oninput = onlyDigits;

var inputs = document.getElementsByClassName("input-checkbox");
for (var i = 0; i < inputs.length; i++) inputs[i].onchange = checkboxHandler;
         
function checkboxHandler() {
    for (var i = 0; i < inputs.length; i++)
        if (inputs[i].checked && inputs[i] !== this) inputs[i].checked = false;
	changeR(parseFloat(this.value));
}

document.querySelector("#forsubmit").onclick = startPHP;
document.querySelector("#forreset").onclick = clearHistory;

function clearHistory() {
	localStorage.clear();
	historyBrowser.innerHTML = "";
}

function onAnswer(res) {
	$('.button-form').attr('disabled', false);
	var timer = JSON.stringify(res);
	var data = JSON.parse(timer);
	var result = "<b>Проверка точки (" + data.x + "; " + data.y + ")</b><br>";
	result += "<b>Параметр: </b>" + data.r + "<br>";
	result += "<b>Время отправки: </b>" + data.currentTime + "<br>";
	result += "<b>Время исполнения: </b>" + (parseFloat(data.scriptTime)*1000).toFixed(2) + " ms<br>";
	result += "<b>Результат: </b>" + data.hit;
	textwindow.innerHTML = result;
	localStorage.setItem(localStorage.length, timer);
	createTableRow(timer)
}

function createTableRow(data) {
	data = JSON.parse(data);
	let result;
	result = "<tr class='historyTd'>";
	result += `<td class='historyElem'> Точка: (${data.x}, ${data.y}) </td>`;
	result += `<td class='historyElem'> Параметр: ${data.r} </td>`;
	result += `<td class='historyElem'> Отправка: ${data.currentTime} </td>`;
	result += `<td class='historyElem'> Исполнение: ${(parseFloat(data.scriptTime)*1000).toFixed(2)} ms</td>`;
	result += `<td class='historyElem'> Результат: ${data.hit} </td>`;
	result += "</tr>"
	historyBrowser.innerHTML = result + historyBrowser.innerHTML;
}

function loadTable() {
	for (let i = 0; i < localStorage.length; i++) {
		createTableRow(localStorage.getItem(i))
	}
}

loadTable()

function startPHP() {
	var y = ytextinput.value;
	var r = rtextinput.value;
	var x = false;
	if (rcheckbox1.checked) x = "-2";
	if (rcheckbox2.checked) x = "-1.5";
	if (rcheckbox3.checked) x = "-1";
	if (rcheckbox4.checked) x = "-0.5";
	if (rcheckbox5.checked) x = "0";
	if (rcheckbox6.checked) x = "0.5";
	if (rcheckbox7.checked) x = "1";
	if (rcheckbox8.checked) x = "1.5";
	if (rcheckbox9.checked) x = "2";
	if (x&&y&&r) {
		$.ajax({
			type: "GET",
			url: "scripts/input.php",
			data: {
				"x": x,
				"y": y,
				"r": r,
				"time": (new Date()).getTimezoneOffset()
			},
			beforeSend: function() {
				$('.button-form').attr('disabled', 'disabled');
			},
			success: onAnswer,
			dataType: "json"
		});
	} 
	else 
		alert('Заполните форму до конца!');
}
