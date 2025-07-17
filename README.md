# El-Mirabel Wine Shop

A luxury/premium e-commerce wine shop built with React, Tailwind CSS, and Firebase Auth. Features persistent cart, social login, admin UI, Stripe-ready checkout, editable products/events, and a modern, elegant design.

---

## 🏆 Project Overview
El-Mirabel Wine Shop is a modern, fully functional e-commerce site for premium wines and exclusive events. It is designed for a luxury experience, with:
- Beautiful, responsive UI (React + Tailwind CSS)
- Persistent shopping cart
- Social login (Google, Facebook via Firebase)
- Admin panel for product/event management
- Stripe-ready checkout
- Editable product and event data (in-memory for now)
- Contact form and event management

---

## ✨ Features
- **Home, Catalog, Product, Cart, Checkout, Events, Contact pages**
- **Persistent cart** (localStorage)
- **Social login** (Google, Facebook)
- **Admin UI** (add/edit/delete products & events)
- **Stripe-ready checkout** (form, order summary, placeholder for Stripe integration)
- **Editable products/events** (in-memory, via admin)
- **Luxury/premium design** (deep golds, elegant fonts, responsive)
- **Contact form** (EmailJS placeholder)

---

## 🛠️ Tech Stack
- **React** (Vite)
- **Tailwind CSS**
- **Firebase Auth** (Google, Facebook login)
- **@stripe/stripe-js** (for Stripe Checkout integration)
- **EmailJS** (for contact form, placeholder)

---

## 🚀 Getting Started

### 1. **Install dependencies**
```bash
npm install
```

### 2. **Start the dev server**
```bash
npm run dev
```

### 3. **Configure Firebase Auth**
- Create a Firebase project at https://console.firebase.google.com/
- Enable Google and Facebook authentication
- Replace the `firebaseConfig` in `src/components/AuthContext.jsx` with your own keys

### 4. **(Optional) Configure Stripe**
- Set up a Stripe account at https://dashboard.stripe.com/
- Integrate Stripe Checkout (see TODOs below)

### 5. **(Optional) Configure EmailJS**
- Set up an EmailJS account at https://www.emailjs.com/
- Integrate with the contact form (see TODOs below)

---

## 🌐 Deployment
- **Vercel** is recommended for free, fast, and easy deployment.
- Connect your GitHub repo to Vercel and follow the prompts.
- No special build settings are required (Vite default is fine).

---

## 🔥 TODOs for Production Readiness

- [ ] **Persist admin changes**: Save products/events to a backend or cloud DB (currently in-memory only)
- [ ] **Stripe integration**: Implement real Stripe Checkout (create session on backend/serverless function)
- [ ] **EmailJS integration**: Connect contact form to EmailJS or another email service
- [ ] **Admin access control**: Restrict admin page to specific emails or roles
- [ ] **Image hosting**: Use a CDN or cloud storage for product/event images
- [ ] **Validation & error handling**: Add robust form validation and error messages
- [ ] **Event RSVP/booking**: Allow users to RSVP or book events
- [ ] **Accessibility & SEO**: Audit and improve for accessibility and search engines
- [ ] **Testing**: Add unit and integration tests
- [ ] **Performance optimization**: Audit bundle size, lazy load images/components
- [ ] **Analytics**: Add Google Analytics or similar
- [ ] **Legal**: Add privacy policy, terms, and cookie consent if needed

---

## 📂 Project Structure

```
src/
  components/      # Header, Footer, AuthContext, CartContext, ProductCard, etc.
  pages/           # Home, Catalog, Product, Cart, Checkout, Events, Contact, Admin
  data/            # products.json, events.json
  index.css        # Tailwind base
  App.jsx          # Main app with routing
```

---

## 📝 Notes
- All product/event changes via admin are in-memory (reset on reload)
- Social login works out of the box with your Firebase config
- Stripe and EmailJS are ready for integration (see TODOs)
- The design is fully responsive and optimized for a luxury experience

---

## 💡 Contributing
Pull requests and suggestions are welcome!

---

## © 2025 El-Mirabel Wine Shop
