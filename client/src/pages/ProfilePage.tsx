import React, { useState, useEffect } from 'react';
// FIX: Import the Link component from react-router-dom to resolve its usage in the JSX.
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Booking } from '../types';
import Spinner from '../components/Spinner';

const MOCK_BOOKINGS: Booking[] = [
    {_id: 'b1', event: { _id: '1', name: 'Cosmic Music Festival', description: '', date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), location: 'Starlight Amphitheater', price: 150, totalSeats: 5000, bookedSeats: 2345, imageUrl: 'https://picsum.photos/seed/event1/600/400' }, user: '1', createdAt: new Date().toISOString() },
    {_id: 'b2', event: { _id: '4', name: 'Midnight Movie Marathon', description: '', date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), location: 'Eclipse Drive-In', price: 25, totalSeats: 300, bookedSeats: 150, imageUrl: 'https://picsum.photos/seed/event4/600/400' }, user: '1', createdAt: new Date().toISOString() },
];


const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      // TODO: API Integration - GET /api/bookings
      // Requires user token. This will fetch bookings for the logged-in user.
      // const response = await fetch('/api/bookings', { headers: { 'Authorization': `Bearer ${token}` }});
      // const data = await response.json();
      // setBookings(data);
      
      // Placeholder logic
      setLoading(true);
      setTimeout(() => {
        setBookings(MOCK_BOOKINGS);
        setLoading(false);
      }, 500);
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId: string) => {
      if (!window.confirm("Are you sure you want to cancel this booking?")) return;
      
      // TODO: API Integration - PUT /api/bookings/:id/cancel
      // Requires user token.
      // const response = await fetch(`/api/bookings/${bookingId}/cancel`, {
      //   method: 'PUT',
      //   headers: { 'Authorization': `Bearer ${token}` }
      // });
      // if(response.ok) {
      //     setBookings(bookings.filter(b => b._id !== bookingId));
      // } else {
      //     alert('Failed to cancel booking.');
      // }

      // Placeholder logic
      console.log('Cancelling booking', bookingId);
      setBookings(bookings.filter(b => b._id !== bookingId));
  }

  if (!user) {
    return <p>Please log in to see your profile.</p>;
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
        <p className="text-purple-400 text-lg">{user.name}</p>
        <p className="text-gray-400">{user.email}</p>
      </div>

      <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6">My Bookings</h2>
        {loading ? (
          <Spinner />
        ) : bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map(booking => (
              <div key={booking._id} className="bg-gray-900 p-4 rounded-lg flex items-center justify-between transition-transform duration-300 hover:scale-[1.02] hover:shadow-purple-500/20 shadow-md">
                <div>
                  <h3 className="text-xl font-bold text-pink-400">{booking.event.name}</h3>
                  <p className="text-gray-400">{new Date(booking.event.date).toLocaleDateString()}</p>
                  <p className="text-gray-500 text-sm">Booked on: {new Date(booking.createdAt).toLocaleDateString()}</p>
                </div>
                <button 
                    onClick={() => handleCancelBooking(booking._id)}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">You have no bookings yet. <Link to="/events" className="text-purple-400 hover:underline">Find an event!</Link></p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;