import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Unavbar from '../User/UnavBar';

const Newplan = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [nutritionForm, setNutritionForm] = useState({
    age: '',
    height: '',
    weight: '',
  });

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNutritionForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { age, height, weight } = nutritionForm;
    if (!age || !height || !weight) return;

    try {
      setIsLoading(true);

      const response = await axios.get('http://localhost:4000/suggest-nutrition', {
        params: { age, height, weight, activityLevel: '' },
      });

      const suggestedNutrition = response.data.suggestedNutrition;
      const user = JSON.parse(localStorage.getItem('user'));
      const postBody = {
        userId: user?.id,
        userName: user?.name,
        age,
        height,
        weight,
        suggestions: suggestedNutrition,
        bmi: response.data.bmi,
      };

      await axios.post(
        'http://localhost:4000/newplan',
        postBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Your diet plan is created');
      navigate('/suggested-nutrition');
    } catch (error) {
      console.error('Failed to fetch suggestions:', error);
      alert('Failed to generate suggestions.');
    } finally {
      setIsLoading(false);
      setNutritionForm({ age: '', height: '', weight: '' });
    }
  };

  return (
    <div className="bg-gradient-to-br from-pink-100 to-red-200 min-h-screen text-gray-800">
      <Unavbar />

      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Info Section */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-gray-800">Get Your Personalized Diet Plan</h2>
          <p className="text-lg text-gray-800">
            Fill in your age, height, and weight to receive a personalized diet plan tailored to your wellness goals.
            Our smart system uses science-backed recommendations to support your nutrition journey.
          </p>
          <p className="text-md text-gray-800">
            Make sure your information is accurate. Always consult a healthcare professional for medical advice.
          </p>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-8 space-y-6 text-black"
        >
          <div>
            <label htmlFor="age" className="block font-semibold mb-1">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              placeholder="Ex: 20"
              value={nutritionForm.age}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div>
            <label htmlFor="height" className="block font-semibold mb-1">
              Height (cm)
            </label>
            <input
              type="number"
              id="height"
              name="height"
              placeholder="Ex: 170"
              value={nutritionForm.height}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div>
            <label htmlFor="weight" className="block font-semibold mb-1">
              Weight (kg)
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              placeholder="Ex: 60"
              value={nutritionForm.weight}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#b21b46] text-white font-semibold rounded-full hover:bg-pink-700 transition"
          >
            {isLoading ? 'Generating Plan...' : 'Get Diet Suggestions'}
          </button>

          <div className="text-center">
            <Link to="/home" className="text-pink-600 hover:underline text-sm">
              ⬅ Back to Home
            </Link>
          </div>
        </form>
      </div>

      {/* Footer (Optional, matches Home.jsx style) */}
      <footer className="bg-black text-center py-6 mt-16">
        <p className="text-white text-sm">Need Help? Contact Us: NutriAssist@gmail.com | Call: 121-456-349</p>
        <p className="text-white text-xs mt-2">
          &copy; {new Date().getFullYear()} Nutri-Assist. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default Newplan;
