const {
  calculateTip,
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  add,
} = require('../src/math');

test('should calculate with tip', () => {
  const total = calculateTip(10, 0.3);
  expect(total).toBe(13);
});

test('should calculated total with default tip', () => {
  const total = calculateTip(10);
  expect(total).toBe(12.5);
});

test('should converte 32 F to  0 C', () => {
  expect(fahrenheitToCelsius(32));
});

test('should convert 0 C to 32 F', () => {
  expect(celsiusToFahrenheit(0));
});

// test('Async test with jest', (done) => {
//   setTimeout(() => {
//     expect(3).toBe(3);
//     done();
//   }, 2000);
// });

test('should add two numbers', (done) => {
  add(2, 3).then((sum) => {
    expect(sum).toBe(5);
    done();
  });
});

test('should add two numbers async/await', async () => {
  const sum = await add(2, 3);
  expect(sum).toBe(5);
});
