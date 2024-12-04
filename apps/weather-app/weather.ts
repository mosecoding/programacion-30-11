// Tipado completo de la respuesta de la API
interface WeatherResponse {
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    wind: {
      speed: number;
      deg: number;
    };
    sys: {
      type: number;
      id: number;
      country: string;
      sunrise: number;
      sunset: number;
    };
    name: string;
    cod: number;
  }
  
  // Tipado para los datos que usaremos en la UI
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
  const descriptionElement = document.getElementById("description") as HTMLElement;
  const tempElement = document.getElementById("temp") as HTMLElement;
  const feelsLikeElement = document.getElementById("feels-like") as HTMLElement;
  const locationElement = document.getElementById("location") as HTMLElement;
  const windElement = document.getElementById("wind") as HTMLElement;
  const humidityElement = document.getElementById("humidity") as HTMLElement;
  const localTimeElement = document.getElementById("local-time") as HTMLElement;
  const weatherIconElement = document.getElementById("weather-icon") as HTMLImageElement;
  const loadingElement = document.getElementById("loading") as HTMLElement;
  const weatherElement = document.getElementById("weather") as HTMLElement;
  
  // Función para obtener los datos del clima desde la API de OpenWeatherMap.
  const fetchWeather = async (): Promise<void> => {
    try {
      // Mostrar el mensaje de carga y ocultar el resto.
      loadingElement.style.display = "block";
      weatherElement.style.display = "none";
  
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
  
        loadingElement.style.display = "none";
        weatherElement.style.display = "block";
        return;
      }
  
      // Convertir la respuesta en formato JSON con el tipo `WeatherResponse`.
      const data: WeatherResponse = await response.json();
  
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

      loadingElement.style.display = "none";
      weatherElement.style.display = "block";
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
  
      loadingElement.style.display = "none";
      weatherElement.style.display = "block";
    }
  };
  
  fetchWeather();
  