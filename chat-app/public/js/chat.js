const socket = io();

const txtMessage = document.getElementById('txtMessage');
const btnSendMessage = document.getElementById('btnSendMessage');
const btnShareLocation = document.getElementById('btnShareLocation');
const $messages = document.getElementById('messages');

// templates
const messageTemplate = document.getElementById('message-template').innerHTML;
const locationTemplate = document.getElementById('location-template').innerHTML;

// options
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

console.log('usernaem', location.search, username);
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
  btnShareLocation.disabled = true;
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    socket.emit('shareLocation', { latitude, longitude }, (error) => {
      if (error) {
        btnShareLocation.disabled = false;

        return error;
      }
      btnShareLocation.disabled = false;
      console.log('locatioon shared');
    });
  });
});
const sendUserMessage = () => {
  let message = txtMessage.value;
  if (!message || !(message.length > 0)) return;
  socket.emit('sendMessage', message, (error) => {
    if (error) {
      return console.log(error);
    }
  });
  txtMessage.value = '';
  txtMessage.focus();
};

socket.on('locationMessage', (data) => {
  const { url, message, createdAt } = data;
  const html = Mustache.render(locationTemplate, {
    url,
    message,
    createdAt: moment(createdAt).format('HH:mm:s'),
  });
  $messages.insertAdjacentHTML('beforeend', html);
});

socket.on('newUserMessage', (message) => {
  console.log(message.text);
});

socket.on('userLeft', (message) => {
  console.log('user left the building');
});

socket.on('messageRecived', (message) => {
  // messages += `<br /> ${message}`;
  // document.getElementById('messages').innerHTML = messages;
  //   txtMessage.value = '';
  const { text, createdAt } = message;
  console.log('text', text);
  const html = Mustache.render(messageTemplate, {
    message: text,
    createdAt: moment(createdAt).format('HH:mm:s'),
  });
  $messages.insertAdjacentHTML('beforeend', html);
});

socket.emit('join', { username, room }, (error) => {
  if (error) {
    console.log('test');
  }
  console.log(error);
});
