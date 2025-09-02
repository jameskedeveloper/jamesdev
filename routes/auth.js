const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db');

// Session check
router.get('/session', (req, res) => {
  res.json({ user: req.session.user || null });
});

// Login with auto-register if user not found
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  let users = db.getUsers();
  let user = users.find(u => u.username === username);

  // Auto-create new user if not found
  if (!user) {
    const hashed = await bcrypt.hash(password, 10);
    user = {
      id: Date.now(),
      username,
      password: hashed,
      is_admin: false,
      is_blocked: false
    };
    users.push(user);
    db.saveUsers(users);
  }

  if (user.is_blocked) return res.send('Blocked by admin');

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.send('Wrong password');

  req.session.user = {
    id: user.id,
    username: user.username,
    is_admin: user.is_admin
  };

  res.redirect('/dashboard.html');
});

module.exports = router;