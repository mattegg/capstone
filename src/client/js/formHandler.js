function handleSubmit(event) {
  event.preventDefault();

  let location = document.getElementById('name').value;
  let submittedDate = document.getElementById('when').value;


  const url = 'http://localhost:8080/processLocation';
  fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    cache: 'no-cache',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({ location: location }),
  })
    .then((res) => res.json())
    .then(function (res) {
      console.log(res);
      document.getElementById(
        'card1'
      ).innerHTML = `Looks like you are going to ${res.toponymName} I have never been but it sounds lovely. Bet you didnt know the Latitude is ${res.lat} and Longitude is ${res.lng}.`;
      // weather card
      if (document.querySelector('.cardimg')) {
        document.querySelector('.cardimg').remove();
      }
      if (document.querySelector('.card')) {
        document.querySelector('.card').remove();
      }


      // now we need to do some logic to get date. If the date is future, we display 14 day forecast.
      let todayDate = new Date();
      todayDate = todayDate.toISOString().split('T')[0];
      console.log(todayDate, submittedDate);
      if (todayDate < submittedDate) {
        let gridCard = document.querySelector('.cards');
        //document.body.style.backgroundImage = `url('${res.imageURL}')`;
        // add picture to the current weather card
        let cardimg = document.createElement('div');
        cardimg.classList.add('cardimgL');
        let placeimage = document.createElement('img');
        placeimage.src = `${res.imageURL}`;
        cardimg.appendChild(placeimage);
        gridCard.appendChild(cardimg);
console.log(placeimage.src);
        for (let i = 0; i < res.forecastWeather.length; i++) {
          // loop this forecast for entire 14 days.
  
          let card = document.createElement('div');
          card.classList.add('card');
          let image = document.createElement('img');
          image.src = `https://www.weatherbit.io/static/img/icons/${res.forecastWeather[i].weather.icon}.png`;
          card.appendChild(image);
          let text = document.createElement('div');

          text.innerHTML = ` <div class="place"> ${res.forecastWeather[i].datetime}</div>Weather: <span class="data">${res.forecastWeather[i].weather.description} </span><br> Max Temp: <span class="data">${res.forecastWeather[i].max_temp}°c </span><br> Wind speed:  <span class="data">${res.forecastWeather[i].wind_spd} mph </span>`;
          card.appendChild(text);
          gridCard.appendChild(card);
          // end weather card
        }
      } else {
    
      let card = document.createElement('div');
      card.classList.add('card');
      let image = document.createElement('img');
      image.src = `https://www.weatherbit.io/static/img/icons/${res.curentWeather.weather.icon}.png`;
      card.appendChild(image);
      let text = document.createElement('div');
      text.innerHTML = ` <div class="place">${res.toponymName}</div>Currently <span class="data">${res.curentWeather.weather.description} </span><br> Temp: <span class="data">${res.curentWeather.temp}°c </span><br> Wind speed:  <span class="data">${res.curentWeather.wind_spd} mph </span>`;
      card.appendChild(text);
      let gridCard = document.querySelector('.cards');
      gridCard.appendChild(card);
      // end weather card
      // add picture to the current weather card
      let cardimg = document.createElement('div');
      cardimg.classList.add('cardimg');
      let placeimage = document.createElement('img');
      placeimage.src = `${res.imageURL}`;
      cardimg.appendChild(placeimage);
      gridCard.appendChild(cardimg);

      }
    });
}

export { handleSubmit };
