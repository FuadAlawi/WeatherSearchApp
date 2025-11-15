document.getElementById("searchBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  if (city === "") return alert("Please enter a city name");

  fetch(`https://wttr.in/${city}?format=j1`)
    .then(response => response.json())
    .then(data => {
      const area = data.nearest_area[0].areaName[0].value;
      const temp = data.current_condition[0].temp_C;
      const hum = data.current_condition[0].humidity;
      const desc = data.current_condition[0].weatherDesc[0].value.toLowerCase();

      document.getElementById("cityName").textContent = `🌍 ${area}`;
      document.getElementById("temperature").textContent = `🌡 Temperature: ${temp}°C`;
      document.getElementById("humidity").textContent = `💧 Humidity: ${hum}%`;
      document.getElementById("desc").textContent = `☁ Condition: ${desc}`;

      document.getElementById("weatherCard").style.display = "block";

      /* --- CHANGE BACKGROUND BASED ON WEATHER --- */
      document.body.className = ""; // reset

      if (desc.includes("sun") || desc.includes("clear")) {
        document.body.classList.add("sunny");
      }
      else if (desc.includes("rain") || desc.includes("shower")) {
        document.body.classList.add("rainy");
      }
      else if (desc.includes("snow")) {
        document.body.classList.add("snowy");
      }
      else {
        document.body.classList.add("cloudy");
      }
    })
    .catch(() => {
      alert("City not found. Please try again.");
    });
});