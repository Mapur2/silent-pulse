import React from 'react';

const Navbar = () => {
  return (
    <nav className="w-full backdrop-blur-lg bg-white/20 fixed top-0 z-50">
      <div className="container mx-auto flex flex-col justify-center items-center py-4">
        <h1 className="text-3xl font-bold text-white tracking-wide">
          SilentPulse
        </h1>
        <p className="text-white text-sm italic mt-1">
          Speak your mind, stay in the shadows.
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
