# Weather App

Este proyecto es una aplicación web sencilla que muestra el clima actual en Lima utilizando la API de [OpenWeatherMap](https://openweathermap.org/). La aplicación está implementada en HTML con JavaScript/TypeScript y usa la API para obtener datos meteorológicos.

---

## Archivos del Proyecto

1. `index.html` - HTML de la aplicación.
2. `weather.ts` - Archivo TypeScript con la lógica para obtener y mostrar el clima.

---

## 1. `index.html`

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Weather App</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-gray-100 flex justify-center items-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
      <h1 class="text-2xl font-bold text-center text-gray-700 mb-4">
        Clima en Lima
      </h1>
      <div id="weather" class="text-center">
        <p class="text-xl text-gray-600" id="description">Cargando...</p>
        <p class="text-4xl font-bold text-blue-500" id="temp"></p>
        <p class="text-gray-500" id="location"></p>
        <p class="text-gray-600" id="feels-like"></p>
        <p class="text-gray-600" id="wind"></p>
        <p class="text-gray-600" id="humidity"></p>
        <p class="text-gray-600" id="local-time"></p>
        <img id="weather-icon" src="" alt="Weather icon" />
      </div>
    </div>

    <script src="weather.js"></script>
  </body>
</html>
```
## 2. `weather.ts`

```typescript
// Definir la interfaz que representa la estructura de los datos del clima que vamos a obtener.
interface WeatherData {
  description: string;
  temp: number;
  feelsLike: number;
  location: string;
  wind: string;
  humidity: string;
  localTime: string;
  icon: string;
}

const apiKey: string = "f79fc487bce2d44d12b8186ef388d93b";
const apiUrl: string = `https://api.openweathermap.org/data/2.5/weather?q=Lima&appid=${apiKey}&units=metric&lang=es`;

// Obtener los elementos HTML donde se mostrarán los datos del clima.
const descriptionElement = document.getElementById(
  "description"
) as HTMLElement;
const tempElement = document.getElementById("temp") as HTMLElement;
const feelsLikeElement = document.getElementById("feels-like") as HTMLElement;
const locationElement = document.getElementById("location") as HTMLElement;
const windElement = document.getElementById("wind") as HTMLElement;
const humidityElement = document.getElementById("humidity") as HTMLElement;
const localTimeElement = document.getElementById("local-time") as HTMLElement;
const weatherIconElement = document.getElementById(
  "weather-icon"
) as HTMLImageElement;

// Función para obtener los datos del clima desde la API de OpenWeatherMap.
const fetchWeather = async (): Promise<void> => {
  try {
    // Hacer la solicitud a la API para obtener los datos del clima.
    const response = await fetch(apiUrl);

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
      return;
    }

    // Convertir la respuesta en formato JSON.
    const data = await response.json();

    // Crear un objeto `weather` con los datos procesados para actualizar la UI.
    const weather: WeatherData = {
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
    feelsLikeElement.textContent = `Sensación térmica: ${weather.feelsLike.toFixed(
      1
    )}°C`;
    locationElement.textContent = weather.location;
    windElement.textContent = `Viento: ${weather.wind}`;
    humidityElement.textContent = `Humedad: ${weather.humidity}`;
    localTimeElement.textContent = `Hora local: ${weather.localTime}`;
    weatherIconElement.src = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`;

    // Si el icono incluye "d", significa que es de día. De lo contrario, es de noche.
    const isDay: boolean = weather.icon.includes("d");
    document.body.style.backgroundColor = isDay ? "#fef9c3" : "#1e3a8a"; // Cambiar el color del fondo según el día o la noche.
  } catch (error) {
    // Si hay un error en la solicitud, mostrar un mensaje y limpiar la UI.
    console.error("Error al obtener el clima:", error);
    descriptionElement.textContent = "Error al obtener el clima";
    tempElement.textContent = "";
    locationElement.textContent = "";
    windElement.textContent = "";
    humidityElement.textContent = "";
    localTimeElement.textContent = "";
    weatherIconElement.src = "";
  }
};

fetchWeather();
