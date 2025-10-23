import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Event } from '../types';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

interface EventContextType {
  events: Event[];
  loading: boolean;
  fetchEvents: () => Promise<void>;
  fetchEventById: (id: string) => Promise<Event | undefined>;
  createEvent: (eventData: Omit<Event, '_id' | 'bookedSeats'>) => Promise<void>;
  updateEvent: (id: string, eventData: Partial<Omit<Event, '_id'>>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    setLoading(true);
    try{
      const response = await axios.get(`${API_URL}/events`);
      console.log("Fetched events:", response.data);
      setEvents(response.data);
      setLoading(false);
    }catch(error){
      console.error("Error fetching events:", error);
    }
    
    // Placeholder logic
  };
  
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEventById = async (id: string): Promise<Event | undefined> => {
    // TODO: API Integration - GET /api/events/:id
    return events.find(event => event._id === id);
  };
  
  const createEvent = async (eventData: Omit<Event, '_id' | 'bookedSeats'>) => {
      // TODO: API Integration - POST /api/events
      // Requires admin token
      console.log("Creating event:", eventData);
      const newEvent: Event = { ...eventData, _id: String(Date.now()), bookedSeats: 0 };
      setEvents(prev => [newEvent, ...prev]);
  };
  
  const updateEvent = async (id: string, eventData: Partial<Omit<Event, '_id'>>) => {
      // TODO: API Integration - PUT /api/events/:id
      // Requires admin token
      console.log("Updating event:", id, eventData);
      setEvents(prev => prev.map(e => e._id === id ? { ...e, ...eventData } : e));
  };
  
  const deleteEvent = async (id: string) => {
      // TODO: API Integration - DELETE /api/events/:id
      // Requires admin token
      console.log("Deleting event:", id);
      setEvents(prev => prev.filter(e => e._id !== id));
  };

  return (
    <EventContext.Provider value={{ events, loading, fetchEvents, fetchEventById, createEvent, updateEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = (): EventContextType => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};
