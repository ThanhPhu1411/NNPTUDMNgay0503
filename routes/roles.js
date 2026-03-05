const express = require('express');
const router = express.Router();
const { dataRole } = require('../utils/data2');

// Mock data (copy từ dataRole)
let roles = [...dataRole];

// Get all roles
router.get('/', (req, res) => {
  res.json(roles);
});

// Get role by ID
router.get('/:id', (req, res) => {
  const role = roles.find(r => r.id === req.params.id);
  if (!role) return res.status(404).send('Role not found');
  res.json(role);
});

// Create a new role
router.post('/', (req, res) => {
  const newRole = {
    id: `r${roles.length + 1}`,
    name: req.body.name,
    description: req.body.description,
    creationAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  roles.push(newRole);
  res.status(201).json(newRole);
});

// Update a role
router.put('/:id', (req, res) => {
  const role = roles.find(r => r.id === req.params.id);
  if (!role) return res.status(404).send('Role not found');

  role.name = req.body.name || role.name;
  role.description = req.body.description || role.description;
  role.updatedAt = new Date().toISOString();
  res.json(role);
});

// Delete a role
router.delete('/:id', (req, res) => {
  const roleIndex = roles.findIndex(r => r.id === req.params.id);
  if (roleIndex === -1) return res.status(404).send('Role not found');

  const deletedRole = roles.splice(roleIndex, 1);
  res.json(deletedRole);
});

// Get all users in a role
router.get('/:id/users', (req, res) => {
  const { dataUser } = require('../utils/data2');
  const role = roles.find(r => r.id === req.params.id);
  if (!role) return res.status(404).send('Role not found');

  const usersInRole = dataUser.filter(user => user.role.id === req.params.id);
  res.json(usersInRole);
});

module.exports = router;