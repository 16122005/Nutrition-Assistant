import { useNavigate } from 'react-router-dom';
import Unavbar from '../pages/User/UnavBar';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-red-200 text-gray-800 flex flex-col">
      <Unavbar />

      <div className="py-12 px-6 text-center">
        <h1 className="text-5xl font-bold text-[#b21b46] mb-4">Welcome to Nutrition Assistant 🍎</h1>
        <p className="text-lg max-w-3xl mx-auto text-gray-700">
          Your journey to better health begins here. Whether you're looking to maintain a balanced diet, support growth and development, or manage your weight, our assistant is ready to provide you with expert guidance tailored to your lifestyle.
        </p>
        <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-700">
          Click on the button below and answer a few questions about your age, height, and weight to get a personalized diet plan.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 px-6 mt-4">
        <img
          src="https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.webp?b=1&s=170667a&w=0&k=20&c=RKgGJW8aIINIPpisynZ2x6UWFiMZ0afmEN32gmbYvVI="
          alt="Healthy food"
          className="w-80 rounded-3xl shadow-xl transition-transform duration-300 hover:scale-105"
        />
        <img
          src="https://blogs.biomedcentral.com/on-medicine/wp-content/uploads/sites/6/2019/09/iStock-1131794876.t5d482e40.m800.xtDADj9SvTVFjzuNeGuNUUGY4tm5d6UGU5tkKM0s3iPk-620x342.jpg"
          alt="Nutrition"
          className="w-80 rounded-3xl shadow-xl transition-transform duration-300 hover:scale-105"
        />
        <img
          src="https://media6.ppl-media.com/mediafiles/blogs/fruits_4979fd4202.jpg"
          alt="Fruits"
          className="w-80 rounded-3xl shadow-xl transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="mt-10 flex justify-center">
        <button
          onClick={() => navigate('/suggestion')}
          className="bg-[#b21b46] text-white font-semibold py-3 px-8 rounded-full hover:bg-[#a1183f] transition duration-300 shadow-md"
        >
          Get Diet Plan
        </button>
      </div>

      <footer className="bg-[#222] text-gray-300 mt-20 py-8 text-center">
        <div className="space-y-2">
          <button
            id="bt"
            className="text-blue-400 hover:underline text-sm"
          >
            Contact Us
          </button>
          <p className="text-sm">It is a platform where you feel healthy.</p>
          <p className="text-sm">Call: <span className="text-white">121-456-349</span></p>
          <p className="text-sm">Email: <span className="text-white">NutriAssist@gmail.com</span></p>
          <p className="text-xs mt-2 text-gray-400">
            &copy; {new Date().getFullYear()} Nutri-Assist. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
