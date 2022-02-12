const greeter = (
  name = 'user',
  { firstName = 'Moti', lastName = 'Elmakyes' } = {}
) => {
  console.log(`Hello ${name}, First Name: ${firstName}`);
};

greeter('Hello');
