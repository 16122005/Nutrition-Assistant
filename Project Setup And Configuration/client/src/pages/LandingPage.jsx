import { Link } from 'react-router-dom';
import { FaAppleAlt, FaHeartbeat, FaLeaf } from 'react-icons/fa';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-red-200 flex flex-col items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-2xl w-full text-center animate-fade-in">
        <div className="mb-6 flex justify-center text-green-600 text-5xl">
          <FaAppleAlt />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to <span className="text-green-600">Nutri-Assist</span></h1>
        <p className="text-lg text-gray-600 mb-6">
          Your personalized nutrition planner. Get expert diet suggestions based on your age, weight, goals, and more!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-gray-700">
          <div className="flex items-center justify-center space-x-2">
            <FaLeaf className="text-green-500" />
            <span>Healthy Diets</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <FaHeartbeat className="text-pink-500" />
            <span>Fitness Tracking</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <FaAppleAlt className="text-red-400" />
            <span>Meal Planning</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Link
            to="/login"
            className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition duration-200"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-3 bg-[#b21b46] text-white rounded-full transition duration-200"
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
