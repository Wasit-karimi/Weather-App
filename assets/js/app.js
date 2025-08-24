const apiKey = "827fae17396c487195b22422231008";
const form = document.getElementById("myForm");
const input = document.getElementById("weatherInput");

const swiper = new Swiper(".mySwiper", {
  loop: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  effect: "slide",
  speed: 800, // transition speed
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const cityName = input.value;
  weatherData(cityName);

  input.value = "";
});

async function weatherData(cityName) {
  const container = document.getElementById("container");
  container.innerHTML = `<div class="loader w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin mx-auto"></div>
  <p class="text-gray-200 text-md mt-2">Fetching weather...</p>
  `
  const city = cityName;

  try {
    const weather = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`
    );
    const response = await weather.json();
    container.innerHTML = ''

    const pElementCelcius = document.createElement("p");
    pElementCelcius.innerText = `The weather is ${response.current.temp_c} celcius`;
    pElementCelcius.classList.add("py-2", "text-xl", "text-gray-500");

    const pElementCondition = document.createElement("p");
    pElementCondition.innerText = `The weather is ${response.current.condition.text} `;
    pElementCondition.classList.add(
      "py-2",
      "text-xl",
      "text-gray-500",
      "flex",
      "gap-5",
      "items-center"
    );

    const img = document.createElement("img");
    img.src = response.current.condition.icon;

    pElementCondition.appendChild(img);

    container.appendChild(pElementCelcius);
    container.appendChild(pElementCondition);

    //I have kept these logs for testing
    console.log(response);
    console.log(response.current.condition);
    console.log(response.current.condition.text);
    console.log(response.current.condition.icon);
    console.log(response.current.temp_c);
  } catch (e) {
    container.innerHTML = `<p class="text-red-400">Failed to load weather. Please try again.</p>`;
    console.error(error);
  }
}
