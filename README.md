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
