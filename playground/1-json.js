const fs = require('fs');

// const book = {
//   title: 'Ego is my enemy',
//   author: 'Ryan Holiday',
// };

// const bookJSON = JSON.stringify(book);
// console.log(bookJSON);

// const parseData = JSON.parse(bookJSON);
// console.log(parseData);

// fs.writeFileSync('1-json.json', bookJSON);

const dataBuffer = fs.readFileSync('1-json.json', 'utf-8');
const data = JSON.parse(dataBuffer);
console.log(data.title);
