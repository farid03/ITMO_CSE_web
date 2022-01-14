let regApi = Vue.resource('/registration');

var registrationForm = new Vue({
    el: '#registration-form',
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
                regApi.save({}, this.user).then(result => result.text().then(
                    data => {
                        if (data === "sucsess") {
                            document.location.href = "http://localhost:11125/login?sucsess";
                            this.message = "";
                        } else if (data === "exists") {
                            this.message = 'Пользователь с данным именем уже существует!';
                        } else if (data === "null") {
                            this.message = 'Заполните форму до конца!';
                        } else {
                            this.message = 'Что-то пошло не так...';
                        }
                    }
                ))
            }
        }
    }
})
