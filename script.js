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
      //createCard();

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

createCard = () => {
  const containerDiv = document.createElement("div");
  const currentText = document.createElement("div");
  currentText.id = "text";
  currentText.className = "statustext";
  const currentFeelslike = document.createElement("div");
  currentFeelslike.id = "feelslike";
  currentFeelslike.className = "feelsliketext";
  const currentHumidity = document.createElement("div");
  currentHumidity.id = "humidity";
  currentHumidity.className = "humiditytext";
  const currentTemp = document.createElement("div");
  currentTemp.id = "temperature";
  currentTemp.className = "temptext";
  const currentLocation = document.createElement("div");
  currentLocation.id = "location";
  currentLocation.className = "locationtext";

  const currentTime = document.createElement("div");
  currentTime.id = "localtime";
  currentTime.className = "currenttimetext";

  containerDiv.appendChild(currentLocation);
  containerDiv.appendChild(currentTime);
  containerDiv.appendChild(currentText);

  containerDiv.appendChild(currentHumidity);
  containerDiv.appendChild(currentTemp);
  containerDiv.appendChild(currentFeelslike);

  return containerDiv;
};

displayResult = (reqweatherInfo) => {
  console.log(reqweatherInfo);
  const mainContainer = document.getElementById("maincontainer");
  const weatherinfoContainer = createCard();
  console.log(weatherinfoContainer);
  mainContainer.appendChild(weatherinfoContainer);
  const locationInfo = document.getElementById("location");
  const text = document.getElementById("text");
  text.innerText = `${reqweatherInfo.condition}`;
  locationInfo.innerText = `${reqweatherInfo.location}`;
  const localtimeInfo = document.getElementById("localtime");

  localtimeInfo.innerText = `${reqweatherInfo.localTime}`;
  const tempInfo = document.getElementById("temperature");
  tempInfo.innerText = `${reqweatherInfo.currentTemperature} f`;

  const humidityInfo = document.getElementById("humidity");
  humidityInfo.innerText = `humidity : ${reqweatherInfo.humidity}`;

  const feelslikeInfo = document.getElementById("feelslike");
  feelslikeInfo.innerText = `feels like :${reqweatherInfo.feelsLike} f`;
};
