let canvas = document.getElementById("graph");
let ctx;
const radiusOnGraph = (canvas.width - 30) / 2;

if (canvas.getContext) {
    ctx = canvas.getContext("2d");
}
startGraph()

function startGraph() {
    draw();
    canvas.addEventListener('mousedown', event => clickOnGraph(canvas, event));
}

function draw() {
    if (canvas.getContext) {
        loadGraph(document.getElementById("input-form:R").getAttribute("value"));
    }
}

function drawArea() {
    let delta = 15
    let r = canvas.width / 2 - delta
    let center = canvas.width / 2

    //рисуем область
    ctx.lineWidth = 0;

    ctx.beginPath();
    ctx.fillStyle = "#3399FF";
    ctx.strokeStyle = "#3399FF";

    //прямоугольник
    ctx.fillRect(center, delta, r / 2, r);

    //треугльник
    ctx.moveTo(center, center);
    ctx.lineTo(center, center + r);
    ctx.lineTo(center + r / 2, center);
    ctx.fill();
    ctx.closePath();

    //сектор круга
    ctx.arc(center, center, r / 2, Math.PI / 2, Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
}

function drawCoordinatePlane() {
    //рисуем координатную плоскость
    ctx.lineWidth = 2;

    // ось X
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);

    //рисуем стрелочки на OX
    ctx.moveTo(canvas.width - 1, canvas.height / 2);
    ctx.lineTo(canvas.width - 4, canvas.height / 2 + 1.5);
    ctx.lineTo(canvas.width - 4, canvas.height / 2 - 1.5);

    ctx.strokeStyle = 'black';
    ctx.closePath();
    ctx.stroke();

    // ось Y
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);

    //рисуем стрелочки на OY
    ctx.moveTo(canvas.width / 2, 1);
    ctx.lineTo(canvas.width / 2 + 1.5, 4);
    ctx.lineTo(canvas.width / 2 - 1.5, 4);

    ctx.strokeStyle = 'black';
    ctx.closePath();
    ctx.stroke();

    //метки на оси X
    ctx.beginPath();
    ctx.moveTo(15, canvas.height / 2); //1
    ctx.lineTo(15, canvas.height / 2 + 2);
    ctx.lineTo(15, canvas.height / 2 - 2);

    ctx.moveTo(canvas.width / 4 + 15 / 2, canvas.height / 2); //2
    ctx.lineTo(canvas.width / 4 + 15 / 2, canvas.height / 2 + 2);
    ctx.lineTo(canvas.width / 4 + 15 / 2, canvas.height / 2 - 2);

    ctx.moveTo(canvas.width / 4 + canvas.width / 2 - 15 / 2, canvas.height / 2); //3
    ctx.lineTo(canvas.width / 4 + canvas.width / 2 - 15 / 2, canvas.height / 2 + 2);
    ctx.lineTo(canvas.width / 4 + canvas.width / 2 - 15 / 2, canvas.height / 2 - 2);

    ctx.moveTo(canvas.width - 15, canvas.height / 2); //4
    ctx.lineTo(canvas.width - 15, canvas.height / 2 + 2);
    ctx.lineTo(canvas.width - 15, canvas.height / 2 - 2);

    ctx.strokeStyle = 'black';
    ctx.closePath();
    ctx.stroke();

    //метки на оси Y
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height - 15); //1
    ctx.lineTo(canvas.width / 2 + 2, canvas.height - 15);
    ctx.lineTo(canvas.width / 2 - 2, canvas.height - 15);

    ctx.moveTo(canvas.width / 2, canvas.height * 3 / 4 - 15 / 2); //2
    ctx.lineTo(canvas.width / 2 + 2, canvas.height * 3 / 4 - 15 / 2);
    ctx.lineTo(canvas.width / 2 - 2, canvas.height * 3 / 4 - 15 / 2);

    ctx.moveTo(canvas.width / 2, canvas.height * 1 / 4 + 15 / 2); //3
    ctx.lineTo(canvas.width / 2 + 2, canvas.height * 1 / 4 + 15 / 2);
    ctx.lineTo(canvas.width / 2 - 2, canvas.height * 1 / 4 + 15 / 2);

    ctx.moveTo(canvas.width / 2, 15); //4
    ctx.lineTo(canvas.width / 2 + 2, 15);
    ctx.lineTo(canvas.width / 2 - 2, 15);

    ctx.strokeStyle = 'black';
    ctx.closePath();
    ctx.stroke();

    // вывод текста
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    ctx.font = "12pt monospace";
    ctx.lineWidth = 1;
    ctx.strokeText("R", canvas.width - 19, canvas.height / 2 + 17); //X
    ctx.strokeText("R", canvas.width / 2 + 7, 22); //Y
    ctx.strokeText("-R", 2, canvas.height / 2 + 17); //X
    ctx.strokeText("-R", canvas.width / 2 + 4, canvas.height - 10); //Y

    ctx.strokeText("-R/2", canvas.width / 2 + 2, canvas.height * 3 / 4 - 8 / 2); //Y2
    ctx.strokeText("R/2", canvas.width / 2 + 6, canvas.height * 1 / 4 + 25 / 2); //Y3

    ctx.strokeText("-R/2", canvas.width / 4 - 13, canvas.height / 2 + 17); //X2
    ctx.strokeText("R/2", canvas.width / 4 + canvas.width / 2 - 21, canvas.height / 2 + 17); //X3

    ctx.fill();
    ctx.stroke();
}

