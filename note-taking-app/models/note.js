// models/note.js
const pool = require('./db');

const Note = {
  create: async (user_id, content) => {
    const res = await pool.query(
      'INSERT INTO notes (user_id, content) VALUES ($1, $2) RETURNING *',
      [user_id, content]
    );
    return res.rows[0];
  },
  getAllByUserId: async (user_id) => {
    const res = await pool.query('SELECT * FROM notes WHERE user_id = $1', [
      user_id,
    ]);
    return res.rows;
  },
  delete: async (note_id, user_id) => {
    await pool.query('DELETE FROM notes WHERE id = $1 AND user_id = $2', [
      note_id,
      user_id,
    ]);
  },
};

module.exports = Note;
