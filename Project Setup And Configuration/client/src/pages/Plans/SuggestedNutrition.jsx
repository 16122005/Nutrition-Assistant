import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import Unavbar from '../User/UnavBar';

const SuggestedNutrition = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    // Parse user object safely
    const user = userStr ? JSON.parse(userStr) : null;

    if (user && user.id && token) {
      axios.get(`http://localhost:4000/getsuggestion/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setSuggestions(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching suggestions:', error);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const deleteData = async (taskId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this plan?');
    if (!confirmDelete) return;

    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:4000/suggestion/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Plan deleted successfully');
      setSuggestions((prev) => prev.filter((s) => s._id !== taskId));
    } catch (error) {
      if (error.response?.status === 403) {
        alert("Forbidden: You do not have permission to delete this.");
      } else {
        console.error("Failed to delete plan:", error);
        alert("Failed to delete plan. Check console for details.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-red-200 text-gray-800">
      <Unavbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-[#b21b46] text-center mb-10">Diet Suggestions</h1>

        {isLoading ? (
          <p className="text-center text-lg font-medium">Loading...</p>
        ) : suggestions.length === 0 ? (
          <p className="text-center text-lg font-medium">No suggestions available.</p>
        ) : (
          <div className="space-y-6">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion._id}
                className="bg-[#b21b46] rounded-xl shadow-lg overflow-hidden"
              >
                <div className="bg-black text-white flex items-center justify-between px-6 py-4">
                  <div className="space-x-8 flex flex-wrap text-sm sm:text-base">
                    <p><span className="font-semibold">Age:</span> {suggestion.age}</p>
                    <p><span className="font-semibold">Height:</span> {suggestion.height}</p>
                    <p><span className="font-semibold">Weight:</span> {suggestion.weight}</p>
                  </div>
                  <button
                    onClick={() => deleteData(suggestion._id)}
                    className="text-red-500 hover:text-red-700 text-xl"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
                <div className="px-6 py-4 space-y-2 text-white">
                  <p><span className="font-semibold">Timing:</span> {suggestion.timing}</p>
                  <p><span className="font-semibold">Calorie Intake:</span> {suggestion.calorieIntake}</p>
                  <p><span className="font-semibold">Walk:</span> {suggestion.walk}</p>
                  <p><span className="font-semibold">Carbohydrate Needs:</span> {suggestion.carbohydrateNeeds}</p>
                  <p><span className="font-semibold">Protein Needs:</span> {suggestion.proteinNeeds}</p>
                  <p><span className="font-semibold">BMI:</span> {suggestion.bmi}</p>
                  <div className="bg-black text-white rounded-md p-4 mt-4">
                    <h3 className="font-bold">Suggestion:</h3>
                    <p>{suggestion.suggestion}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SuggestedNutrition;