from django.shortcuts import render
from django.http import HttpResponse
import requests

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

def weather_view(request):
    weather_data = None
    if request.method == "POST":
        city = request.POST.get('city')
        api_key = "832ffa1eccfd9359933dacceac05dc77"
        weather_data = get_weather(city, api_key)
        
    return render(request, 'index.html', {'weather_data': weather_data})