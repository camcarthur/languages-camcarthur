// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

// Show registration form
router.get('/register', (req, res) => {
  res.render('register');
});

// Handle registration
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userExists = await User.findByUsername(username);
    if (userExists) {
      req.flash('error_msg', 'Username already exists.');
      return res.redirect('/register');
    }
    await User.create(username, password);
    req.flash('success_msg', 'You are now registered and can log in.');
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.redirect('/register');
  }
});

// Show login form
router.get('/login', (req, res) => {
  res.render('login');
});

// Handle login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findByUsername(username);
    if (!user) {
      req.flash('error_msg', 'Invalid credentials.');
      return res.redirect('/login');
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      req.session.user = user;
      res.redirect('/notes');
    } else {
      req.flash('error_msg', 'Invalid credentials.');
      res.redirect('/login');
    }
  } catch (err) {
    console.error(err);
    res.redirect('/login');
  }
});

// Handle logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

// Home route
router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