function clickOnGraph(canvas, event) {
    console.log(document.getElementById("input-form:R").getAttribute("value"));
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.x;
    let y = event.clientY - rect.y;
    var r = document.getElementById('input-form:R').getAttribute("value")

    loadGraph(document.getElementById("input-form:R").getAttribute("value"))
    let data = {
        x: Math.round(((x - canvas.width / 2) * r / radiusOnGraph) * 100000) / 100000,
        y: Math.round(((-1) * (y - canvas.height / 2) * r / radiusOnGraph) * 100000) / 100000,
        r: r,
        time: (new Date()).getTimezoneOffset(), //возвращает смещение часового пояса относительно часового пояса UTC в минутах для текущей локали.
    }
    document.querySelector('.input_form_hidden_x input[type=hidden]').setAttribute("value", data.x);
    document.querySelector('.input_form_hidden_y input[type=hidden]').setAttribute("value", data.y);

    document.getElementById('input-form:forsubmitCanvas').click();

}

function loadGraph(radius) {
    clearCanvas()
    drawArea();
    drawCoordinatePlane();
    let s = document.querySelectorAll("#points-table td")
    console.log(radius)
    console.log('---')

    for (let i = 0; i < s.length; i += 5) {
        if (radius == +s[i + 2].innerHTML) {
            console.log(s[i + 2].innerHTML)
            drawItemFromTable('{"x":"' + s[i].innerHTML + '", ' +
                '"y":"' + s[i + 1].innerHTML + '", ' +
                '"r":"' + s[i + 2].innerHTML + '", ' +
                '"hit":"' + s[i + 3].innerHTML + '"}');
        }
    }
}

function drawItemFromTable(data) {
    data = JSON.parse(data);
    let x = parseFloat(data.x);
    let y = parseFloat(data.y);
    let r = parseFloat(data.r);
    let hit = data.hit;
    let color = (hit === "Попадание") ? "red" : "black"
    let xCoord = x * radiusOnGraph / r + canvas.width / 2
    let yCoord = canvas.height / 2 - y * radiusOnGraph / r

    if (xCoord < 2) {
        xCoord = 2;
        color = "white"
    }
    if (xCoord > canvas.width - 2) {
        xCoord = canvas.width - 2
        color = "white"
    }
    if (yCoord < 2) {
        yCoord = 2;
        color = "white"
    }
    if (yCoord > canvas.height - 2) {
        yCoord = canvas.height - 2
        color = "white"
    }

    drawItem(xCoord, yCoord, color);
}

function drawItem(x, y, color) {
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 2 * Math.PI); // x, y, radius, start_rarians, end_radians
    ctx.fillStyle = color;
    ctx.fill(); // заливаем
    ctx.closePath();
    ctx.stroke();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}