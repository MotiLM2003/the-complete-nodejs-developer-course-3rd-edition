console.log('loading local javascript file');

fetch('http://localhost:5000/weather?address=!').then((res) => {
  res.json().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      console.log(data);
    }
  });
});
