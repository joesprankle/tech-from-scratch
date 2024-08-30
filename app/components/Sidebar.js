'use client';
import Link from 'next/link';

const Sidebar = ({ links, onLinkClick, selectedLinkIndex }) => {
  return (
    <div className="bg-gray-900 text-white w-64 space-y-6 py-7 px-2">
      <img src="/img/bandgen-logo.png" alt="Logo" width="330" height="170" />
      <nav>
        {links.map((link, index) => (
          <button
            key={index}
            className={`block py-2.5 px-4 rounded transition duration-200 ${
              index === selectedLinkIndex ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 hover:text-white'
            }`}
            onClick={() => onLinkClick(index)}
          >
            {link.linkname}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
