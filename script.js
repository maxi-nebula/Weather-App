/** @format */

const searchBtn = document.getElementById("searchbtn");
const inputBox = document.getElementById("inputbox");

let locationChange = 0;

searchBtn.addEventListener("click", () => {
  getLocation();
});

getLocation = () => {
  const inputboxContent = inputBox.value;

  connectweatherApi(inputboxContent);
};

connectweatherApi = async (inputlocation) => {
  fetch(
    // "https://api.weatherapi.com/v1/current.json?key=ce7d396a6b7344f494944201233011&q=phoenix",
    `https://api.weatherapi.com/v1/current.json?key=ce7d396a6b7344f494944201233011&q=${inputlocation}`,
    { mode: "cors" }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      const requireweatherInformation = getrequiredInformation(response);

      displayResult(requireweatherInformation);
    });
};

getrequiredInformation = (res) => {
  let conditionText = res.current.condition.text;
  let icon = res.current.condition.icon;
  console.log(icon);
  let feelsLike = res.current.feelslike_f;
  let humidity = res.current.humidity;
  let currentTemperature = res.current.temp_f;

  let location = res.location.name;
  let localTime = res.location.localtime;

  const weatherInformation = {
    condition: conditionText,
    icon: icon,
    feelsLike: feelsLike,
    humidity: humidity,
    currentTemperature: currentTemperature,
    location: location,
    localTime: localTime,
  };

  return weatherInformation;
};

displayResult = (reqweatherInfo) => {
  const mainContainer = document.getElementById("maincontainer");
  const containerDiv = document.createElement("div");
  containerDiv.classList.add("weathercard");

  const currentText = document.createElement("p");
  currentText.innerText = `${reqweatherInfo.condition}`;

  const currentFeelslike = document.createElement("p");
  currentFeelslike.innerText = `${reqweatherInfo.feelsLike}`;
  const currentHumidity = document.createElement("p");
  currentHumidity.innerText = `${reqweatherInfo.humidity}`;
  const currentTemp = document.createElement("p");
  currentTemp.innerText = `${reqweatherInfo.currentTemperature}`;
  const currentLocation = document.createElement("p");
  currentLocation.innerText = `${reqweatherInfo.location}`;
  const currentTime = document.createElement("p");
  currentTime.innerText = `${reqweatherInfo.localTime}`;

  containerDiv.appendChild(currentLocation);
  containerDiv.appendChild(currentText);

  containerDiv.appendChild(currentTime);
  containerDiv.appendChild(currentTemp);
  containerDiv.appendChild(currentHumidity);
  containerDiv.appendChild(currentFeelslike);
  mainContainer.appendChild(containerDiv);
};
