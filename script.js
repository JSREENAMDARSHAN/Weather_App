const api = {
    key: "fcc8de7015bbb202209bbf0261babf4c",
    base: "https://api.openweathermap.org/data/2.5/"
  };
  
  const searchbox = document.querySelector('.search-box');
  searchbox.addEventListener('keypress', (evt) => {
    if (evt.keyCode == 13) getResults(searchbox.value);
  });
  
  async function getResults(query) {
    const response = await fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`);
    const weather = await response.json();
    displayResults(weather);
  }
  
  function displayResults(weather) {
    const { name, sys, main, weather: [weatherInfo] } = weather;
  
    document.querySelector('.location .city').innerText = `${name}, ${sys.country}`;
    document.querySelector('.location .date').innerText = dateBuilder(new Date());
  
    const temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(main.temp)}<span>°c</span>`;
  
    document.querySelector('.current .weather').innerText = weatherInfo.main;
    document.querySelector('.hi-low').innerText = `${Math.round(main.temp_min)}°c / ${Math.round(main.temp_max)}°c`;
  }
  
  function dateBuilder(d) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = days[d.getDay()];
    const date = d.getDate();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  }
  