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

function fetchWeather() {
    miasto();
    data();
    zegar();
    tabela();

    var city = document.getElementById("miasto").value;
    var apiKey = 'YOUR_API_KEY_HERE'; // Replace with your OpenWeatherMap API key
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pl`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                document.getElementById("temperature").innerText = `Temperatura: ${data.main.temp}°C`;
                document.getElementById("humidity").innerText = `Wilgotność: ${data.main.humidity}%`;
                document.getElementById("description").innerText = `Opis: ${data.weather[0].description}`;
                
                // Add animation class
                document.getElementById("weather-details").classList.add("show-details");
            } else {
                document.getElementById("temperature").innerText = "Nie udało się pobrać danych pogodowych.";
                document.getElementById("humidity").innerText = "";
                document.getElementById("description").innerText = "";
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById("temperature").innerText = "Nie udało się pobrać danych pogodowych.";
            document.getElementById("humidity").innerText = "";
            document.getElementById("description").innerText = "";
        });
}
