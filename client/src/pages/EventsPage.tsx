
import React from 'react';
import { useEvents } from '../contexts/EventContext';
import EventCard from '../components/EventCard';
import Spinner from '../components/Spinner';

const EventsPage: React.FC = () => {
  const { events, loading } = useEvents();

  return (
    <div className="animate-fade-in-up">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-white tracking-tight">All Events</h1>
      <div className="mb-8 p-4 bg-gray-800/50 rounded-lg">
        <p className="text-center text-gray-300">
          {/* TODO: Implement search and filter functionality */}
          Search and filter controls will be implemented here. (Low priority requirement FR-8)
        </p>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {events.map(event => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsPage;
