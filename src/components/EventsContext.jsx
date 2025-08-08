import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

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
      if (!user) throw new Error('Not authenticated');
      const idToken = await user.getIdToken();
      const res = await fetch('/api/events', {
        headers: { Authorization: `Bearer ${idToken}` }
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }
      let payload;
      try {
        payload = await res.json();
      } catch (e) {
        throw new Error('Invalid JSON from /api/events');
      }
      if (payload.error) {
        setError(payload.error);
        setEvents([]);
      } else {
        setEvents(payload.data || []);
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
      if (!user) throw new Error('Not authenticated');
      const idToken = await user.getIdToken();
      const payload = {
        title: event.title,
        date: event.date,
        time: event.time,
        image: event.image,
        description: event.description,
        featured: !!event.featured
      };
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const text = await res.text();
        return { data: null, error: text || `HTTP ${res.status}` };
      }
      let { data, error } = await res.json();
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
      if (!user) throw new Error('Not authenticated');
      const idToken = await user.getIdToken();
      const eventPayload = {
        title: updatedEvent.title,
        date: updatedEvent.date,
        time: updatedEvent.time,
        image: updatedEvent.image,
        description: updatedEvent.description,
        featured: !!updatedEvent.featured
      };
      const res = await fetch(`/api/events/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventPayload)
      });
      if (!res.ok) {
        const text = await res.text();
        return { data: null, error: text || `HTTP ${res.status}` };
      }
      let { data, error } = await res.json();
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
      if (!user) throw new Error('Not authenticated');
      const idToken = await user.getIdToken();
      const res = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${idToken}` }
      });
      if (!res.ok) {
        const text = await res.text();
        return { data: null, error: text || `HTTP ${res.status}` };
      }
      let { data, error } = await res.json();
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
    if (user) refreshEvents();
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
