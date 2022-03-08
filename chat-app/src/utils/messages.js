const generateMessage = (text, userName = 'none') => {
  return {
    userName,
    text,
    createdAt: new Date().getTime(),
  };
};

const generateLocationMessage = (url, message) => {
  return {
    message,
    url,
    createdAt: new Date().getTime(),
  };
};

module.exports = { generateMessage, generateLocationMessage };
