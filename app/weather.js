"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const apiKey = "f79fc487bce2d44d12b8186ef388d93b";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Lima&appid=${apiKey}&units=metric&lang=es`;
// Obtener los elementos HTML donde se mostrarán los datos del clima.
const descriptionElement = document.getElementById("description");
const tempElement = document.getElementById("temp");
const feelsLikeElement = document.getElementById("feels-like");
const locationElement = document.getElementById("location");
const windElement = document.getElementById("wind");
const humidityElement = document.getElementById("humidity");
const localTimeElement = document.getElementById("local-time");
const weatherIconElement = document.getElementById("weather-icon");
const loadingElement = document.getElementById("loading");
const weatherElement = document.getElementById("weather");
// Función para obtener los datos del clima desde la API de OpenWeatherMap.
const fetchWeather = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Mostrar el mensaje de carga y ocultar el resto.
        loadingElement.style.display = "block";
        weatherElement.style.display = "none";
        // Hacer la solicitud a la API para obtener los datos del clima.
        const response = yield fetch(apiUrl);
        // Verificar si la respuesta es exitosa.
        if (!response.ok) {
            console.log(`Error: ${response.status} ${response.statusText}`);
            // En caso de error, mostrar un mensaje en la UI y limpiar los valores.
            descriptionElement.textContent = "No se pudo obtener el clima";
            tempElement.textContent = "";
            locationElement.textContent = "";
            windElement.textContent = "";
            humidityElement.textContent = "";
            localTimeElement.textContent = "";
            weatherIconElement.src = "";
            loadingElement.style.display = "none";
            weatherElement.style.display = "block";
            return;
        }
        // Convertir la respuesta en formato JSON con el tipo `WeatherResponse`.
        const data = yield response.json();
        // Crear un objeto `weather` con los datos procesados para actualizar la UI.
        const weather = {
            description: data.weather[0].description,
            temp: data.main.temp,
            feelsLike: data.main.feels_like,
            location: `${data.name}, ${data.sys.country}`,
            wind: `${data.wind.speed} m/s`,
            humidity: `${data.main.humidity}%`,
            localTime: new Date().toLocaleTimeString("es-PE", {
                timeZone: "America/Lima",
            }),
            icon: data.weather[0].icon,
        };
        // Actualizar los elementos HTML con los datos del clima obtenidos.
        descriptionElement.textContent = weather.description;
        tempElement.textContent = `${weather.temp.toFixed(1)}°C`; // Mostrar la temperatura con un decimal.
        feelsLikeElement.textContent = `Sensación térmica: ${weather.feelsLike.toFixed(1)}°C`;
        locationElement.textContent = weather.location;
        windElement.textContent = `Viento: ${weather.wind}`;
        humidityElement.textContent = `Humedad: ${weather.humidity}`;
        localTimeElement.textContent = `Hora local: ${weather.localTime}`;
        weatherIconElement.src = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`;
        // Si el icono incluye "d", significa que es de día. De lo contrario, es de noche.
        const isDay = weather.icon.includes("d");
        document.body.style.backgroundColor = isDay ? "#fef9c3" : "#1e3a8a"; // Cambiar el color del fondo según el día o la noche.
        loadingElement.style.display = "none";
        weatherElement.style.display = "block";
    }
    catch (error) {
        // Si hay un error en la solicitud, mostrar un mensaje y limpiar la UI.
        console.error("Error al obtener el clima:", error);
        descriptionElement.textContent = "Error al obtener el clima";
        tempElement.textContent = "";
        locationElement.textContent = "";
        windElement.textContent = "";
        humidityElement.textContent = "";
        localTimeElement.textContent = "";
        weatherIconElement.src = "";
        loadingElement.style.display = "none";
        weatherElement.style.display = "block";
    }
});
fetchWeather();
