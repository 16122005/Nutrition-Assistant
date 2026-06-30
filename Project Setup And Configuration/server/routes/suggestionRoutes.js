const express = require("express");
const { getSuggestedNutrition, saveNewSuggestion, getSuggestionsByUser, getAllSuggestions, deleteSuggestion } = require("../controllers/suggestionController.js");
const { protect, isAdmin } = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.get('/suggest-nutrition', getSuggestedNutrition);
router.post('/newplan',protect,saveNewSuggestion);
router.get('/getsuggestion/:userId',protect,getSuggestionsByUser);
router.get('/suggestions',protect,isAdmin ,getAllSuggestions);
router.delete('/suggestion/:id',protect, isAdmin ,deleteSuggestion);

module.exports = router;