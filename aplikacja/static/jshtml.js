function miasto() {
    var miasto = document.getElementById("miasto").value;
    document.getElementById("wmiasto").innerText = miasto;
}

function data() {
    var currentDateElement = document.getElementById("data");
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    var formattedDate = (day < 10 ? '0' : '') + day + '-' + (month < 10 ? '0' : '') + month + '-' + year;
    currentDateElement.textContent = "Data: " + formattedDate;
}

function zegar() {
    var data = new Date();
    var godzina = data.getHours();
    var min = data.getMinutes();
    var sek = data.getSeconds();
    var terazjest = "" + godzina + (min < 10 ? ":0" : ":") + min + (sek < 10 ? ":0" : ":") + sek;
    document.getElementById("godzina").innerHTML = "Godzina: " + terazjest;
    setTimeout(zegar, 1000);
}

function tabela() {
    var myDiv = document.getElementById("tabela");
    myDiv.style.border = "2px solid #0000FF";
    myDiv.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
}