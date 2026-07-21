// Get form element
const weatherForm = document.getElementById("weatherForm");

// Submit event
weatherForm.addEventListener("submit", showWeatherDetails);

function showWeatherDetails(event) {
    event.preventDefault();

    // Get city name
    const city = document.getElementById("city").value.trim();

    // Replace with your OpenWeatherMap API key
    const apiKey = "YOUR_API_KEY";

    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found.");
            }
            return response.json();
        })
        .then(data => {
            const weatherInfo = document.getElementById("weatherInfo");

            weatherInfo.innerHTML = `
                <h2>Weather in ${data.name}</h2>
                <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
                <p><strong>Weather:</strong> ${data.weather[0].description}</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
            `;
        })
        .catch(error => {
            document.getElementById("weatherInfo").innerHTML =
                `<p style="color:red;">${error.message}</p>`;
        });
}