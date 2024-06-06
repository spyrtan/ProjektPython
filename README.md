Projekt na zaliczenie przedmiotu “Wprowadzenie do programowania w języku Python” kierunek Inżynieria i Analiza Danych FS1-DI Rok 2024.

Poniżej znajduje się raport z kodu Django wraz z komentarzami:

---

# Raport z implementacji widoku pogody w Django

## Wprowadzenie

Ten dokument opisuje funkcjonalność oraz działanie kodu Django, który obsługuje wyświetlanie danych pogodowych dla określonego miasta przy użyciu API OpenWeatherMap. Kod składa się z dwóch głównych funkcji: `get_weather` i `weather_view`.

## Szczegóły Implementacji

### Importowanie modułów

```python
from django.shortcuts import render
from django.http import HttpResponse
import requests
```

- `render` i `HttpResponse` są importowane z modułu `django.shortcuts` oraz `django.http` odpowiednio, aby obsługiwać żądania HTTP i renderowanie szablonów HTML.
- `requests` jest zewnętrznym modułem do wykonywania zapytań HTTP.

### Funkcja `get_weather`

Funkcja `get_weather` pobiera dane pogodowe dla określonego miasta, korzystając z API OpenWeatherMap.

#### Parametry:

- `city_name` (str): Nazwa miasta, dla którego mają zostać pobrane dane pogodowe.
- `api_key` (str): Klucz API wymagany do autoryzacji zapytań do OpenWeatherMap.

#### Logika:

1. Tworzenie URL z parametrami miasta i klucza API.
2. Wykonanie zapytania GET do API.
3. Parsowanie odpowiedzi jako JSON.
4. Sprawdzenie kodu odpowiedzi:
    - Jeśli kod to 200 (sukces), wyciągnięcie interesujących danych z odpowiedzi.
    - Jeśli kod to inny niż 200, zwrócenie `None`.
5. Tworzenie i zwrócenie słownika z danymi pogodowymi.

#### Kod:

```python
def get_weather(city_name, api_key):
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city_name}&appid={api_key}&units=metric"
    response = requests.get(url)
    data = response.json()
    
    if data.get("cod") == 200:
        weather_description = data["weather"][0]["description"]
        temperature = data["main"]["temp"]
        feels_like = data["main"]["feels_like"]
        humidity = data["main"]["humidity"]
        wind_speed = data["wind"]["speed"]
        
        result = {
            "city": city_name,
            "description": weather_description,
            "temperature": temperature,
            "feels_like": feels_like,
            "humidity": humidity,
            "wind_speed": wind_speed
        }
        return result
    else:
        return None
```

### Widok `weather_view`

Widok `weather_view` obsługuje żądania HTTP i renderuje stronę HTML z danymi pogodowymi.

#### Logika:

1. Inicjalizacja zmiennej `weather_data` jako `None`.
2. Sprawdzenie, czy metoda żądania to POST:
    - Pobranie nazwy miasta z danych POST.
    - Wywołanie funkcji `get_weather` w celu pobrania danych pogodowych.
3. Renderowanie szablonu HTML `index.html` z danymi pogodowymi, jeśli są dostępne.

#### Kod:

```python
def weather_view(request):
    weather_data = None
    if request.method == "POST":
        city = request.POST.get('city')
        api_key = "832ffa1eccfd9359933dacceac05dc77"
        weather_data = get_weather(city, api_key)
        
    return render(request, 'index.html', {'weather_data': weather_data})
```

## Wnioski

Kod opisany w tym raporcie umożliwia pobieranie i wyświetlanie danych pogodowych dla określonego miasta za pomocą API OpenWeatherMap. Funkcja `get_weather` zajmuje się komunikacją z API i przetwarzaniem odpowiedzi, natomiast widok `weather_view` obsługuje żądania HTTP i renderowanie odpowiednich danych w szablonie HTML.

# Raport z implementacji szablonu HTML do wyświetlania pogody w Django

## Wprowadzenie

Ten raport opisuje szczegóły implementacji szablonu HTML w Django, który jest używany do wyświetlania danych pogodowych dla określonego miasta. Szablon ten wykorzystuje dane uzyskane z API OpenWeatherMap, aby pokazać użytkownikowi aktualną pogodę.

## Szczegóły Implementacji

### Nagłówki HTML i Ładowanie Zasobów

#### Ładowanie plików statycznych i czcionek

```html
{% load static %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Pogoda</title>
    <script type="text/javascript" src="{% static 'jshtml.js' %}"></script>
    <link rel="stylesheet" href="{% static 'styl.css' %}">
    <link href='http://fonts.googleapis.com/css?family=Alata&subset=latin,latin-ext' rel='stylesheet' type='text/css'>
</head>
<body>
```

