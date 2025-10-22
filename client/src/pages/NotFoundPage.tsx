
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full py-20 animate-fade-in-up">
      <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-pink">
        404
      </h1>
      <p className="text-2xl font-semibold text-white mt-4">Page Not Found</p>
      <p className="text-gray-400 mt-2">Sorry, the page you are looking for does not exist.</p>
      <Link
        to="/"
        className="mt-8 px-6 py-3 text-lg font-bold text-white bg-gradient-to-r from-brand-purple to-brand-pink rounded-lg shadow-lg hover:shadow-xl hover:shadow-purple-500/40 transform hover:scale-105 transition-all duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
