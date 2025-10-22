
import React from 'react';
import { Link } from 'react-router-dom';
import { useEvents } from '../contexts/EventContext';
import EventCard from '../components/EventCard';
import Spinner from '../components/Spinner';

const HomePage: React.FC = () => {
  const { events, loading } = useEvents();

  return (
    <div className="space-y-16">
      <section className="text-center py-20 animate-fade-in-up">
        <div className="relative inline-block">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter">
            Experience Events
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-pink mt-2">
              Like Never Before.
            </span>
          </h1>
          <div className="absolute -top-4 -left-4 w-16 h-16 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        </div>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-300">
          Discover, book, and manage your tickets for the most exciting events happening around you. Your next great experience is just a click away.
        </p>
        <div className="mt-8">
          <Link
            to="/events"
            className="inline-block bg-gradient-to-r from-brand-purple to-brand-pink text-white font-bold text-lg py-4 px-10 rounded-full shadow-lg hover:shadow-xl hover:shadow-purple-500/40 transform hover:scale-105 transition-all duration-300 animate-glow"
          >
            Browse Events
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Upcoming Events</h2>
        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.slice(0, 3).map(event => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
