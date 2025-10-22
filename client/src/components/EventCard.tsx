
import React from 'react';
import { Link } from 'react-router-dom';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const availableSeats = event.totalSeats - event.bookedSeats;
  const isSoldOut = availableSeats <= 0;

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 transform hover:-translate-y-2 transition-all duration-300 animate-fade-in-up">
      <Link to={`/events/${event._id}`}>
        <img className="w-full h-48 object-cover" src={event.imageUrl} alt={event.name} />
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">{event.name}</h3>
          <p className="text-gray-400 text-sm mb-2">{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p className="text-gray-400 text-sm mb-4">{event.location}</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-white">${event.price}</span>
            {isSoldOut ? (
              <span className="px-3 py-1 text-xs font-semibold text-white bg-red-600 rounded-full">Sold Out</span>
            ) : (
              <span className="px-3 py-1 text-xs font-semibold text-white bg-green-600 rounded-full">{availableSeats} left</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
