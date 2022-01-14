let usersApi = Vue.resource('/users');

var clock = new Vue({
    el: '#time',
    data: {
        time: '',
        message: 'Текущее время: ' + new Date().toLocaleString().replace(',', ' |')
    }
})

function updateTime() {
    clock.time = (new Date().toLocaleString().replace(',', ' |'));
    clock.message = 'Текущее время: ' + (new Date().toLocaleString().replace(',', ' |'));
}
setInterval(updateTime, 1000);
updateTime();

var signInForm = new Vue({
    el: '#sign-in-form',
    data: {
        username: '',
        password: '',
        message: ''
    },
    methods: {
        onSubmit: function (e) {
            if (this.username.trim().length === 0 || this.password.trim().length === 0) {
                this.message = 'Заполните форму до конца!';
                e.preventDefault();
            } else {
                this.message = '';
                return true;
            }
        }
    },
    created: function () {
        console.log(window.location.search);
        if (window.location.search == '?sucsess') {
            this.message = 'Регистрация прошла успешно!';
        } else if (window.location.search == '?error') {
            this.message = 'Неправильное имя пользователя или пароль!';
        }
    }
})

let usersList = new Vue({
    el: "#users-list",
    data: {
        users: []
    },
    created: function () {
        usersApi.get().then(result => result.json().then(data => this.users = data, error => console.log('error: ', error)), error => console.log('req error:', error))
    }
})
