let pointsApi = Vue.resource('/point');

Vue.component('point-entries', {
    props: ['points'],
    template:
        '<table>' +
        '<tr v-for="point in points" class="historyTd" :data-x="point.x" :data-y="point.y"  :data-r="point.r"  :data-hit="point.hit" style="font-size: 16px;">\n' +
        '<td class="historyElem"> Отправил: {{ point.user}}</td>\n' +
        '<td class="historyElem"> Точка: ({{ point.x }}, {{ point.y }})</td>\n' +
        '<td class="historyElem"> Параметр: {{ point.r }}</td>\n' +
        '<td class="historyElem"> Отправка: {{ point.time }}</td>\n' +
        '<td class="historyElem"> Результат: <b> {{ point.hit ? "Попадание" : "Промах" }} </b> </td>\n' +
        '</tr>' +
        '</table>'
});

Vue.component('points-table', {
    props: ['points'],
    template:
        '<table id="points-table" style="width: 90%; margin-left: 5%" v-if="points.length > 0">' +
        '<tr>\n' +
        '<td id="history-td" style="padding-top: 2px; padding-bottom: 2px">\n' +
        '<b style="font-size: 18px;"> Таблица результатов </b>\n' +
        '</td>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td id="historyRow">\n' +
        '<table id="historyBrowser">' +
        '<point-entries :points="points"/>' +
        '</table>\n' +
        '</td>\n' +
        '</tr>' +
        '</table>',
    created: function () {
        pointsApi.get().then(result => result.json().then(data => {
            table.points = data.reverse();
            console.log(data)
            loadGraph(form.r);
        }));
    }
});

let table = new Vue({
    el: '#results-table',
    template:
        '<points-table :points="points" />',
    data: {
        points: [],
    },
    updated: function () {
        loadGraph(form.r)
    }
});

let form = new Vue({
    el: '#content-form',
    data: {
        x: 0,
        y: 0,
        r: 0
    },
    methods: {
        addPoint: function () {
            if (this.y !== "") {
                let point = {
                    x: this.x,
                    y: this.y,
                    r: this.r
                }
                if (! this.isValid().valid) {
                    textWindow.message = "Некорректно введены данные! \n" + this.isValid().message;
                    textWindow.response = false;
                    textWindow.lastPoint = [];
                    return;
                }
                pointsApi.save({}, point).then(
                    result => result.json().then(
                        data => {
                            textWindow.message = '';
                            textWindow.response = true;
                            textWindow.lastPoint = data;
                            table.points.unshift(data);
                        }, error => {
                            textWindow.message = "Не смог в JSON... " + error.body.error;
                            console.log("Не смог в JSON... " + error.body.error)
                            textWindow.response = false;
                            textWindow.lastPoint = [];
                        }
                    ),
                    error => {
                        textWindow.message = "Некорректно введены данные!\n";
                        console.log("Некорректно введены данные!")
                        textWindow.response = false;
                        textWindow.lastPoint = [];
                    });
            } else {
                textWindow.message = 'Заполните все поля!';
                textWindow.response = false;
                textWindow.lastPoint = [];
            }
        },
        reset: function () {
            pointsApi.remove({}).then(result => result.text().then(data => {
                    textWindow.message = data;
                    textWindow.response = false;
                    textWindow.lastPoint = [];

                    table.points = [];
                }),
                error => {
                    textWindow.message = "При удалении коллекции возникла ошибка!" + error.body.error;
                    textWindow.response = false;
                    textWindow.lastPoint = [];
                })
        },
        validateLength: function () {
            if (this.y.length >= 7) {
                this.y = this.y.substr(0,6);
            }
        },
        isValid: function () {
            let isValid = false;
            let msg = 'Y: "' + this.y + '" не является числом!'
            if (/^[-]?[0-9]?[.]?[0-9]{0,5}$/.test(this.y)) {
                if (! /[-][.]/.test(this.y)) {
                    msg = 'Y: "' + this.y + '" не принадлежит промежутку [-3..5]!'
                    if ((this.y >= -3) && (this.y <=5)) {
                        isValid = true;
                        msg = 'Y: "' + this.y + '" -- корректное число!'
                    }
                }
            }
            return {valid: isValid, message: msg};
        }
    }
})


Vue.component('text-window', {
    props: ['response', 'message', 'lastPoint'],
    template:
        '<div v-if="response || message">\n' +
        '<div v-if="response" >' +
        '<b>Проверка точки</b> ({{ lastPoint.x }}; {{ lastPoint.y}}) <br/>\n' +
        '<b>Параметр: </b>{{ lastPoint.r }}<br/>\n' +
        '<b>Время отправки: </b>{{ lastPoint.time }}<br/>\n' +
        '<b>Результат: </b>{{ lastPoint.hit ? "Попадание" : "Промах" }}\n' +
        '</div>' +
        '<div v-if="!response">' +
        '<b style="font-family: monospace; color:#ba0000; -webkit-text-stroke-width: 0.75px; -webkit-text-stroke-color:black;">' +
        '{{ message }}' +
        '</b>' +
        '</div>' +
        '</div>'
});

let textWindow = new Vue({
    el: "#textwindow",
    template: '<text-window id="textwindow" :response="response" :message="message" :lastPoint="lastPoint" ></text-window>',
    data: {
        response: false,
        message: '',
        lastPoint: []
    }
})