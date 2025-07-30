import { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';

export default function Contact() {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Replace 'YOUR_FORM_ID' with your actual Formspree form ID
  const FORMSPREE_URL = 'https://formspree.io/f/mblkynqg';

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (error) setError(''); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: user?.email,
          message: form.message,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setForm({ name: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (err) {
      setError('Failed to send message. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="text-green-600 text-5xl mb-4">✓</div>
          <h1 className="text-3xl font-bold text-[#bfa76a] mb-4">Thank you for reaching out!</h1>
          <p className="text-lg text-[#2d1a09]/80 mb-6">We have received your message and will get back to you soon.</p>
          <button 
            onClick={() => setSubmitted(false)}
            className="px-6 py-2 bg-[#bfa76a] text-[#2d1a09] rounded-lg hover:bg-[#f5e9c8] transition"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-[#bfa76a] mb-4">Contact Us</h1>
        <div className="bg-white rounded-2xl shadow-lg border border-[#bfa76a]/30 p-8">
          <p className="text-lg text-[#2d1a09]/80 mb-6">
            Please log in to send us a message.
          </p>
          <p className="text-sm text-[#2d1a09]/60 mb-6">
            This helps us provide better customer service and ensures we can respond to your inquiry.
          </p>
          <div className="space-y-4">
            <div className="text-[#2d1a09] font-semibold mb-2">Email: <span className="text-[#bfa76a]">info@elmirabel.com</span></div>
            <div className="text-[#2d1a09] font-semibold mb-2">Phone: <span className="text-[#bfa76a]">+234 800 123 4567</span></div>
            <div className="text-[#2d1a09] font-semibold">Address: <span className="text-[#bfa76a]">Lagos, Nigeria</span></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-[#bfa76a] mb-8 text-center font-serif tracking-widest drop-shadow">Contact Us</h1>
      <div className="bg-white rounded-2xl shadow-lg border border-[#bfa76a]/30 p-8 mb-8">
        <div className="mb-2 text-[#2d1a09] font-semibold">Email: <span className="text-[#bfa76a]">info@elmirabel.com</span></div>
        <div className="mb-2 text-[#2d1a09] font-semibold">Phone: <span className="text-[#bfa76a]">+234 800 123 4567</span></div>
        <div className="mb-2 text-[#2d1a09] font-semibold">Address: <span className="text-[#bfa76a]">Lagos, Nigeria</span></div>
      </div>
      <form onSubmit={handleSubmit} className="bg-[#f5e9c8] rounded-2xl shadow p-8 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <label className="block mb-2 text-[#bfa76a] font-semibold">Name</label>
            <input name="name" value={form.name} onChange={handleChange} required className="w-full px-4 py-2 border border-[#bfa76a]/30 rounded-lg focus:ring-2 focus:ring-[#bfa76a]" />
          </div>
          <div className="flex-1">
            <label className="block mb-2 text-[#bfa76a] font-semibold">Email</label>
            <input 
              name="email" 
              type="email" 
              value={user?.email || ''} 
              readOnly 
              disabled
              className="w-full px-4 py-2 border border-[#bfa76a]/30 rounded-lg bg-gray-50 text-gray-600"
            />
          </div>
        </div>
        <div>
          <label className="block mb-2 text-[#bfa76a] font-semibold">Message</label>
          <textarea name="message" value={form.message} onChange={handleChange} required className="w-full px-4 py-2 border border-[#bfa76a]/30 rounded-lg focus:ring-2 focus:ring-[#bfa76a]" rows={4} />
        </div>
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
        )}
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="mt-6 px-8 py-3 rounded-full bg-[#bfa76a] text-[#2d1a09] font-semibold text-lg shadow hover:bg-[#f5e9c8] transition self-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
