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
                regApi.save({}, this.user).then(result => {
                    if (result.ok) {
                        result.text().then(
                            data => {
                                if (data === "success") {
                                    document.location.href = "http://localhost:11125/login?success";
                                    this.message = "";
                                } else {
                                    this.message = 'Что-то пошло не так...';
                                }
                            }
                        )
                    }
                }, error => {
                    switch (error.status) {
                        case 409:
                            if (error.bodyText === "exists") {
                                this.message = 'Пользователь с данным именем уже существует!';
                            } else {
                                console.log(result)
                            }
                            break;
                        case 400:
                            if (error.bodyText === "null") {
                                this.message = 'Заполните форму до конца!';
                            } else {
                                console.log(result)
                            }
                            break;
                        default:
                            this.message = 'Что-то пошло не так... ' + error.status;
                            console.log(result);
                            break;
                    }
                })
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
    }
})
