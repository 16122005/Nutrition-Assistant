import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Lnav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-white hover:text-pink-400">
            Nutri-Assist
          </Link>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Navigation Links */}
          <div className={`flex-col lg:flex lg:flex-row lg:items-center lg:space-x-6 ${isOpen ? 'flex' : 'hidden'} lg:static absolute top-16 left-0 w-full bg-black lg:bg-transparent z-50 lg:w-auto`}>
            <Link
              to="/login"
              className="px-3 py-2 text-white hover:text-pink-400 transition"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-3 py-2 text-white hover:text-pink-400 transition"
              onClick={() => setIsOpen(false)}
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Lnav;
