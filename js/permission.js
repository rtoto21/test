sendNotification = function () {
    var divPermission = document.querySelector('.permission');
    if (divPermission) {
        divPermission.className += ' hidden';
    };
    var divNotification = document.querySelector('.notification');
    if (divNotification) {
        var json = { 'device': device.uuid }
        var APIBASEURL = 'http://localhost:53593/api';
        var request = new Request(APIBASEURL + '/App/SendNotification/', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'mode': 'cors'
            }),
            body: JSON.stringify(json)
        })
        var spanNotification = document.querySelector('#notification');
        fetch(request).then(function (response) {
            if (response.status === 200) {
                spanNotification.innerHTML = 'Se ha enviado con éxito la notificación';
            }
        }).catch(function (err) {
            spanNotification.innerHTML = 'Hubo un error al enviar la notificación';
        })
        divNotification.className += ' visible';
    };
}