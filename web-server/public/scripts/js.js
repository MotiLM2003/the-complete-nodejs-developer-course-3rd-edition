console.log('loading local javascript file');

const myform = document.querySelector('form');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

myform.addEventListener('submit', (e) => {
  message1.textContent = 'Loading...';
  message2.textContent = '';
  e.preventDefault();
  const search = document.querySelector('#search').value;
  getForecast(search);
});

const getForecast = (address) => {
  fetch(`http://localhost:5000/weather?address=${address}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        message1.textContent = data.error;
        console.log('ere');
      } else {
        console.log(data);
        message1.textContent = data.forecast.forecast;
        message2.textContent = data.location;
      }
    });
  });
};
