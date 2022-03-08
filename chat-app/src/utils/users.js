let users = [];

// add users to the list

const addUser = ({ id, username, room }) => {
  username = username.trim().toLowerCase();
  // validata dataa
  if (!username || !room) {
    return { error: 'Username and Romm are required' };
  }

  // check for existing users
  const isExists = users.find((x) => x.username === username);
  if (isExists) {
    console.log('here2');
    return {
      error: 'User already exists',
    };
  }

  // store user
  const newUser = { id, username, room };
  users.push(newUser);
  console.log('user name', username);

  return { newUser };
};

// remove users from the list
const removeUser = (id) => {
  const newUsersList = users.filter((user) => user.id !== id);
  users = [...newUsersList];
};
// get users from the list
const getUser = (id) => users.find((user) => user.id === id);
// get users in Room
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
