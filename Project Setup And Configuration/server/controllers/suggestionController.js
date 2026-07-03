const Suggestion = require("../models/Suggestion.js");
const {suggestNutrition} = require("../utils/suggestNutrition.js");

 const getSuggestedNutrition = (req, res) => {
  const { age, height, weight, activityLevel } = req.query;
  const parsedAge = parseInt(age);
  const parsedHeight = parseInt(height);
  const parsedWeight = parseInt(weight);

  if (isNaN(parsedAge) || isNaN(parsedHeight) || isNaN(parsedWeight)) {
    return res.status(400).json({ error: 'Invalid input. Age, height, and weight must be numbers.' });
  }

  const suggestion = suggestNutrition(parsedAge, parsedHeight, parsedWeight, activityLevel);
  const bmi = (parsedWeight / ((parsedHeight / 100) ** 2)).toFixed(2);

  res.json({ suggestedNutrition: suggestion, bmi });
};


 const saveNewSuggestion = async (req, res) => {
  try {
    const { userId, age, height, weight, suggestions, bmi, userName } = req.body;
    const {
      suggestion, timing, foods, calorieIntake, walk,
      weightGain, carbohydrateNeeds, proteinNeeds
    } = suggestions;

    const newSuggestion = new Suggestion({
      userId,
      userName,
      age,
      height,
      weight,
      suggestion,
      timing,
      foods,
      bmi,
      walk,
      calorieIntake,
      weightGain,
      carbohydrateNeeds,
      proteinNeeds,
      date: new Date().toLocaleDateString('hi-IN')
    });

    const saved = await newSuggestion.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error saving suggestion:', err);
    res.status(500).json({ message: 'Failed to save suggestion' });
  }
};

 const getSuggestionsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const suggestions = await Suggestion.find({ userId }).sort('-date');
    res.json(suggestions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch suggestions' });
  }
};

 const getAllSuggestions = async (req, res) => {
  try {
    const suggestions = await Suggestion.find().populate("userId", "username email"); 
    res.status(200).json(suggestions);
  } catch (error) {
    console.error("Error fetching all suggestions:", error);
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
};

 const deleteSuggestion = async (req, res) => {
    try {
        const suggestion = await Suggestion.findById(req.params.id);

        if (!suggestion) {
            return res.status(404).json({ message: "Suggestion not found" });
        }

        // Logic: Allow if the user IS an admin OR if the userId of the 
        // suggestion matches the ID of the user who is logged in (req.user.id)
        if (req.user.isAdmin || suggestion.userId.toString() === req.user.id.toString()) {
            await Suggestion.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "Deleted successfully" });
        } else {
            // This prevents the Forbidden error if they own their own data
            res.status(403).json({ message: "You do not have permission to delete this." });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = {
  getSuggestedNutrition,
  saveNewSuggestion,
  getSuggestionsByUser,
  getAllSuggestions,
  deleteSuggestion
}