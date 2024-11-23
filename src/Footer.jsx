import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 ">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm">
          Made with <span className="text-red-500">♥</span> by{' '}
          <a
            href="https://mapur2.github.io/new_portfolio/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-500 transition-all"
          >
            Rupam
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
