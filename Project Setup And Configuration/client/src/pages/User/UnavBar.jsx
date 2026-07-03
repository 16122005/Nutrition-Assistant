import { Link } from 'react-router-dom';

const Unavbar = () => {
  const get = localStorage.getItem('user');
  const user = get ? JSON.parse(get) : null;

  return (
    <nav className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 text-xl font-bold">
            <Link to="/" className="text-white no-underline hover:text-pink-400">Nutri-Assist</Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/home" className="text-white hover:text-pink-400 transition">Home</Link>
            <Link to="/suggestion" className="text-white hover:text-pink-400 transition">New Plan</Link>
            <Link to="/suggested-nutrition" className="text-white hover:text-pink-400 transition">My Diet Plan</Link>
            <Link to="/login" className="text-white hover:text-red-400 transition">Logout</Link>
            {user && (
              <span className="text-sm text-gray-300 ml-2">( {user.name} )</span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Unavbar;
