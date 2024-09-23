const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Initialize SQLite database
const db = new sqlite3.Database('./database.db');

// Create tables
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        description TEXT NOT NULL,
        amount REAL NOT NULL,
        type TEXT NOT NULL,
        FOREIGN KEY (username) REFERENCES users(username)
    )`);
});

// Add a new user
app.post('/api/user', (req, res) => {
    const { username } = req.body;

    db.run('INSERT INTO users (username) VALUES (?)', [username], function(err) {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true });
    });
});

// Add a new transaction
app.post('/api/transaction', (req, res) => {
    const { username, description, amount, type } = req.body;

    db.run('INSERT INTO transactions (username, description, amount, type) VALUES (?, ?, ?, ?)',
        [username, description, amount, type],
        function(err) {
            if (err) {
                return res.status(500).json({ success: false, error: err.message });
            }
            res.json({ success: true });
        });
});

// Get all transactions for a user
app.get('/api/transactions', (req, res) => {
    const { username } = req.query;

    db.all('SELECT * FROM transactions WHERE username = ?', [username], (err, rows) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json(rows);
    });
});

// Get the balance for a user
app.get('/api/balance', (req, res) => {
    const { username } = req.query;

    db.get('SELECT SUM(amount) AS balance FROM transactions WHERE username = ?', [username], (err, row) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json(row.balance || 0);
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
