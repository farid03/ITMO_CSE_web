var clock = new Vue({
    el: '#time',
    data: {
        time: '',
        message: 'Текущее время: ' + new Date().toLocaleString().replace(',', ' |')
    }
})

function updateTime() {
    console.log(new Date().toLocaleString().replace(',', ' |'))
    clock.time = (new Date().toLocaleString().replace(',', ' |'));
    clock.message = 'Текущее время: ' + (new Date().toLocaleString().replace(',', ' |'));
}
setInterval(updateTime, 1000);
updateTime();