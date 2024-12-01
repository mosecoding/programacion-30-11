# Weather App

Este proyecto es una aplicación web simple que muestra el clima actual en Lima utilizando la API de [OpenWeatherMap](https://openweathermap.org/). El código está implementado completamente en un archivo `index.html` con JavaScript.

---

## Funcionalidades

- Descripción del clima: (por ejemplo, "nubes dispersas", "soleado", "lluvioso").
- Temperatura en grados Celsius.
- Sensación térmica: Muestra la temperatura que realmente se siente (por ejemplo, si hace más calor o frío de lo que indica el termómetro).
- Ubicación: El nombre de la ciudad y el país (por ejemplo, "Lima, PE").
- Viento: Muestra la velocidad del viento en metros por segundo.
- Humedad: Muestra el porcentaje de humedad en el aire.
- Hora local: La hora en tiempo real de Lima.
- Ícono del clima: Un ícono visual que representa el estado del clima (por ejemplo, sol, nubes, lluvia).

---

## Estructura del archivo

### **index.html**

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Weather App</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      body {
        transition: background-color 0.5s ease;
      }
    </style>
  </head>
  <body class="bg-gray-100 flex justify-center items-center min-h-screen">
    <div
      class="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-gray-700"
    >
      <h1 class="text-3xl font-bold text-center mb-4">Clima en Lima</h1>
      <div id="weather" class="text-center">
        <img
          id="weather-icon"
          class="mx-auto w-20 h-20 mb-4"
          alt="Ícono del clima"
        />
        <p id="description" class="text-xl mb-2 font-semibold">Cargando...</p>
        <p id="temp" class="text-5xl font-bold text-blue-500 mb-2"></p>
        <p id="feels-like" class="text-sm text-gray-600"></p>
        <p id="location" class="text-lg font-medium text-gray-500"></p>
        <div class="mt-4">
          <p id="wind" class="text-sm mb-1">Viento: <span></span></p>
          <p id="humidity" class="text-sm mb-1">Humedad: <span></span></p>
          <p id="local-time" class="text-sm">Hora local: <span></span></p>
        </div>
      </div>
    </div>

    <script>
      const apiKey = "f79fc487bce2d44d12b8186ef388d93b";
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Lima&appid=${apiKey}&units=metric&lang=es`;

      const descriptionElement = document.getElementById("description");
      const tempElement = document.getElementById("temp");
      const feelsLikeElement = document.getElementById("feels-like");
      const locationElement = document.getElementById("location");
      const windElement = document.getElementById("wind");
      const humidityElement = document.getElementById("humidity");
      const localTimeElement = document.getElementById("local-time");
      const weatherIconElement = document.getElementById("weather-icon");

      const fetchWeather = async () => {
        try {
          const response = await fetch(apiUrl);

          if (!response.ok) {
            console.log(`Error: ${response.status} ${response.statusText}`);

            descriptionElement.textContent = "No se pudo obtener el clima";
            tempElement.textContent = "";
            locationElement.textContent = "";
            windElement.textContent = "";
            humidityElement.textContent = "";
            localTimeElement.textContent = "";
            weatherIconElement.src = "";

            return; // Terminar la ejecución si hay error
          }

          const data = await response.json();

          // Actualizar los elementos con los datos obtenidos
          const weather = data.weather[0];
          descriptionElement.textContent = weather.description;
          tempElement.textContent = `${data.main.temp.toFixed(1)}°C`;
          feelsLikeElement.textContent = `Sensación térmica: ${data.main.feels_like.toFixed(
            1
          )}°C`;
          locationElement.textContent = `${data.name}, ${data.sys.country}`;
          windElement.textContent = `Viento: ${data.wind.speed} m/s`;
          humidityElement.textContent = `Humedad: ${data.main.humidity}%`;
          localTimeElement.textContent = `Hora local: ${new Date().toLocaleTimeString(
            "es-PE",
            {
              timeZone: "America/Lima",
            }
          )}`;
          weatherIconElement.src = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`;

          // Cambiar el fondo según el clima
          const isDay = weather.icon.includes("d");
          document.body.style.backgroundColor = isDay ? "#fef9c3" : "#1e3a8a";
        } catch (error) {
          console.error("Error al obtener el clima:", error);

          // Mostrar mensaje de error si la solicitud falla
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
    </script>
  </body>
</html>
```
