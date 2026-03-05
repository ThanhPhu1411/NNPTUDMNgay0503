const express = require('express');
const router = express.Router();
const { dataUser } = require('../utils/data2');

// Mock data (copy từ dataUser)
let users = [...dataUser];

// Get all users
router.get('/', (req, res) => {
  res.json(users);
});

// Get user by username
router.get('/:username', (req, res) => {
  const user = users.find(u => u.username === req.params.username);
  if (!user) return res.status(404).send('User not found');
  res.json(user);
});

// Create a new user
router.post('/', (req, res) => {
  const newUser = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    fullName: req.body.fullName,
    avatarUrl: req.body.avatarUrl || '',
    status: req.body.status || true,
    loginCount: 0,
    role: req.body.role,
    creationAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Update a user
router.put('/:username', (req, res) => {
  const user = users.find(u => u.username === req.params.username);
  if (!user) return res.status(404).send('User not found');

  user.password = req.body.password || user.password;
  user.email = req.body.email || user.email;
  user.fullName = req.body.fullName || user.fullName;
  user.avatarUrl = req.body.avatarUrl || user.avatarUrl;
  user.status = req.body.status !== undefined ? req.body.status : user.status;
  user.role = req.body.role || user.role;
  user.updatedAt = new Date().toISOString();
  res.json(user);
});

// Delete a user
router.delete('/:username', (req, res) => {
  const userIndex = users.findIndex(u => u.username === req.params.username);
  if (userIndex === -1) return res.status(404).send('User not found');

  const deletedUser = users.splice(userIndex, 1);
  res.json(deletedUser);
});

module.exports = router;