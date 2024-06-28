const container = document.querySelector('.container');
const search = document.querySelector('.searchbox button');
const weatherbox = document.querySelector('.weather-box');
const weatherdetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityhide = document.querySelector('.city-hide');

search.addEventListener('click', () => {
    const APIKey = '7b8a86259d3c2923a8294d10b055db46';
    const city = document.querySelector('.searchbox input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                cityhide.textContent = city;
                container.style.height = '400px';
                weatherbox.classList.remove('active');
                weatherdetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            if (cityhide.textContent === city) return;

            cityhide.textContent = city;
            container.style.height = '555px';
            weatherbox.classList.add('active');
            weatherdetails.classList.add('active');
            error404.classList.remove('active');

            // Remove old clones before adding new ones
            const oldClones = document.querySelectorAll('#clone-info-weather, #clone-info-humidity, #clone-info-wind');
            oldClones.forEach(clone => clone.remove());

            // Transition out current info
            container.classList.add('active');

                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = 'images/clear.png';
                        break;
                    case 'Rain':
                        image.src = 'images/rain.png';
                        break;
                    case 'Snow':
                        image.src = 'images/snow.png';
                        break;
                    case 'Clouds':
                        image.src = 'images/cloud.png';
                        break;
                    case 'Mist':
                        image.src = 'images/mist.png';
                        break;
                    case 'Haze':
                        image.src = 'images/haze.png';
                        break;
                    default:
                        image.src = 'images/cloud.png';
                }

                temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                description.innerHTML = `${json.weather[0].description}`;
                humidity.innerHTML = `${json.main.humidity}%`;
                wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;

                // Clone new info
                const infoweather = document.querySelector('.info-weather');
                const infohumidity = document.querySelector('.info-humidity');
                const infowind = document.querySelector('.info-wind');

                const elCloneInfoWeather = infoweather.cloneNode(true);
                const elCloneInfoHumidity = infohumidity.cloneNode(true);
                const elCloneInfoWind = infowind.cloneNode(true);

                elCloneInfoWeather.id = 'clone-info-weather';
                elCloneInfoWeather.classList.add('active-clone')

                elCloneInfoHumidity.id = 'clone-info-humidity';
                elCloneInfoHumidity.classList.add('active-clone')

                elCloneInfoWind.id = 'clone-info-wind';
                elCloneInfoWind.classList.add('active-clone')

                setTimeout(() => {
                    infoweather.insertAdjacentElement("afterend", elCloneInfoWeather);
                    infohumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
                    infowind.insertAdjacentElement("afterend", elCloneInfoWind);
                }, 2200);

                setTimeout(() => {
                    container.classList.remove('active');
                }, 2500);
        });
});
