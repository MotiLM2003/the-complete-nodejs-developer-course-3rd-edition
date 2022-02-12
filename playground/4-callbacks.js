// const names = ['andrew', 'Jen', 'Jess'];
// const shortNames = names.filter((name) => {
//   return name.length <= 4;
// });

// const geoCode = (address, callback) => {
//   setTimeout(() => {
//     const data = { latitude: 0, longitude: 0 };
//     callback(data);
//   }, 1000);
// };

// // geoCode('Phildadelphia', (data) => {
// //   console.log(data);
// // });

// const add = (a, b, callback) => {
//   setTimeout(() => {
//     const sum = a + b;
//     callback(sum);
//   }, 2000);
// };

// add(1, 4, (sum) => console.log(sum));

const doWorkCallback = (callback) => {
  setTimeout(() => {
    console.log('here');
    callback('this is an error', undefined);
  }, 2000);
};

doWorkCallback((error, result) => {
  if (error) {
    return console.log(error);
  }
});
