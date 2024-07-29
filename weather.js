
const apiKey = "89329dba314668d1ad4ae9d3f4d65f45";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const invalidCity = document.querySelector(".error");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else {

        var data = await response.json();
        console.log(data);
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " km/h";
        document.querySelector(".feels-like").innerHTML = Math.round(data.main.feels_like) + "°C";
        document.querySelector(".visibility").innerHTML = data.visibility / 1000 + " km";

        const offsetSeconds = data.timezone;
        const hours = Math.floor(offsetSeconds / 3600);
        const minutes = (offsetSeconds % 3600) / 60;
        const offsetStr = `UTC${hours >= 0 ? '+' : ''}${hours}:${minutes.toString().padStart(2, '0')}`;

        var utcSeconds = data.sys.sunrise + data.timezone;
        var sunriseDate = new Date(0);
        sunriseDate.setUTCSeconds(utcSeconds);

        var daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
        var sunriseDayOfWeek = daysOfWeek[sunriseDate.getUTCDay()];
        var sunriseOptions = { month: 'short', day: '2-digit', year: 'numeric' };
        var formattedSunriseDate = sunriseDate.toLocaleDateString('en-US', sunriseOptions).replace(',', '');

        var rise_hours = sunriseDate.getUTCHours().toString().padStart(2, '0');
        var rise_minutes = sunriseDate.getUTCMinutes().toString().padStart(2, '0');
        var rise_seconds = sunriseDate.getUTCSeconds().toString().padStart(2, '0');

        var sunriseTime = `${rise_hours}:${rise_minutes}:${rise_seconds}`;

        var utCSeconds = data.sys.sunset + data.timezone;
        var sunsetDate = new Date(0);
        sunsetDate.setUTCSeconds(utCSeconds);

        var sunsetDayOfWeek = daysOfWeek[sunsetDate.getUTCDay()];
        var sunsetOptions = { month: 'short', day: '2-digit', year: 'numeric' };
        var formattedSunsetDate = sunsetDate.toLocaleDateString('en-US', sunsetOptions).replace(',', '');

        var set_hours = sunsetDate.getUTCHours().toString().padStart(2, '0');
        var set_minutes = sunsetDate.getUTCMinutes().toString().padStart(2, '0');
        var set_seconds = sunsetDate.getUTCSeconds().toString().padStart(2, '0');

        var sunsetTime = `${set_hours}:${set_minutes}:${set_seconds}`;

        document.querySelector(".sunrise-time").innerHTML = sunriseTime + " " + offsetStr;
        document.querySelector(".sunset-time").innerHTML = sunsetTime + " " + offsetStr;
        document.querySelector(".Sunrise-Day").innerHTML = `${sunriseDayOfWeek} ${formattedSunriseDate}`;
        document.querySelector(".Sunset-Day").innerHTML = `${sunriseDayOfWeek} ${formattedSunriseDate}`;


        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/cloudy.png";
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/sunny.png";
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        }
        else if (data.weather[0].main == "Haze") {
            weatherIcon.src = "images/haze.png";
        }
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }




}
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})
checkWeather();