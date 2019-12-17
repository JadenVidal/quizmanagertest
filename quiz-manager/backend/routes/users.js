const router = require('express').Router();
let User = require('../models/user.model');

//get all users
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

//get single user by id
router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

//get user by username + password
router.route('/:username/:password').get((req, res) => {
    User.findOne({"username": req.params.username, "password": req.params.password})
      .then(user => res.json(user), console.log("GOOD"))
      .catch(err => res.status(400).json('Error: ' + err), console.log("BAD"));
  });

//add user
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const key = req.body.key;

  const newUser = new User({username, password, key});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;