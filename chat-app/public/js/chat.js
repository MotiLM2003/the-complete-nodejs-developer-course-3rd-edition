const socket = io();

const txtMessage = document.getElementById('txtMessage');
const btnSendMessage = document.getElementById('btnSendMessage');
const btnShareLocation = document.getElementById('btnShareLocation');
let messages = '';
txtMessage.value = '';

txtMessage.addEventListener('keyup', (e) => {
  console.log(e.key);
  if (e.key === '13' || e.key === 'Enter') {
    sendUserMessage();
  }
});
btnSendMessage.addEventListener('click', () => {
  sendUserMessage();
});

btnShareLocation.addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('You dont have support for geolocation');
  }

  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    socket.emit('shareLocation', { latitude, longitude });
  });
});
const sendUserMessage = () => {
  let message = txtMessage.value;
  if (!message || !(message.length > 0)) return;
  socket.emit('sendMessage', message, (acknowledge) => {
    console.log(acknowledge);
  });
  txtMessage.value = '';
  txtMessage.focus();
};

socket.on('newUserMessage', (message) => {
  console.log(message);
});

socket.on('userLeft', (message) => {
  console.log('user left the building');
});

socket.on('messageRecived', (message) => {
  console.log('new message', message);
  messages += `<br /> ${message}`;
  document.getElementById('messages').innerHTML = messages;
  //   txtMessage.value = '';
});
