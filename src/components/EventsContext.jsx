import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const EventsContext = createContext();
const API_BASE_URL = 'http://localhost:3001/api';

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
      // Check if user is authenticated before making request
      if (!user) {
        setEvents([]); // Clear events if not authenticated
        setLoading(false);
        return;
      }
      
      const headers = await getAuthHeaders(user);
      const response = await fetch(`${API_BASE_URL}/events`, { headers });
      const result = await response.json();
      
      if (response.ok && !result.error) {
        setEvents(result.data || []);
      } else {
        setError(result.error || 'Failed to fetch events');
        setEvents([]);
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
      if (!user) {
        return { data: null, error: 'User not authenticated' };
      }
      
      const headers = await getAuthHeaders(user);
      const response = await fetch(`${API_BASE_URL}/events`, {
        method: 'POST',
        headers,
        body: JSON.stringify(event)
      });
      const result = await response.json();
      
      if (result.data && !result.error) {
        await refreshEvents(); // Refresh the events list
      }
      return result;
    } catch (error) {
      return { data: null, error: error.message };
    }
  };

  const updateEvent = async (id, updatedEvent) => {
    try {
      if (!user) {
        return { data: null, error: 'User not authenticated' };
      }
      
      // Exclude id and created_at from payload
      const { id: _id, created_at, ...eventPayload } = updatedEvent;
      
      const headers = await getAuthHeaders(user);
      const response = await fetch(`${API_BASE_URL}/events/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(eventPayload)
      });
      const result = await response.json();
      
      if (result.data && !result.error) {
        await refreshEvents(); // Refresh the events list
      }
      return result;
    } catch (error) {
      console.error('[updateEvent] Error:', error);
      return { data: null, error: error.message };
    }
  };

  const deleteEvent = async (id) => {
    try {
      if (!user) {
        return { data: null, error: 'User not authenticated' };
      }
      
      const headers = await getAuthHeaders(user);
      const response = await fetch(`${API_BASE_URL}/events/${id}`, {
        method: 'DELETE',
        headers
      });
      const result = await response.json();
      
      if (result.data && !result.error) {
        await refreshEvents(); // Refresh the events list
      }
      return result;
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
