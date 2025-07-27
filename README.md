# El-Mirabel Wine Shop

A luxury/premium e-commerce wine shop built with React, Tailwind CSS, Firebase Auth, and Supabase. Features persistent cart, social login, admin UI with secure backend API, Stripe-ready checkout, editable products/events, and a modern, elegant design.

---

## 🏆 Project Overview
El-Mirabel Wine Shop is a modern, fully functional e-commerce site for premium wines and exclusive events. It is designed for a luxury experience, with:
- Beautiful, responsive UI (React + Tailwind CSS)
- Persistent shopping cart
- Social login (Google, Facebook via Firebase)
- Secure admin panel with backend API for product/event management
- Stripe-ready checkout
- Supabase database with Row Level Security (RLS)
- Backend API that bridges Firebase Auth to Supabase operations
- Contact form and event management
- Smooth UX with auto-scroll to edit forms

---

## ✨ Features
- **Home, Catalog, Product, Cart, Checkout, Events, Contact pages**
- **Persistent cart** (localStorage + Supabase sync)
- **Add-to-cart feedback** (toast notification on product add)
- **Quantity selection** (choose quantity before adding to cart)
- **Live cart icon badge** (cart icon in header updates with total items)
- **Social login** (Google, Facebook via Firebase)
- **Secure Admin UI** (add/edit/delete products & events with backend API)
- **Admin-only access** (restricted to specific email addresses)
- **Smooth edit experience** (auto-scroll to form when editing events)
- **Stripe-ready checkout** (form, order summary, placeholder for Stripe integration)
- **Real-time updates** (events list refreshes automatically after changes)
- **Luxury/premium design** (deep golds, elegant fonts, responsive)
- **Contact form** (EmailJS placeholder)
- **Improved homepage** (hero, featured wines, events, testimonials)
- **Events sync** (homepage and /events page always in sync)

---

## 🛠️ Tech Stack

### Frontend
- **React** (Vite)
- **Tailwind CSS**
- **Firebase Auth** (Google, Facebook login)
- **React Router** (Client-side routing)
- **React Context API** (State management)

### Backend
- **Node.js/Express** (Backend API server)
- **Supabase** (PostgreSQL database with RLS)
- **Firebase Admin SDK** (Server-side token verification)

### Integrations
- **@stripe/stripe-js** (for Stripe Checkout integration)
- **EmailJS** (for contact form, placeholder)

---

## 🚀 Getting Started

### 1. **Install dependencies**

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd server
npm install
```

### 2. **Environment Setup**

**Frontend (.env):**
```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_APP_ID=your_firebase_app_id

# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Backend (server/.env):**
```bash
# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Firebase Configuration
FIREBASE_PROJECT_ID=your_firebase_project_id

# Admin Configuration
ADMIN_EMAIL=your_admin_email@example.com
PORT=3001
```

### 3. **Database Setup**

Create the following tables in your Supabase database:

**Events Table:**
```sql
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS and create admin policy
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated access" ON events
FOR ALL USING (auth.role() = 'authenticated');
```

### 4. **Start the Application**

**Start Backend Server:**
```bash
cd server
npm start
```

**Start Frontend (in a new terminal):**
```bash
npm run dev
```

The frontend will be available at `http://localhost:5174` and the backend API at `http://localhost:3001`.

---

## 🔐 Security Architecture

### Authentication Flow
1. **Frontend Authentication:** Users log in via Firebase Auth (Google/Facebook)
2. **Backend Verification:** Backend API verifies Firebase ID tokens using Firebase Admin SDK
3. **Admin Authorization:** Only specified admin emails can perform CRUD operations
4. **Database Access:** Backend uses Supabase Service Role key to perform database operations
5. **RLS Enforcement:** Supabase Row Level Security allows authenticated access (Service Role)

### Admin Access
Admin access is restricted to specific email addresses defined in the `AuthContext.jsx` file. The backend API verifies that the authenticated user's email matches the `ADMIN_EMAIL` environment variable before allowing any CRUD operations.

### Secure Backend API
The backend API acts as a secure proxy between the frontend and Supabase database:
- All requests must include a valid Firebase ID token in the Authorization header
- Tokens are verified server-side using Firebase Admin SDK
- Only admin users can perform CRUD operations
- Database operations are performed using the Supabase Service Role key, which bypasses RLS

---

## 📡 API Endpoints

All API endpoints are prefixed with `/api` and require a valid Firebase ID token in the Authorization header.

### Events
- `GET /api/events` - Get all events (sorted by date)
- `POST /api/events` - Create a new event
- `PUT /api/events/:id` - Update an existing event
- `DELETE /api/events/:id` - Delete an event

### Request Headers
```
Authorization: Bearer <firebase_id_token>
Content-Type: application/json
```

### Example Request
```javascript
const response = await fetch('http://localhost:3001/api/events', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${idToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Wine Tasting Event',
    date: '2025-08-15',
    time: '18:00',
    image: 'https://example.com/image.jpg',
    description: 'Join us for an exclusive wine tasting experience.'
  })
});
```