- `{% load static %}`: Ładuje tag `static` Django, który umożliwia wstawianie ścieżek do plików statycznych (np. CSS, JS).
- `<!DOCTYPE html>`: Deklaracja typu dokumentu HTML5.
- `<meta charset="UTF-8">`: Ustawia kodowanie znaków na UTF-8.
- `<title>Pogoda</title>`: Ustawia tytuł strony na "Pogoda".
- `<script type="text/javascript" src="{% static 'jshtml.js' %}"></script>`: Wstawia skrypt JavaScript z katalogu `static`.
- `<link rel="stylesheet" href="{% static 'styl.css' %}">`: Wstawia plik CSS z katalogu `static`.
- `<link href='http://fonts.googleapis.com/css?family=Alata&subset=latin,latin-ext' rel='stylesheet' type='text/css'>`: Ładuje czcionkę Google Fonts.

### Treść Strony i Formularz

#### Struktura i formularz do wpisywania miasta

```html
    <div class="container">
        <h1>Sprawdź pogodę</h1>
        <form method="post" id="formularz">
            {% csrf_token %}
            <div class="input-box">
                <input type="text" id="city" name="city" placeholder="Wpisz miasto..."><br><br>
                <button type="submit">Sprawdź  <img src="{% static 'lupa.svg' %}" height="18" alt="Lupa"></button>
            </div>
        </form>
        <script>
            window.onload = function() {
              document.getElementById('formularz').reset();
            };
        </script>
        <div id="tabela">
            <h2 id="wmiasto"></h2>
            <h4 id="data"></h4>
            <h4 id="godzina"></h4>
```

- `<div class="container">`: Rozpoczyna kontener strony.
- `<h1>Sprawdź pogodę</h1>`: Wyświetla nagłówek strony.
- `<form method="post" id="formularz">`: Rozpoczyna formularz z metodą POST i ID `formularz`.
- `{% csrf_token %}`: Wstawia token CSRF, który zabezpiecza formularz przed atakami CSRF.
- `<div class="input-box">`: Rozpoczyna kontener dla pola tekstowego i przycisku.
- `<input type="text" id="city" name="city" placeholder="Wpisz miasto...">`: Pole tekstowe do wpisywania nazwy miasta.
- `<button type="submit">Sprawdź  <img src="{% static 'lupa.svg' %}" height="18" alt="Lupa"></button>`: Przycisk do wysyłania formularza z ikoną lupy.
- `<script> window.onload = function() { document.getElementById('formularz').reset(); };</script>`: Skrypt JavaScript resetujący formularz po załadowaniu strony.

### Wyświetlanie Danych Pogodowych

#### Sekcja do wyświetlania wyników

```html
        <div id="tabela">
            <h2 id="wmiasto"></h2>
            <h4 id="data"></h4>
            <h4 id="godzina"></h4>
            {% if weather_data %}
                <h2>Aktualna pogoda w {{ weather_data.city }}:</h2>
                <p><strong>Opis:</strong> {{ weather_data.description }}</p>
                <p><strong>Temperatura:</strong> {{ weather_data.temperature }}°C</p>
                <p><strong>Odczuwalna:</strong> {{ weather_data.feels_like }}°C</p>
                <p><strong>Wilgotność:</strong> {{ weather_data.humidity }}%</p>
                <p><strong>Prędkość wiatru:</strong> {{ weather_data.wind_speed }} m/s</p>
            {% elif weather_data is none %}
                <p>Nie można pobrać danych, spróbuj ponownie.</p>
            {% endif %}
        </div>
    </div>
</body>
</html>
```

- `<div id="tabela">`: Sekcja do wyświetlania danych pogodowych.
- `<h2 id="wmiasto"></h2>`: Nagłówek do wyświetlania nazwy miasta.
- `<h4 id="data"></h4>`: Nagłówek do wyświetlania daty.
- `<h4 id="godzina"></h4>`: Nagłówek do wyświetlania godziny.
- `{% if weather_data %}`: Warunek sprawdzający, czy dane pogodowe są dostępne.
    - `<h2>Aktualna pogoda w {{ weather_data.city }}:</h2>`: Nagłówek wyświetlający nazwę miasta.
    - `<p><strong>Opis:</strong> {{ weather_data.description }}</p>`: Wyświetlanie opisu pogody.
    - `<p><strong>Temperatura:</strong> {{ weather_data.temperature }}°C</p>`: Wyświetlanie temperatury.
    - `<p><strong>Odczuwalna:</strong> {{ weather_data.feels_like }}°C</p>`: Wyświetlanie odczuwalnej temperatury.
    - `<p><strong>Wilgotność:</strong> {{ weather_data.humidity }}%</p>`: Wyświetlanie wilgotności.
    - `<p><strong>Prędkość wiatru:</strong> {{ weather_data.wind_speed }} m/s</p>`: Wyświetlanie prędkości wiatru.
- `{% elif weather_data is none %}`: Warunek sprawdzający, czy nie udało się pobrać danych pogodowych.
    - `<p>Nie można pobrać danych, spróbuj ponownie.</p>`: Komunikat o błędzie w przypadku niepowodzenia pobrania danych.

## Wnioski

Szablon HTML opisany w tym raporcie umożliwia użytkownikowi wpisanie nazwy miasta i wyświetla dane pogodowe pobrane z API OpenWeatherMap. Szablon obsługuje również zabezpieczenia przed atakami CSRF i resetuje formularz po załadowaniu strony. Sekcja warunkowa pozwala na wyświetlanie odpowiednich komunikatów w zależności od dostępności danych pogodowych.
