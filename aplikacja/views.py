from django.shortcuts import render
from django.http import HttpResponse

from tkinter  import *
import tkinter as tk
from tkinter import messagebox
import requests

# Create your views here.

def say_hello(request):
    return render(request, 'index.html', {'name':'Mosh'})

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
        
        result = f"Aktualna pogoda w {city_name}:\n"
        result += f"Opis pogody: {weather_description}\n"
        result += f"Temperatura: {temperature}°C\n"
        result += f"Odczuwalna temperatura: {feels_like}°C\n"
        result += f"Wilgotność: {humidity}%\n"
        result += f"Prędkość wiatru: {wind_speed} m/s"
        
        messagebox.showinfo("Pogoda", result)
    else:
        messagebox.showerror("Błąd", "Błąd pobierania danych pogodowych. Sprawdź nazwę miasta i spróbuj ponownie.")

def get_weather_gui():
    def on_submit():
        city = entry_city.get()
        api_key = "832ffa1eccfd9359933dacceac05dc77"
        get_weather(city, api_key)
    
    root = tk.Tk()
    root.title("Aplikacja pogodowa")

    label_city = tk.Label(root, text="Podaj nazwę miasta:")
    label_city.pack()

    entry_city = tk.Entry(root)
    entry_city.pack()

    submit_button = tk.Button(root, text="Sprawdź pogodę", command=on_submit)
    submit_button.pack()

    root.mainloop()

if __name__ == "__main__":
    get_weather_gui()