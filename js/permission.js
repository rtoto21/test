sendNotification = function () {
    var divPermission = document.querySelector('.permission');
    if (divPermission) {
        divPermission.className += ' hidden';
    };
    var divNotification = document.querySelector('.notification');
    if (divNotification) {
        // api send notifiacion
        var ok = false;
        var spanNotification = document.querySelector('#notification');
        if (ok) {
            spanNotification.innerHTML = 'Se ha enviado con éxito la notificación';
        } else {
            spanNotification.innerHTML = 'Hubo un error al enviar la notificación';
        }
        divNotification.className += ' visible';
    };
}