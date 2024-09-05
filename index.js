// console.log(`hello`);

// window.alert(`this is an alert!`);
// window.alert(`i like pizza!`);

// //comment

// document.getElementById("myP").textContent = `Hello`;
// let username;

// username = window.prompt("Whats your username?");

// console.log(username);


// document.getElementById("mySubmit").onclick = function() {
//     username = document.getElementById("myText").value;
//     document.getElementById("myH1").textContent = `hello ${username}`;
// }

// let count = 0

// document.getElementById("increase").onclick = function() {
//     count++;
//     document.getElementById("countLabel").textContent = count;
// }

// document.getElementById("decrease").onclick = function() {
//     count--;
//     document.getElementById("countLabel").textContent = count;
// }

// document.getElementById("reset").onclick = function() {
//     count = 0;
//     document.getElementById("countLabel").textContent = count;
// }

// function rollDice() {
//     const numOfDice = document.getElementById("numOfDice").value;
//     const diceResult = document.getElementById("diceResult");
//     const diceImages = document.getElementById("diceImages");
//     const values = [];
//     const images = [];

//     for (let i = 0; i < numOfDice; i++) {
//         const value = Math.floor(Math.random() *6) + 1;
//         values.push(value);
//         images.push(`<img src="dice_`)
//     }
// }

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "71bccde2b6528bfd501d75bc1db21a81";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value;

    if (city) {
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch(error) {
            console.error(error);
            displayError(error);
        }



    } else {
        displayError("Please enter a city");
    }
});

async function getWeatherData(city) {

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("Couldnt get data");
    }
    
    return await response.json();
    
}

function displayWeatherInfo(data) {
    const {name: city,
            main: {temp, humidity},
            weather: [{description}]} = data;
    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${temp - 273.15}C`;
    humidityDisplay.textContent = humidity;
    descDisplay.textContent = description;


    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);

}

function displayError(message) {
    

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.computedStyleMap.display = "flex";
    card.appendChild(errorDisplay);
}