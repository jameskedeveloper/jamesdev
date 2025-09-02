// db.js
const fs = require('fs');
const path = require('path');

const usersPath = path.join(__dirname, 'data', 'users.json');
const visitorsPath = path.join(__dirname, 'data', 'visitors.json');

// Ensure files exist
if (!fs.existsSync(usersPath)) fs.writeFileSync(usersPath, '[]');
if (!fs.existsSync(visitorsPath)) fs.writeFileSync(visitorsPath, '[]');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = {
  getUsers: () => readJson(usersPath),
  saveUsers: (data) => writeJson(usersPath, data),
  getVisitors: () => readJson(visitorsPath),
  saveVisitors: (data) => writeJson(visitorsPath, data)
};