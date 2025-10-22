
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 shadow-inner mt-12">
      <div className="container mx-auto px-4 py-6 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} BukEvent. All rights reserved.</p>
        <p className="text-sm">Created with passion for great events.</p>
      </div>
    </footer>
  );
};

export default Footer;
