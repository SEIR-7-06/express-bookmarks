const express = require('express');
const router = express.Router();
const db = require('../models');

// current path '/users'

// GET New User Form
router.get('/new', (req, res) => {
  res.render('users/new');
});


// POST Handle New User Form Submission
router.post('/', (req, res) => {
  // Verify data
  console.log(req);
  // Query DB and create new user from data
  db.User.create(req.body, (err, newUser) => {
    // If error, console log it
    if (err) {
      console.log(err);
    }

    // Else redirect login page
    res.redirect('/users/login');
  });
});

// GET User Login Form
router.get('/login', (req, res) => {
  res.render('users/login');
});

router.post('/login', (req, res) => {
  console.log('================');
  console.log('Login Route');

  console.log(req.body);
  // Find the user by email
  db.User.findOne({email: req.body.email}, (err, foundUser) => {
    if (err) {
      console.log(err);
    }

    if (!foundUser) {
      return res.render('users/login');
    }

    // Verify the submitted password matches the foundUser.password
    if (foundUser.password === req.body.password) {
      return res.redirect('/users/profile');
    }

    res.render('users/login');
  });
});

module.exports = router;
