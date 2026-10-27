// Yahan apni asli API key zaroor daalna double quotes ke andar
const apiKey = "f1d00af91b43b2b92044de45dcfaf614"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    // Phase 2: Error Handling (Agar city galat hai)
    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather-info").style.display = "none";
    } 
    // Agar city sahi hai toh mausam dikhao
    else {
        const data = await response.json(); 

        document.querySelector("#city").innerHTML = data.name;
        document.querySelector("#temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector("#humidity").innerHTML = data.main.humidity;
        document.querySelector("#wind").innerHTML = data.wind.speed;
        document.querySelector("#description").innerHTML = data.weather[0].description;
        
        const iconCode = data.weather[0].icon;
        document.querySelector("#weather-icon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        // Error message ko chupao aur weather-info ko dikhao
        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather-info").style.display = "block";
    }
}

// Button click hone par weather check karo
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
// Phase 3: Live GPS Location Logic
async function checkWeatherByLocation(lat, lon) {
    const locationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const response = await fetch(locationUrl);
    const data = await response.json(); 

    document.querySelector("#city").innerHTML = data.name;
    document.querySelector("#temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector("#humidity").innerHTML = data.main.humidity;
    document.querySelector("#wind").innerHTML = data.wind.speed;
    document.querySelector("#description").innerHTML = data.weather[0].description;
    
    const iconCode = data.weather[0].icon;
    document.querySelector("#weather-icon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    document.querySelector(".error").style.display = "none";
    document.querySelector(".weather-info").style.display = "block";
}

// Page load hote hi ye function browser se location mangega
window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // Agar user "Allow" karta hai toh uske coordinates fetch karo
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                checkWeatherByLocation(lat, lon);
            },
            () => {
                // Agar user "Block" kar de, toh default location dikha do
                checkWeather("New Delhi");
            }
        );
    }
});