import { useAuth } from '../components/AuthContext';
import { useState, useRef, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useEvents } from '../components/EventsContext';

export default function AdminEvents() {
  const { user, isAdmin, authLoading } = useAuth();
  const { events, refreshEvents, loading, error, addEvent, updateEvent, deleteEvent } = useEvents();
  const [eventForm, setEventForm] = useState({ title: '', date: '', time: '', image: '', description: '', featured: false });
  const titleInputRef = useRef(null);
  const [editingEventId, setEditingEventId] = useState(null);
  const [message, setMessage] = useState(null);
  const [eventError, setEventError] = useState(null);
  
  // Ref for the form to scroll to
  const formRef = useRef(null);

  // Ensure events are loaded when admin visits this page (even if user didn't change)
  useEffect(() => {
    if (user && isAdmin) {
      refreshEvents();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isAdmin]);

  if (authLoading) return <div className="text-center py-20 text-[#bfa76a]">Loading...</div>;
  if (!user || !isAdmin) return <Navigate to="/" />;

  const handleEventChange = e => {
    const { name, type, checked, value } = e.target;
    setEventForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleEventAdd = async e => {
    e.preventDefault();
    setMessage(null); setEventError(null);
    try {
      if (editingEventId) {
        const updatePayload = { ...eventForm };
        const { data, error: updateErr } = await updateEvent(Number(editingEventId), updatePayload);
        if (!updateErr && data && data.length > 0 && typeof data[0].featured === 'boolean') {
          setMessage(`Event updated successfully!${data[0].featured ? ' (Featured)' : ''}`);
          setEditingEventId(null);
          setEventForm({ title: '', date: '', time: '', image: '', description: '', featured: false });
          refreshEvents();
        } else {
          setEventError(updateErr || 'Failed to update event. Please check your input and try again.');
        }
      } else {
        const addPayload = { ...eventForm };
        const { data, error: addErr } = await addEvent(addPayload);
        if (!addErr && data && data.length > 0 && typeof data[0].featured === 'boolean') {
          setMessage(`Event added successfully!${data[0].featured ? ' (Featured)' : ''}`);
          setEventForm({ title: '', date: '', time: '', image: '', description: '', featured: false });
          refreshEvents();
        } else {
          setEventError(addErr || 'Failed to add event. Please check your input and try again.');
        }
      }
    } catch (err) {
      setEventError('Failed to save event.');
    }
  };

  const handleEventEdit = ev => {
    setEventForm({ title: ev.title, date: ev.date, time: ev.time, image: ev.image, description: ev.description, featured: !!ev.featured });
    setEditingEventId(ev.id);
    setMessage(null);
    setEventError(null);
    // Instantly focus the title input
    setTimeout(() => {
      titleInputRef.current?.focus();
    }, 0);
  };

  const handleEventCancel = () => {
    setEventForm({ title: '', date: '', time: '', image: '', description: '', featured: false });
    setEditingEventId(null);
    setMessage(null);
    setEventError(null);
  };

  const handleEventDelete = async id => {
    setMessage(null); setEventError(null);
    try {
      await deleteEvent(id);
      if (editingEventId === id) handleEventCancel();
      setMessage('Event deleted.');
    } catch (err) {
      setEventError('Failed to delete event.');
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-[#bfa76a]">Loading events...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-[#bfa76a] mb-8 text-center font-serif tracking-widest drop-shadow">Admin: Events</h1>
      {error && (
        <div className="mb-4 text-red-800 bg-red-100 border border-red-300 rounded p-2 text-center">
          {typeof error === 'string' ? error : 'Failed to load events. Check server logs.'}
        </div>
      )}
      {message && <div className="mb-4 text-green-700 bg-green-100 border border-green-300 rounded p-2 text-center">{message}</div>}
      {eventError && <div className="mb-4 text-red-700 bg-red-100 border border-red-300 rounded p-2 text-center">{eventError}</div>}
      <form ref={formRef} onSubmit={handleEventAdd} className="flex flex-col md:flex-row flex-wrap gap-4 mb-8 bg-[#f5e9c8] p-4 rounded-xl">
        <input ref={titleInputRef} name="title" value={eventForm.title} onChange={handleEventChange} placeholder="Title" required className="flex-1 min-w-0 max-w-full px-3 py-2 rounded border border-[#bfa76a]/30" />
        <input name="date" value={eventForm.date} onChange={handleEventChange} placeholder="Date" required className="w-32 min-w-0 max-w-full px-3 py-2 rounded border border-[#bfa76a]/30" />
        <input name="time" value={eventForm.time} onChange={handleEventChange} placeholder="Time" required className="w-32 min-w-0 max-w-full px-3 py-2 rounded border border-[#bfa76a]/30" />
        <input name="image" value={eventForm.image} onChange={handleEventChange} placeholder="Image URL" required className="w-48 min-w-0 max-w-full px-3 py-2 rounded border border-[#bfa76a]/30" />
        <input name="description" value={eventForm.description} onChange={handleEventChange} placeholder="Description" required className="flex-1 min-w-0 max-w-full px-3 py-2 rounded border border-[#bfa76a]/30" />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="featured"
            checked={eventForm.featured}
            onChange={handleEventChange}
            className="w-4 h-4"
          />
          <label>Featured</label>
        </div>
        <button type="submit" className="px-4 py-2 rounded bg-[#bfa76a] text-[#2d1a09] font-bold shadow hover:bg-[#f5e9c8]">{editingEventId ? 'Save' : 'Add'}</button>
        {editingEventId && <button type="button" onClick={handleEventCancel} className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-bold shadow hover:bg-gray-300">Cancel</button>}
      </form>
      <ul className="divide-y divide-[#bfa76a]/30 bg-white rounded-xl shadow">
        {events.map(ev => (
          <li key={ev.id} className="flex items-center gap-4 py-4 px-4">
            <img src={ev.image} alt={ev.title} className="w-16 h-16 object-cover rounded-xl border border-[#bfa76a]/30" />
            <div className="flex-1">
              <div className="font-bold text-[#2d1a09] flex items-center gap-2">{ev.title} {ev.featured && <span className="ml-2 px-2 py-0.5 rounded bg-[#bfa76a] text-white text-xs font-semibold">★ Featured</span>}</div>
              <div className="text-sm text-[#4b320d]/80">{ev.description}</div>
              <div className="text-[#bfa76a] font-semibold">{ev.date} {ev.time}</div>
            </div>
            
            <button onClick={() => handleEventEdit(ev)} className="px-3 py-1 rounded bg-blue-100 text-blue-700 font-bold hover:bg-blue-200">Edit</button>
            <button onClick={() => handleEventDelete(ev.id)} className="px-3 py-1 rounded bg-red-100 text-red-700 font-bold hover:bg-red-200">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}