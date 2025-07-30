import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../supabaseClient';

const EventsContext = createContext();

// Helper function to get Firebase ID token
async function getAuthHeaders(user) {
  if (!user) {
    throw new Error('User not authenticated');
  }
  const idToken = await user.getIdToken();
  return {
    'Authorization': `Bearer ${idToken}`,
    'Content-Type': 'application/json'
  };
}

export function EventsProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  async function refreshEvents() {
    setLoading(true);
    setError(null);
    try {
      // Optionally, you can require auth here if you want to restrict admin events
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });
      if (error) {
        setError(error.message);
        setEvents([]);
      } else {
        setEvents(data || []);
      }
    } catch (err) {
      setError(err.message);
      setEvents([]);
    }
    setLoading(false);
  }

  // CRUD functions that use the current user
  const addEvent = async (event) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .insert([event])
        .select();
      if (!error && data) {
        await refreshEvents();
      }
      return { data, error };
    } catch (error) {
      return { data: null, error: error.message };
    }
  };

  const updateEvent = async (id, updatedEvent) => {
    try {
      // Exclude id and created_at from payload
      const { id: _id, created_at, ...eventPayload } = updatedEvent;
      const { data, error } = await supabase
        .from('events')
        .update(eventPayload)
        .eq('id', id)
        .select();
      if (!error && data) {
        await refreshEvents();
      }
      return { data, error };
    } catch (error) {
      return { data: null, error: error.message };
    }
  };

  const deleteEvent = async (id) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .delete()
        .eq('id', id)
        .select();
      if (!error && data) {
        await refreshEvents();
      }
      return { data, error };
    } catch (error) {
      return { data: null, error: error.message };
    }
  };

  useEffect(() => {
    // Fetch events when user changes (login/logout)
    refreshEvents();
  }, [user]);

  return (
    <EventsContext.Provider value={{ 
      events, 
      setEvents, 
      refreshEvents, 
      loading, 
      error,
      addEvent,
      updateEvent,
      deleteEvent
    }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  return useContext(EventsContext);
}
