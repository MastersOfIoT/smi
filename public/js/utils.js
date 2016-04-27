function xhrGet(url, onload, onerror) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.onload = onload;
    xhr.onerror = onerror;

    xhr.send();
}

function xhrPost(url, data, onload, onerror) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = onload;
    xhr.onerror = onerror;

    var params = [];

    for (var ii in data) {
        if (data.hasOwnProperty(ii)) {
            params.push(ii + "=" + data[ii]);
        }
    }

    xhr.send(params.join("&"));
}

function networkCheck() {
    var container = document.getElementById("network-check-result-container");
    container.style.display = "block";

    var resultBox = document.getElementById("network-check-result-text");
    var host = document.getElementById("network-check-host").value;

    resultBox.textContent = "Please wait...";

    xhrPost("/network/check", {
        host: host
    }, function() {
        resultBox.textContent = this.responseText;
    });
}

function viewLog() {
    var container = document.getElementById("log-container");
    container.style.display = "block";

    var resultBox = document.getElementById("log-text");
    var logName = document.getElementById("log-name").value;

    resultBox.textContent = "Please wait...";

    xhrPost("/system/getlog", {
        logname: logName
    }, function() {
        resultBox.textContent = this.responseText;
    });
}
