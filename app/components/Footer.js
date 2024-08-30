'use  client';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <img src="/img/aws-logo.png" alt="BrandGen" width="100" height="100%" />
        </div>
        <div className="text-white text-sm flex flex-col items-end">
          <span>&copy; 2024 Nobody</span>
          <div>
            &nbsp;
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;