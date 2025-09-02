const express = require('express');
const router = express.Router();
const db = require('../db');

// Middleware to protect routes
function requireLogin(req, res, next) {
  if (!req.session.user) return res.redirect('/login.html');
  next();
}

// Profile Page
