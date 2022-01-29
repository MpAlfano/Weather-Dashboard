let cityList = document.querySelector('#city-list');
let search = document.querySelector('#search-btn');
let searchCity = document.querySelector('#search-input');

let citiesAll = []

//function to run and get stored city and post to page

let loadCity = function() {

    cityList.innerHTML = "";
    
    for (let i = 0; i < citiesAll.length; i++) {
        let city = citiesAll[i];

        let li = document.createElement("li");
        li.textContent = city;
        li.setAttribute("city-index", i);

        cityList.appendChild(li);
    }    
}



//function to run on page load

let init = function() {

    let storedCity = JSON.parse(localStorage.getItem("cities"));

    if (storedCity !== null) {
        citiesAll = storedCity;
    }
    console.log(storedCity)

    loadCity();
}

//function to save city list when new city is added

let storeCity = function() {
    
    localStorage.setItem("cities", JSON.stringify(citiesAll));
}



//function to add city to list and display weather to dashboard when search submitted





//function to add clicked on city to dashboard





//event listener for search button

search.addEventListener("click", function(event) {
    event.preventDefault

    let citySearched = searchCity.value.trim();
    console.log(citySearched);
    if (citySearched === "") {
        return;
    }

    console.log(citySearched);
    citiesAll.push(citySearched);
    searchCity.value = "";

     storeCity();
     loadCity();

});

//event listener for previous city clicked on

cityList.addEventListener("click", function(event) {
    let cityClicked = event.target;

//double check this later
    if (cityClicked.value !== null) {


    }


});

//starts onload functions
init();