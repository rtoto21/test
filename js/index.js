var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        var APIBASEURL = 'http://localhost:53593/api';
        var request = new Request(APIBASEURL + '/App/GetDevice?device=' + device.uuid, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'mode': 'cors'
            })
        })
        var deviceEnable = false;
        var sendnot = true;
        fetch(request).then(function (response) {
            var contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json().then(function (json) {
                    deviceEnable = json.deviceEnable;
                })
            }
        }).catch(function (err) {
            console.log(err)
        })
        this.receivedEvent(deviceEnable, sendnot);
    },

    // Update DOM on a Received Event
    receivedEvent: function (enable, send) {
        if (enable) {
            this.showTime();
        } else {
            this.sendPermission();
        }
    },

    waitConfirmation: function() {
        document.getElementById('app').innerHTML = '<object type="text/html" data="waitConfirmation.html"></object>';
    },

    sendPermission: function () {
        document.getElementById('app').innerHTML = '<object type="text/html" data="permission.html"></object>';
    },

    showTime: function () {
        document.getElementById('app').innerHTML = '<object type="text/html" data="time.html"></object>';
    }
};

app.initialize();