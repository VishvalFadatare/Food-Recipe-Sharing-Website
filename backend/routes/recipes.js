// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const auth = require('../middleware/authMiddleware');
// const Recipe = require('../models/Recipe');
// const path = require('path');
// const fs = require('fs');

// // --- Multer Config ---
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const dir = 'uploads/';
//     if (!fs.existsSync(dir)) {
//         fs.mkdirSync(dir);
//     }
//     cb(null, dir);
//   },
//   filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
// });
// const upload = multer({ storage: storage });
// // --------------------

// // POST /api/recipes (Add recipe)
// router.post('/', [auth, upload.single('image')], async (req, res) => {
//   const { name, ingredients, steps, prepTime, category } = req.body;
  
//   if (!req.file) {
//     return res.status(400).json({ msg: 'Please upload an image' });
//   }

//   try {
//     const newRecipe = new Recipe({
//       user: req.user.id,
//       name,
//       ingredients: ingredients.split(',').map(item => item.trim()),
//       steps: steps.split('.').map(item => item.trim()).filter(s => s.length > 0),
//       prepTime,
//       category,
//       imageUrl: `/uploads/${req.file.filename}`
//     });

//     const recipe = await newRecipe.save();
//     res.json(recipe);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// // GET /api/recipes (All recipes + Search/Filter)
// router.get('/', async (req, res) => {
//   const { search, category } = req.query;
//   try {
//     let query = {};
//     if (search) {
//       query.$or = [
//         { name: { $regex: search, $options: 'i' } },
//         { ingredients: { $regex: search, $options: 'i' } }
//       ];
//     }
//     if (category) {
//       query.category = category;
//     }
//     const recipes = await Recipe.find(query).populate('user', 'name');
//     res.json(recipes);
//   } catch (err) {
//     res.status(500).send('Server Error');
//   }
// });

// // GET /api/recipes/my-recipes
// router.get('/my-recipes', auth, async (req, res) => {
//   try {
//     const recipes = await Recipe.find({ user: req.user.id });
//     res.json(recipes);
//   } catch (err) {
//     res.status(500).send('Server Error');
//   }
// });

// // GET /api/recipes/:id
// router.get('/:id', async (req, res) => {
//   try {
//     const recipe = await Recipe.findById(req.params.id).populate('user', 'name');
//     if (!recipe) return res.status(404).json({ msg: 'Recipe not found' });
//     res.json(recipe);
//   } catch (err) {
//     res.status(500).send('Server Error');
//   }
// });

// // DELETE /api/recipes/:id
// router.delete('/:id', auth, async (req, res) => {
//   try {
//     let recipe = await Recipe.findById(req.params.id);
//     if (!recipe) return res.status(404).json({ msg: 'Recipe not found' });

//     if (recipe.user.toString() !== req.user.id) {
//       return res.status(401).json({ msg: 'Not authorized' });
//     }
    
//     // Add logic to delete image file
//     const imagePath = path.join(__dirname, '..', recipe.imageUrl);
//     if (fs.existsSync(imagePath)) {
//         fs.unlinkSync(imagePath);
//     }
    
//     await Recipe.findByIdAndDelete(req.params.id);
//     res.json({ msg: 'Recipe removed' });
//   } catch (err) {
//     res.status(500).send('Server Error');
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/authMiddleware');
const Recipe = require('../models/Recipe');
const path = require('path');
const fs = require('fs');

// --- Multer Config ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage: storage });
// --------------------

// POST /api/recipes (Add recipe)
router.post('/', [auth, upload.single('image')], async (req, res) => {
  const { name, ingredients, steps, prepTime, category } = req.body;
  
  if (!req.file) {
    return res.status(400).json({ msg: 'Please upload an image' });
  }

  try {
    const newRecipe = new Recipe({
      user: req.user.id,
      name,
      ingredients: ingredients.split(',').map(item => item.trim()),
      steps: steps.split('.').map(item => item.trim()).filter(s => s.length > 0),
      prepTime,
      category,
      imageUrl: `/uploads/${req.file.filename}`
    });

    const recipe = await newRecipe.save();
    res.json(recipe);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET /api/recipes (All recipes + Search/Filter)
router.get('/', async (req, res) => {
  const { search, category } = req.query;
  try {
    let query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { ingredients: { $regex: search, $options: 'i' } }
      ];
    }
    if (category) {
      query.category = category;
    }
    const recipes = await Recipe.find(query).populate('user', 'name');
    res.json(recipes);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// GET /api/recipes/my-recipes
router.get('/my-recipes', auth, async (req, res) => {
  try {
    const recipes = await Recipe.find({ user: req.user.id });
    res.json(recipes);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// GET /api/recipes/:id
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('user', 'name');
    if (!recipe) return res.status(404).json({ msg: 'Recipe not found' });
    res.json(recipe);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// *** NEWLY ADDED ***
// PUT /api/recipes/:id (Update recipe)
router.put('/:id', [auth, upload.single('image')], async (req, res) => {
  const { name, ingredients, steps, prepTime, category } = req.body;
  
  try {
    let recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ msg: 'Recipe not found' });

    // Check if user owns the recipe
    if (recipe.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Build the updated recipe object
    const updatedFields = {
      name,
      ingredients: ingredients.split(',').map(item => item.trim()),
      steps: steps.split('.').map(item => item.trim()).filter(s => s.length > 0),
      prepTime,
      category,
    };

    // If a new image is uploaded, update the imageUrl
    if (req.file) {
      // TODO: Delete the old image from /uploads
      updatedFields.imageUrl = `/uploads/${req.file.filename}`;
    }

    // Find and update the recipe
    recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields },
      { new: true } // Return the modified document
    );

    res.json(recipe);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// DELETE /api/recipes/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    let recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ msg: 'Recipe not found' });

    if (recipe.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    // Add logic to delete image file
    const imagePath = path.join(__dirname, '..', recipe.imageUrl);
    if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
    }
    
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Recipe removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;