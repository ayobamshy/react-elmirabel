import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    // Here you would send the email via EmailJS or similar
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-[#bfa76a] mb-4">Thank you for reaching out!</h1>
        <p className="text-lg text-[#2d1a09]/80 mb-6">We have received your message and will get back to you soon.</p>
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
            <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-2 border border-[#bfa76a]/30 rounded-lg focus:ring-2 focus:ring-[#bfa76a]" />
          </div>
        </div>
        <div>
          <label className="block mb-2 text-[#bfa76a] font-semibold">Message</label>
          <textarea name="message" value={form.message} onChange={handleChange} required className="w-full px-4 py-2 border border-[#bfa76a]/30 rounded-lg focus:ring-2 focus:ring-[#bfa76a]" rows={4} />
        </div>
        <button type="submit" className="mt-6 px-8 py-3 rounded-full bg-[#bfa76a] text-[#2d1a09] font-semibold text-lg shadow hover:bg-[#f5e9c8] transition self-center">Send Message</button>
      </form>
    </div>
  );
}
