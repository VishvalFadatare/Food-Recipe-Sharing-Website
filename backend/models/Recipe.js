const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  steps: [{ type: String, required: true }],
  prepTime: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Recipe', RecipeSchema);