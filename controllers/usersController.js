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
      return res.redirect(`/users/${foundUser._id}`);
    }

    res.render('users/login');
  });
});

// GET User Profile
router.get('/:id', (req, res) => {
  console.log(`User id = ${req.params.id}`);

  db.User.findById(req.params.id)
    .populate('bookmarks')
    .exec((err, foundUser) => {
      if (err) {
        console.log(err);
      }
  
      const context = {
        user: foundUser,
        tempBookmarks: [
          {title: 'Bookmark One'},
          {title: 'Bookmark Two'},
        ]
      };
  
      res.render('users/profile', context);
    })
});

// GET New User Bookmark Form
router.get('/:id/bookmarks/new', (req, res) => {
  const context = {
    userId: req.params.id
  };

  res.render('users/newBookmark', context);
});

// POST Handle the New User Bookmark Form Submission
router.post('/:userId/bookmarks', (req, res) => {
  // Create a new Bookmark
  db.Bookmark.create(req.body, (err, newBookmark) => {
    if (err) {
      console.log(err);
    }

    // Find the user by id and update bookmarks
    db.User.findById(req.params.userId, (err, foundUser) => {
      if (err) {
        console.log(err);
      }

      // Update the foundUsers bookmarks array
      foundUser.bookmarks.push(newBookmark);

      foundUser.save((err, savedUser) => {
        if (err) {
          console.log(err);
        }

        // res.redirect(`/users/${savedUser._id}`);
        res.redirect(`/users/${savedUser._id}`);
      });
    });
  });
});

router.get('/test', (req, res) => {
  res.send('Got it!);
});

module.exports = router;
