const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 2000);
  });
};

add(2, 4)
  .then((sum) => {
    console.log(sum);
    return add(sum, 4);
  })
  .then((totalSum) => {
    console.log('total sum', totalSum);
  })
  .catch((err) => {
    console.log(err);
  });
// const doWorkCallback = (callback) => {
//   setTimeout(() => {
//     // callback('this is an error', undefined);

//     callback(undefined, [1, 2, 3, 5]);
//   }, 2000);
// };

// doWorkCallback((error, result) => {
//   if (error) {
//     return console.log(error);
//   }

//   console.log(result);
// });

// const doWorkPromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve([12, 32, 39]);
//     reject('some error');
//   }, 2000);
// });

// doWorkPromise
//   .then((result) => {
//     console.log('Success', result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
