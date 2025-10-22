
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEvents } from '../contexts/EventContext';
import { useAuth } from '../contexts/AuthContext';
import { Event } from '../types';
import Spinner from '../components/Spinner';

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { fetchEventById } = useEvents();
  const { user } = useAuth();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEvent = async () => {
      if (id) {
        const fetchedEvent = await fetchEventById(id);
        if (fetchedEvent) {
          setEvent(fetchedEvent);
        }
        setLoading(false);
      }
    };
    getEvent();
  }, [id, fetchEventById]);

  const handleBookTicket = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!event) return;

    // TODO: API Integration - POST /api/bookings
    // const response = await fetch('/api/bookings', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   },
    //   body: JSON.stringify({ eventId: event._id })
    // });
    // if (response.ok) {
    //   alert('Booking successful!');
    //   navigate('/profile');
    // } else {
    //   alert('Booking failed. The event might be sold out or an error occurred.');
    // }

    // Placeholder Logic
    alert(`Successfully booked a ticket for ${event.name}!`);
    navigate('/profile');
  };

  if (loading) return <Spinner />;
  if (!event) return <div className="text-center text-2xl text-red-500">Event not found.</div>;

  const availableSeats = event.totalSeats - event.bookedSeats;
  const isSoldOut = availableSeats <= 0;

  return (
    <div className="bg-gray-800 rounded-xl shadow-2xl shadow-purple-900/30 overflow-hidden p-4 md:p-8 animate-fade-in-up">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img className="h-64 w-full object-cover md:w-64 rounded-lg" src={event.imageUrl} alt={event.name} />
        </div>
        <div className="mt-4 md:mt-0 md:ml-6 text-white w-full">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">{event.name}</h1>
          <p className="mt-4 text-lg text-gray-300">{event.description}</p>
          <div className="mt-6 space-y-3 text-gray-300">
            <p><span className="font-semibold text-purple-400">Date:</span> {new Date(event.date).toLocaleString()}</p>
            <p><span className="font-semibold text-purple-400">Location:</span> {event.location}</p>
            <p><span className="font-semibold text-purple-400">Price:</span> ${event.price}</p>
            <p><span className="font-semibold text-purple-400">Seats Available:</span> {isSoldOut ? 'Sold Out' : `${availableSeats} / ${event.totalSeats}`}</p>
          </div>
          <div className="mt-8">
            <button
              onClick={handleBookTicket}
              disabled={isSoldOut}
              className="w-full md:w-auto px-10 py-4 text-lg font-bold text-white bg-gradient-to-r from-brand-purple to-brand-pink rounded-lg shadow-lg hover:shadow-xl hover:shadow-purple-500/40 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 animate-glow"
            >
              {isSoldOut ? 'Sold Out' : 'Book Ticket Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
