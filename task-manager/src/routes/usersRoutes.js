const express = require('express');
const router = new express.Router();

router.post('/users', (req, res) => {
  // const user = req.body;
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.status(201).send(user);
    })
    .catch((err) => {
      res.status(400).send(err);
    });

  console.log(user);
});

module.exports = router;
