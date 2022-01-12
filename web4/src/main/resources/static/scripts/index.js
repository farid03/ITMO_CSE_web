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
        onSubmit: function () {
            if (this.username.trim().length === 0 || this.password.trim().length === 0) {
                this.message = 'Заполните форму до конца!';
            } else {
                this.message = '';
            }
        }
    },
    created: function () {
        console.log(window.location.search);
        if (window.location.search == '?sucsess') {
            this.message = 'Регистрация прошла успешно!';
        } else if (window.location.search == '?error') {
            this.message = 'Заполните форму до конца!';
        }
    }
})