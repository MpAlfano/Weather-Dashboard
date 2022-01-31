let cityList = document.querySelector('#city-list');
let search = document.querySelector('#search-btn');
let searchCityEl = document.querySelector('#search-input');
let cityResultEl = document.querySelector('#result-text');
let cityTempEl = document.querySelector('#result-temp')
let cityWindEl = document.querySelector('#result-wind')
let cityHumidityEl = document.querySelector('#result-humidity')
let cityUvEl = document.querySelector('#result-uv')

let citySearched = ""

let apiKey = "ad68e9d54c45c1fbe3fc55d4ee2ee47d"
let citiesAll = []

//function to run and get stored city and post to page

let loadCity = function () {

    cityList.innerHTML = "";

    
    for (let i = 0; i < 10; i++) {
        let city = citiesAll[i];

        console.log(citiesAll)
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



//function to  display weather to dashboard when search submitted



// use dt and moment to get the weather for each day




//function to display clicked on city to dashboard


//function to fetch

let getCityWeather = function () {

    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearched + "," + "&appid=" + apiKey
    console.log(1);
    fetch(apiUrl)
        .then(function (response) {
            console.log(2);

            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            return response.json()

        })
        .then(function (data) {
            console.log(3);

            cityWindEl.innerHTML = "Wind Speed: " + data.wind.speed + " MPH";
            cityHumidityEl.innerHTML = "Humidity: " + data.main.humidity + "%";
            
            console.log(data)

            let lat = data.coord.lat;
            let lon = data.coord.lon;
            console.log(lat)
            console.log(lon)

            let apiUvUrl = "https://api.openweathermap.org/data/2.5/onecall?units=metric&lat=" + lat + "&lon=" + lon + "&exclude={part}&appid=" + apiKey

            fetch(apiUvUrl)
                .then(function (response) {
                 
                    if (!response.ok) {
                        throw new Error('Network response was not OK');
                    }
                    return response.json()

                })
                .then(function (data){
                    cityUvEl.innerHTML = "UV: " + data.current.uvi;
                    cityTempEl.innerHTML = "Temperature: " + data.current.temp + " °C"
                    console.log(data)

                })
        })
    console.log(4);







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

    //double check this later
    if (cityClicked.value !== null) {


    }


});

//starts onload functions
init();