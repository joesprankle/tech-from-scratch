'use  client';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white">
      <img src="/img/mainnerve-logo.png" alt="Logo" width="320" height="160" />
      </div>
      <div className="relative">
        <input
          type="text"
          className="pl-3 pr-10 py-2 rounded-lg text-sm bg-gray-700 text-white placeholder-gray-400"
          placeholder="Search for..."
        />
        <button className="absolute right-0 top-0 mt-2 mr-3">
          <i className="fas fa-search text-white"></i>
        </button>
      </div>
      <div>
        <button className="text-white">
          <i className="fas fa-user fa-fw"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;