const suggestNutrition = (age, height, weight, activityLevel) => {
  const calculate = (foods, suggestion, walk, timing, carb, protein, fat, weightGain = 0) => {
    const calorieIntake = 25 * weight;
    const caloriesToBurn = calorieIntake + (weightGain * 7000) / 7;
    return {
      suggestion,
      timing,
      foods,
      walk,
      calorieIntake,
      weightGain,
      carbohydrateNeeds: carb,
      proteinNeeds: protein,
      fatPercentage: fat,
      caloriesToBurn
    };
  };

  if (age >= 0 && age <= 12) {
    return weight < height - 100
      ? calculate(
          [
            { name: "Bananas", grams: "100g" },
            { name: "Carrots", grams: "50g" },
            { name: "Oats", grams: "30g" },
            { name: "Chicken breast", grams: "100g" },
            { name: "Greek yogurt", grams: "150g" },
          ],
          "Increase calorie intake with a balanced diet including fruits, vegetables, whole grains, lean proteins, and dairy or dairy alternatives.",
          "1-2km",
          "3 meals and 2 snacks",
          "130-210g",
          "13-34g",
          "30-40%",
          (height - 100) - weight
        )
      : calculate(
          [
            { name: "Apples", grams: "100g" },
            { name: "Broccoli", grams: "100g" },
            { name: "Brown rice", grams: "50g" },
            { name: "Fish", grams: "100g" },
            { name: "Milk", grams: "200ml" },
          ],
          "Maintain a balanced diet with appropriate portion sizes...",
          "2-3km",
          "3 meals and 2 snacks",
          "130-210g",
          "13-34g",
          "30-40%"
        );
  }

  if (age >= 13 && age <= 18) {
    return weight < height - 100
      ? calculate(
          [
            { name: "Berries", grams: "100g" },
            { name: "Spinach", grams: "100g" },
            { name: "Quinoa", grams: "50g" },
            { name: "Turkey", grams: "100g" },
            { name: "Cottage cheese", grams: "150g" },
          ],
          "Increase calorie intake to support growth and development...",
          "2-3km",
          "3 meals and 2-3 snacks",
          "130-210g",
          "45-75g",
          "25-35%",
          (height - 100) - weight
        )
      : calculate(
          [
            { name: "Oranges", grams: "100g" },
            { name: "Bell peppers", grams: "100g" },
            { name: "Whole wheat bread", grams: "50g" },
            { name: "Eggs", grams: "2 large" },
            { name: "Cheese", grams: "30g" },
          ],
          "Maintain a balanced diet with appropriate portion sizes...",
          "2-3.5km",
          "3 meals and 2-3 snacks",
          "130-210g",
          "45-75g",
          "25-35%"
        );
  }

  // Adults 18+
  return weight < height - 100
    ? calculate(
        [
          { name: "Avocados", grams: "50g" },
          { name: "Kale", grams: "100g" },
          { name: "Quinoa", grams: "50g" },
          { name: "Salmon", grams: "100g" },
          { name: "Olive oil", grams: "15ml" },
        ],
        "Increase calorie intake with a balanced diet...",
        "3-4km",
        "3 meals and 2 snacks",
        "130-210g",
        "46-56g",
        "20-35%",
        (height - 100) - weight
      )
    : weight > height - 100
    ? calculate(
        [
          { name: "Grapefruits", grams: "150g" },
          { name: "Cauliflower", grams: "100g" },
          { name: "Lentils", grams: "100g" },
          { name: "Skinless chicken breast", grams: "100g" },
          { name: "Almonds", grams: "30g" },
        ],
        "Focus on portion control and regular exercise...",
        "3-4km",
        "3 meals and 2 snacks",
        "130-210g",
        "46-56g",
        "20-35%"
      )
    : calculate(
        [
          { name: "Strawberries", grams: "100g" },
          { name: "Asparagus", grams: "100g" },
          { name: "Quinoa", grams: "50g" },
          { name: "Lean beef", grams: "100g" },
          { name: "Greek yogurt", grams: "150g" },
        ],
        "Maintain a balanced diet with regular exercise.",
        "4-5km",
        "3 meals and 2 snacks",
        "130-210g",
        "46-56g",
        "20-35%"
      );
};

module.exports = {
  suggestNutrition
}