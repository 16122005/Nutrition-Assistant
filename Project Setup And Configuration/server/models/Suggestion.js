const mongoose = require("mongoose");

const foodSchema =  mongoose.Schema({
    name: { type: String, required: true },
    grams: { type: String, required: true }
});

const suggestionSchema = new mongoose.Schema({

    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userName: { type: String },

    age: { type: Number, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    bmi: { type: String, required: true },

    suggestion: { type: String, required: true },
    timing: { type: String, required: true },
    walk: { type: String },

    foods: [foodSchema],
    calorieIntake: { type: Number, required: true },
    carbohydrateNeeds: { type: String },
    proteinNeeds: { type: String },

    weightGain: { type: Number, required: true },

    date: {
        type: String,
        default: () => new Date().toLocaleDateString('hi-IN')
    }
});

 const Suggestion = mongoose.model('Suggestion', suggestionSchema);

module.exports = Suggestion;