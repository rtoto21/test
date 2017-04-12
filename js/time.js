var APIBASEURL = 'http://localhost:53593/api';

calculateTime();
setInterval(calculateTime, 3000);

var span_text_doc = document.getElementById("text_doc");
var placeholder = document.getElementById('placeholder')
var success = document.getElementById('panelSuccess')
var user = document.getElementById('panelUser')

document.getElementById('button_1').addEventListener('touchend', write_span.bind(null, '1'))
document.getElementById('button_2').addEventListener('touchend', write_span.bind(null, '2'))
document.getElementById('button_3').addEventListener('touchend', write_span.bind(null, '3'))
document.getElementById('button_4').addEventListener('touchend', write_span.bind(null, '4'))
document.getElementById('button_5').addEventListener('touchend', write_span.bind(null, '5'))
document.getElementById('button_6').addEventListener('touchend', write_span.bind(null, '6'))
document.getElementById('button_7').addEventListener('touchend', write_span.bind(null, '7'))
document.getElementById('button_8').addEventListener('touchend', write_span.bind(null, '8'))
document.getElementById('button_9').addEventListener('touchend', write_span.bind(null, '9'))
document.getElementById('button_0').addEventListener('touchend', write_span.bind(null, '0'))
document.getElementById('button_0').addEventListener('touchend', write_span.bind(null, '0'))
document.getElementById('button_borrar').addEventListener('touchend', clear_span)
document.getElementById('button_limpiar').addEventListener('touchend', back_span)
document.getElementById('button_send_in').addEventListener('touchend', send_time.bind(null, 'in'))
document.getElementById('button_send_out').addEventListener('touchend', send_time.bind(null, 'out'))

function write_span(text) {
    placeholder.style.display = 'none'
    span_text_doc.innerText += text
    findName(span_text_doc.innerText)
}

function back_span() {
    span_text_doc.innerText = span_text_doc.innerText.substring(0, span_text_doc.innerText.length - 1)
    findName(span_text_doc.innerText)
    if (span_text_doc.innerText.length == 0) {
        placeholder.style.display = 'block'
    }
}

function clear_span() {
    span_text_doc.innerText = ''
    findName('')
    placeholder.style.display = 'block'
}

function send_time(type) {
    var times = JSON.parse(window.localStorage.getItem("times"))
    if (times == null) {
        times = []
    }
    times.push({
        document: span_text_doc.innerText,
        time: getTime(),
        type: type
    })
    window.localStorage.setItem("times", JSON.stringify(times))
    fetch(APIBASEURL + '/App/SetTimes/', {
        method: 'POST',
        headers: new Headers({
            'mode': 'cors',
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(times)
    })
    .then(function (response) {
        if (response.status === 200) {
            window.localStorage.clear()
        }
    })
    .catch(function (err) {
        console.log(err)
    })
    user.style.display = 'none'
    success.style.display = 'block'
    span_text_doc.innerText = ''
    placeholder.style.display = 'block'
    setTimeout(resetName, 3000)
}

function resetName() {
    document.getElementById('imageUser').src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
    document.getElementById('nameUser').innerHTML = ''
    success.style.display = 'none'
    user.style.display = 'block'
}

function getTime() {
    var date = new Date();
    var day = date.getDate();       // yields date
    var month = date.getMonth() + 1;    // yields month (add one as '.getMonth()' is zero indexed)
    var year = date.getFullYear();  // yields year
    var hour = date.getHours();     // yields hours 
    var minute = date.getMinutes(); // yields minutes
    var second = date.getSeconds(); // yields seconds


    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }
    if (minute < 10) {
        minute = '0' + minute;
    }
    if (hour < 10) {
        hour = '0' + hour;
    }
    if (second < 10) {
        second = '0' + second;
    }

    // After this construct a string with the above results as below
    return time = day + "/" + month + "/" + year + " " + hour + ':' + minute + ':' + second;
}

function send_Ok() {
    clear_span();
    window.localStorage.clear();
}

function send_Fail() {
    clear_span();
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
    var request = new Request(APIBASEURL + '/App/GetApp?documentoIdentidad=' + text, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'mode': 'cors'
        })
    })
    fetch(request).then(function (response) {
        var contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            return response.json().then(function (json) {
                document.getElementById('imageUser').src = json.image || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
                document.getElementById('nameUser').innerHTML = json.name
            })
        }
    }).catch(function (err) {
        console.log(err)
    })
}

function printName(err, response) {
    if (err) {
        console.log(err)
    }
    console.log(response)
}

function printNameGhost() {
    document.getElementById("name").innerHTML = ''
}