---

## 🏗️ Project Structure

```
elmirabel-wine-shop/
├── src/
│   ├── components/
│   │   ├── AuthContext.jsx      # Firebase authentication context
│   │   ├── EventsContext.jsx    # Events management context
│   │   ├── CartContext.jsx      # Shopping cart context
│   │   └── ProductContext.jsx   # Products management context
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Catalog.jsx
│   │   ├── Product.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Events.jsx
│   │   ├── Contact.jsx
│   │   ├── AdminEvents.jsx
│   │   └── AdminProducts.jsx
│   ├── App.jsx
│   └── main.jsx
├── server/
│   ├── server.js       # Express backend API
│   ├── .env            # Backend environment variables
│   └── .env.example    # Example backend environment variables
├── public/
├── .env                # Frontend environment variables
├── README.md
└── package.json
```

---

## 🧠 Key Implementation Details

### Events Management
The events management system uses a secure backend API pattern:
1. Frontend components use `EventsContext` for state management
2. All CRUD operations are performed through the backend API
3. Firebase ID tokens are passed in the Authorization header
4. Backend verifies tokens and admin access before database operations
5. Supabase Service Role key is used for database operations

### Smooth Editing Experience
When editing an event in the admin panel, the form automatically scrolls into view for better UX. This is implemented using React refs and `scrollIntoView` with smooth behavior.

### Error Handling
The application includes comprehensive error handling:
- Frontend displays user-friendly error messages
- Backend logs detailed error information
- API responses include structured error objects
- Network errors are caught and displayed appropriately

---

## 🛠️ Development Guidelines

### Adding New Features
1. Determine if the feature requires backend API changes
2. Add new endpoints to `server/server.js` following the existing pattern
3. Update frontend context files to include new functionality
4. Create new components or modify existing ones as needed
5. Test thoroughly with both admin and non-admin users

### Security Considerations
- Never expose Supabase Service Role key to the frontend
- Always verify Firebase tokens server-side
- Keep admin email addresses in environment variables
- Use HTTPS in production
- Regularly rotate API keys

### Performance Optimization
- Use React Context for efficient state management
- Implement loading states for better UX
- Optimize database queries with proper indexing
- Minimize unnecessary re-renders

---

## 🚨 Known Limitations

1. **Supabase Custom OIDC**: Direct Firebase Auth to Supabase bridging is not available on free/standard Supabase plans, which is why we use a backend API proxy.
2. **Admin Email Configuration**: Admin email addresses are hardcoded in `AuthContext.jsx` and should be moved to environment variables for better security.
3. **Cart Persistence**: Cart data is stored in localStorage and synced with Supabase, but the backend implementation for cart management is not fully implemented.

---

## 📈 Next Steps

1. **Implement Product Management**: Add product CRUD operations following the same secure backend API pattern
2. **Enhance Admin UI**: Add more comprehensive admin features and better error handling
3. **Complete Cart Implementation**: Fully implement cart persistence with Supabase
4. **Add Order Management**: Create order management system for admin users
5. **Implement Stripe Integration**: Complete the Stripe checkout integration
6. **Add Unit Tests**: Implement comprehensive testing for both frontend and backend
7. **Improve Documentation**: Add API documentation and user guides
8. **Optimize Performance**: Implement caching and other performance optimizations

---

## 📞 Support

For questions or issues, please contact the development team or refer to the Firebase and Supabase documentation for integration details.
- Admin functionality is restricted to email addresses specified in `ADMIN_EMAIL`
- All admin operations go through the secure backend API
- Firebase ID tokens are verified server-side for every request
- Supabase operations use Service Role key with proper access control

---
```

### 2. **Start the dev server**
```bash
npm run dev
```

### 3. **Configure Firebase Auth**
- Create a Firebase project at https://console.firebase.google.com/
- Enable Google and Facebook authentication
- Replace the `firebaseConfig` in `src/components/AuthContext.jsx` with your own keys

### 4. **Configure Supabase**
- Create a Supabase project at https://app.supabase.com/
- Go to Project Settings > API to get your `SUPABASE_URL` and `SUPABASE_ANON_KEY`.
- Add these to your `.env` file:
  ```env
  VITE_SUPABASE_URL=your_supabase_url
  VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
  ```
- Supabase is used for products, events, orders, cart, and bridging authentication with Firebase. Make sure your Supabase tables are set up as needed (see code for schema examples).

### 5. **(Optional) Configure Stripe**
- Set up a Stripe account at https://dashboard.stripe.com/
- Integrate Stripe Checkout (see TODOs below)

### 6. **(Optional) Configure EmailJS**
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
- Add-to-cart feedback and live cart badge for a modern, user-friendly experience
- Homepage and events always in sync for a lively, up-to-date feel

---

## 💡 Contributing
Pull requests and suggestions are welcome!

---

## © 2025 El-Mirabel Wine Shop
