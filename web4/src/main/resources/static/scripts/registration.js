var registrationForm = new Vue({
    el: '#registration-form',
    data: {
        username: '',
        password: '',
        message: ''
    },
    methods: {
        onSubmit: function () {
            if (this.username.trim().length === 0 || this.password.trim() === 0) {
                this.message = 'Заполните форму до конца!';
            } else {
                this.message = '';
            }
        }
    },
    created: function () {
        console.log(window.location.search);
        if (window.location.search == '?error=exists') {
            this.message = 'Пользователь уже существует, авторизуйтесь!';
        } else if (window.location.search == '?error=null') {
            this.message = 'Форма заполнена некорректно!';
        } else {
            this.message = '';
        }
    }
})