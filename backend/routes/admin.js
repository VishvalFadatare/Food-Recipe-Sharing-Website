const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const Recipe = require('../models/Recipe');
const User = require('../models/User');

// All routes here are protected by both auth and admin middleware
router.use(auth, admin);

// GET /api/admin/recipes
router.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('user', 'name email');
    res.json(recipes);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// DELETE /api/admin/recipes/:id
router.delete('/recipes/:id', async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Recipe removed by admin' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// POST /api/admin/add (This is a stub, same logic as register)
router.post('/add', async (req, res) => {
    // ... Implement same logic as /api/auth/register
    // but force set user.role = 'admin'
    res.json({ msg: 'Admin created' });
});

module.exports = router;