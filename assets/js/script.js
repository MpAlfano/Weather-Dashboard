let cityList = document.querySelector('#city-list');
let search = document.querySelector('#search-btn');
let searchCityEl = document.querySelector('#search-input');
let cityResultEl = document.querySelector('#result-text');
let cityTempEl = document.querySelector('#result-temp')
let cityWindEl = document.querySelector('#result-wind')
let cityHumidityEl = document.querySelector('#result-humidity')
let cityUvEl = document.querySelector('#result-uv')
let fiveDayForecast = document.querySelectorAll('#day')
let fivePic1El = document.querySelector('#pic1')
let fivePic2El = document.querySelector('#pic2')
let fivePic3El = document.querySelector('#pic3')
let fivePic4El = document.querySelector('#pic4')
let fivePic5El = document.querySelector('#pic5')
const currentPicEl = document.querySelector("#current-pic");

let citySearched = ""

let apiKey = "ad68e9d54c45c1fbe3fc55d4ee2ee47d"
let citiesAll = []

//function to run and get stored city and post to page

let loadCity = function () {

    cityList.innerHTML = "";

    for (let i = 0; i < 10; i++) {

        let city = citiesAll[i];
        let li = document.createElement("li");
        li.textContent = city;
        li.setAttribute("city-index", i);
        // Add bootstrap for button
        li.classList.add("btn-primary");

        cityList.appendChild(li);
    }
}


//function to run on page load

let init = function () {

    let storedCity = JSON.parse(localStorage.getItem("cities"));

    if (storedCity !== null) {
        citiesAll = storedCity;
    }
    console.log(storedCity)

    loadCity();
}

//function to save city list when new city is added

let storeCity = function () {

    localStorage.setItem("cities", JSON.stringify(citiesAll));
}

//function to display clicked on city to dashboard


//function to fetch and to display weather to dashboard when search submitted

let getCityWeather = function () {

    console.log(citySearched)
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearched + "," + "&appid=" + apiKey

    fetch(apiUrl)

        .then(function (response) {

            if (!response.ok) {
                cityResultEl.textContent = "";
                window.alert("No results")
                throw new Error('Network response was not OK');

            }
            cityResultEl.textContent = citySearched + "(" + moment().format("L") + ")"
            return response.json()
        })
        .then(function (data) {

            let weatherPic = data.weather[0].icon;
            currentPicEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
            currentPicEl.setAttribute("alt", data.weather[0].description);

            cityWindEl.innerHTML = "Wind Speed: " + data.wind.speed + " MPH";
            cityHumidityEl.innerHTML = "Humidity: " + data.main.humidity + "%";

            console.log(data)

            let lat = data.coord.lat;
            let lon = data.coord.lon;
            console.log(lat)
            console.log(lon)

            let apiUvUrl = "https://api.openweathermap.org/data/2.5/onecall?units=metric&lat=" + lat + "&lon=" + lon + "&appid=" + apiKey

            fetch(apiUvUrl)
                .then(function (response) {

                    if (!response.ok) {
                        throw new Error('Network response was not OK');
                    }
                    return response.json()

                })
                .then(function (data) {
                        
                        console.log(data.current.uvi)
                        if (data.current.uvi < 4 ) {
                            cityUvEl.setAttribute("class", "badge badge-success");
                        }
                        else if (data.current.uvi < 8) {
                            cityUvEl.setAttribute("class", "badge badge-warning");
                        }
                        else {
                            cityUvEl.setAttribute("class", "badge badge-danger");
                        }

                    cityUvEl.innerHTML = "UV: " + data.current.uvi;
                    cityTempEl.innerHTML = "Temperature: " + data.current.temp + " °C"
                    console.log(data)
                    // To get weather for 5 day forecast
                    fiveDayForecast.forEach(function (dayDiv) {
                        let i = parseInt(dayDiv.getAttribute("data-value"))
                        let timeDay = moment().add(i, 'days').format("L")


                        dayDiv.textContent = "(" + timeDay + ")  " + "Temperature: " + data.daily[i].temp.day + " °C" + " Wind Speed: " + data.daily[i].wind_speed + " MPH " + "Humidity: " + data.daily[i].humidity + " %";
                        console.log(timeDay)
                    })
                    fivePic1El.setAttribute("src", "https://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon + "@2x.png");
                    fivePic1El.setAttribute("alt", data.daily[1].weather[0].description);
                    fivePic2El.setAttribute("src", "https://openweathermap.org/img/wn/" + data.daily[2].weather[0].icon + "@2x.png");
                    fivePic2El.setAttribute("alt", data.daily[2].weather[0].description);
                    fivePic3El.setAttribute("src", "https://openweathermap.org/img/wn/" + data.daily[3].weather[0].icon + "@2x.png");
                    fivePic3El.setAttribute("alt", data.daily[3].weather[0].description)
                    fivePic4El.setAttribute("src", "https://openweathermap.org/img/wn/" + data.daily[4].weather[0].icon + "@2x.png");
                    fivePic4El.setAttribute("alt", data.daily[4].weather[0].description);
                    fivePic5El.setAttribute("src", "https://openweathermap.org/img/wn/" + data.daily[5].weather[0].icon + "@2x.png");
                    fivePic5El.setAttribute("alt", data.daily[5].weather[0].description);
                })
        })
}

//event listener for search button

search.addEventListener("click", function (event) {
    event.preventDefault()

    citySearched = searchCityEl.value.trim();
    console.log(citySearched);
    if (citySearched === "") {
        return;
    }

    console.log(citySearched);
    citiesAll.unshift(citySearched);
    searchCityEl.value = "";

    storeCity();
    loadCity();
    getCityWeather();

});

//event listener for previous city clicked on

cityList.addEventListener("click", function (event) {
    event.preventDefault()

    let cityClicked = event.target;
    citySearched = cityClicked.textContent.trim()

    if (citySearched === "") {
        return;
    }

    console.log(citySearched)
    getCityWeather();

});

//starts onload functions
init();