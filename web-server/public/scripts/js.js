console.log('loading local javascript file');

const myform = document.querySelector('form');

myform.addEventListener('submit', (e) => {
  e.preventDefault();
  const search = document.querySelector('#search').value;
  alert(search);
  getForecast(search);
});

const getForecast = (address) => {
  fetch(`http://localhost:5000/weather?address=${address}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data);
      }
    });
  });
};
