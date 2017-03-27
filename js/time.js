var span_text_doc = document.getElementById("text_doc");
var APIBASEURL = 'http://localhost:55242/api';
var username = "r4PzMz8Z6fYqNH5GBg9e";
var password = "Y4P66RTCnRsvahHU3Ey5";
setInterval(calculateTime(), 3000);

function write_span(text) {
    span_text_doc.innerText += text;
    findName(span_text_doc.innerText);
}

function back_span() {
    span_text_doc.innerText = span_text_doc.innerText.substring(0, span_text_doc.innerText.length - 1);
    findName(span_text_doc.innerText);
}

function clear_span() {
    span_text_doc.innerText = "";
    findName('');
}

function send_time(type) {
    var times = JSON.parse(window.localStorage.getItem("times"));
    if (times == null) {
        times = [];
    }
    times.push({
        document: span_text_doc.innerText,
        time: Math.floor(Date.now() / 1000),
        type: type
    })
    window.localStorage.setItem("times", JSON.stringify(times));
    post('/test', times, send_Ok, send_Fail);
}

function send_Ok() {
    clear_span();
    window.localStorage.clear();
}

function send_Fail() {
    clear_span();
}

function get(url) {
    return new Promise(function (resolve, reject) {
        //var auth = b64EncodeUnicode(username + ':' + password);
        //xhr.setRequestHeader('Authorization', 'Basic ' + auth);
        var xhr = new XMLHttpRequest();
        xhr.open('GET', APIBASEURL + url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}

function post(url, data, callback, err_callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', APIBASEURL + url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status === 200) {
            if (callback) {
                callback();
            }
        } else {
            if (err_callback) {
                err_callback();
            }
        }
    };
    xhr.send(data);
}

function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}

function calculateTime() {
    var today = new Date();
    var MM = today.getMinutes();
    var hh = today.getHours();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    if (MM < 10) {
        MM = '0' + MM;
    }
    if (hh < 10) {
        hh = '0' + hh;
    }
    document.getElementById('date').innerText = dd + '/' + mm + '/' + yyyy;
    document.getElementById('hour').innerText = hh + ':' + MM;
}

function findName(text) {
    get('/Empleado/GetApp/0/?documentoIdentidad=' + text)
        .then(function (moreDatums) {
            console.log(moreDatums);
        })
        .catch(function (err) {
            console.error('Error: ' + err.statusText);
        });
}

function printName(err, response) {
    if (err) {
        console.log(err);
    }
    console.log(response);
    //document.getElementById("name").innerText = xhr.response.text;
}

function printNameGhost() {
    document.getElementById("name").innerHTML = '';
}