// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!


async function fetchWeatherData(state) {
  const response = await fetch(`${weatherApi}${state}`);

  if (!response.ok) {
    throw new Error("Failed to fetch weather alerts.");
  }

  return await response.json();
}

function displayWeather(data) {
  const alertsDisplay = document.getElementById("alerts-display");

  alertsDisplay.innerHTML = "";

  const summary = document.createElement("h2");
  summary.textContent = `${data.title}: ${data.features.length}`;
  alertsDisplay.append(summary);

  data.features.forEach((alert) => {
    const headline = document.createElement("p");
    headline.textContent =
      alert.properties.headline || "No headline available";

    alertsDisplay.append(headline);
  });
}

function displayError(message) {
  const errorElement = document.getElementById("error-message");

  errorElement.textContent = message;
  errorElement.classList.remove("hidden");
}

const stateInput = document.getElementById("state-input");
const fetchButton = document.getElementById("fetch-alerts");
const errorElement = document.getElementById("error-message");
const alertsDisplay = document.getElementById("alerts-display");

fetchButton.addEventListener("click", async () => {
  const state = stateInput.value.trim().toUpperCase();

  alertsDisplay.innerHTML = "";
  stateInput.value = "";

  errorElement.textContent = "";
  errorElement.classList.add("hidden");

  if (!/^[A-Z]{2}$/.test(state)) {
    displayError("Please enter a valid two-letter state abbreviation.");
    return;
  }

  try {
    const data = await fetchWeatherData(state);
    displayWeather(data);
  } catch (error) {
    displayError(error.message);
  }
});
