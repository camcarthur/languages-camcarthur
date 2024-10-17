// routes/notes.js
const express = require('express');
const router = express.Router();
const Note = require('../models/note');

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
  if (req.session.user) return next();
  req.flash('error_msg', 'Please log in to view this resource');
  res.redirect('/login');
}

// Show all notes
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const notes = await Note.getAllByUserId(req.session.user.id);
    res.render('notes', { notes });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// Add a new note
router.post('/add', isAuthenticated, async (req, res) => {
  const { content } = req.body;
  try {
    await Note.create(req.session.user.id, content);
    res.redirect('/notes');
  } catch (err) {
    console.error(err);
    res.redirect('/notes');
  }
});

// Delete a note
router.post('/delete/:id', isAuthenticated, async (req, res) => {
  const noteId = req.params.id;
  try {
    await Note.delete(noteId, req.session.user.id);
    res.redirect('/notes');
  } catch (err) {
    console.error(err);
    res.redirect('/notes');
  }
});

module.exports = router;
