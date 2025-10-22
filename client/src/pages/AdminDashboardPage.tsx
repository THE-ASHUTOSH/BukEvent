
import React, { useState } from 'react';
import { useEvents } from '../contexts/EventContext';
import { Event } from '../types';
import Spinner from '../components/Spinner';

const EventForm: React.FC<{ event?: Event; onSave: (event: Omit<Event, '_id' | 'bookedSeats'> | Partial<Event>) => void; onCancel: () => void }> = ({ event, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: event?.name || '',
    description: event?.description || '',
    date: event ? new Date(event.date).toISOString().substring(0, 16) : '',
    location: event?.location || '',
    price: event?.price || 0,
    totalSeats: event?.totalSeats || 0,
    imageUrl: event?.imageUrl || 'https://picsum.photos/seed/newevent/600/400'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'price' || name === 'totalSeats' ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const eventDataToSave = {
        ...formData,
        date: new Date(formData.date).toISOString(),
    };
    onSave(eventDataToSave);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
        <div className="bg-gray-800 p-8 rounded-lg shadow-2xl shadow-purple-900/40 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6 text-white">{event ? 'Edit Event' : 'Create Event'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="name" placeholder="Event Name" value={formData.name} onChange={handleChange} required className="w-full p-2 bg-gray-700 rounded border border-gray-600 text-white" />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="w-full p-2 bg-gray-700 rounded border border-gray-600 text-white" />
                <input type="datetime-local" name="date" value={formData.date} onChange={handleChange} required className="w-full p-2 bg-gray-700 rounded border border-gray-600 text-white" />
                <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required className="w-full p-2 bg-gray-700 rounded border border-gray-600 text-white" />
                <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required className="w-full p-2 bg-gray-700 rounded border border-gray-600 text-white" />
                <input type="number" name="totalSeats" placeholder="Total Seats" value={formData.totalSeats} onChange={handleChange} required className="w-full p-2 bg-gray-700 rounded border border-gray-600 text-white" />
                <input type="text" name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} required className="w-full p-2 bg-gray-700 rounded border border-gray-600 text-white" />
                <div className="flex justify-end space-x-4 pt-4">
                    <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-600 rounded text-white hover:bg-gray-500 transition-colors">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-purple-600 rounded text-white hover:bg-purple-700 transition-colors">Save</button>
                </div>
            </form>
        </div>
    </div>
  );
};


const AdminDashboardPage: React.FC = () => {
    const { events, loading, createEvent, updateEvent, deleteEvent } = useEvents();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | undefined>(undefined);

    const handleCreate = () => {
        setEditingEvent(undefined);
        setIsFormOpen(true);
    };

    const handleEdit = (event: Event) => {
        setEditingEvent(event);
        setIsFormOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            await deleteEvent(id);
        }
    };
    
    const handleSave = async (eventData: Omit<Event, '_id' | 'bookedSeats'> | Partial<Event>) => {
        if (editingEvent) {
            await updateEvent(editingEvent._id, eventData);
        } else {
            await createEvent(eventData as Omit<Event, '_id' | 'bookedSeats'>);
        }
        setIsFormOpen(false);
        setEditingEvent(undefined);
    };

    return (
        <div className="animate-fade-in-up">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                <button onClick={handleCreate} className="bg-gradient-to-r from-brand-purple to-brand-pink text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:scale-105 transition-transform">
                    Create Event
                </button>
            </div>
            
            {isFormOpen && <EventForm event={editingEvent} onSave={handleSave} onCancel={() => setIsFormOpen(false)} />}

            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                {loading ? <Spinner /> : (
                    <table className="w-full text-left text-gray-300">
                        <thead className="bg-gray-900 text-sm uppercase">
                            <tr>
                                <th className="p-4">Event Name</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Location</th>
                                <th className="p-4">Bookings</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map(event => (
                                <tr key={event._id} className="border-b border-gray-700 hover:bg-gray-700/50">
                                    <td className="p-4 font-medium text-white">{event.name}</td>
                                    <td className="p-4">{new Date(event.date).toLocaleDateString()}</td>
                                    <td className="p-4">{event.location}</td>
                                    <td className="p-4">{event.bookedSeats} / {event.totalSeats}</td>
                                    <td className="p-4 space-x-2">
                                        <button onClick={() => handleEdit(event)} className="text-purple-400 hover:underline">Edit</button>
                                        <button onClick={() => handleDelete(event._id)} className="text-pink-500 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AdminDashboardPage;
