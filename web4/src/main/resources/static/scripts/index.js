let usersApi = Vue.resource('/users');
let loginApi = Vue.resource('/login');

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
        user: {username: '', password: ''},
        message: ''
    },
    methods: {
        onSubmit: function () {
            if (this.user.username.trim().length === 0 || this.user.password.trim().length === 0) {
                this.message = 'Заполните форму до конца!';
            } else {
                this.message = '';
                loginApi.save({}, this.user).then(
                    result => {
                        switch (result.status) {
                            case 200:
                                document.location.href = "http://localhost:11125/main";
                                break;
                        }
                    },
                    error => {
                        switch (error.status) {
                            case 400:
                                this.message = 'Неправильное имя пользователя или пароль!';
                                console.log(error);
                                break;
                            default:
                                this.message = 'Что-то пошло не так...' + error.status;
                                console.log(error);
                                break;
                        }
                    }
                )

            }
        },
        validateLength: function () {
            if (this.user.username.length >= 20) {
                this.user.username = this.user.username.substr(0,19);
            }
            if (this.user.password.length >= 20) {
                this.user.password = this.user.password.substr(0,19);
            }
        }
    },
    created: function () {
        console.log(window.location.search);
        if (window.location.search == '?success') {
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
