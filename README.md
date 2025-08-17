# El-Mirabel Wine Shop

A luxury/premium e-commerce wine shop built with React, Tailwind CSS, Firebase Auth, and Supabase. Features persistent cart, social login, admin UI with secure backend API, Stripe-ready checkout, editable products/events, and a modern, elegant design.

---

## 🏆 Project Overview
El-Mirabel Wine Shop is a modern, fully functional e-commerce site for premium wines and exclusive events. It is designed for a luxury experience, with:
- Beautiful, responsive UI (React + Tailwind CSS)
- Persistent shopping cart with user-specific sync
- Social login (Google, Facebook via Firebase)
- Secure admin panel with backend API for product/event management
- Stripe-ready checkout system
- Supabase database with Row Level Security (RLS)
- Backend API that bridges Firebase Auth to Supabase operations
- **Formspree-powered contact form** (50 free submissions/month)
- **Authentication-restricted contact form** (email auto-filled from logged-in user)
- **Admin-only product management** (add/edit/delete wines)
- **Admin-only event management** (add/edit/delete events)
- **Order management (planned)**
- **Luxury design** with premium branding and responsive layout

---

## ✨ Current Features

### 🛍️ **E-Commerce Core**
- **Home, Catalog, Product, Cart, Checkout, Events, Contact pages**
- **Persistent cart** (localStorage + Supabase sync per user)
- **Social login** (Google, Facebook via Firebase Auth)
- **Secure checkout** with order summary and user order history
- **Product management** (browse, search, filter premium wines)
- **Event management** (browse exclusive wine events)

### 🔐 **Authentication & Security**
- **Firebase Authentication** (Google, Facebook login)
- **User-specific cart sync** (cart persists per logged-in user)
- **Admin-only access** (restricted to authorized email addresses)
- **Secure API endpoints** (Firebase Auth + Supabase RLS)

### 🎯 **Contact System**
- **Authentication-restricted contact form**
- **Email auto-filled** from logged-in user's account
- **Formspree integration** (50 free submissions/month)
- **Real email delivery** to your inbox
- **Loading states & error handling**
- **Success confirmation** with retry option

### 🛠️ **Admin Dashboard**
- **Product Management**
  - Add new wines with images, descriptions, pricing
  - Edit existing product details
  - Delete products from catalog
  - Featured product toggle
- **Event Management**
  - Add exclusive wine events
  - Edit event details (date, time, description, images)
  - Delete events
- **Order Management (planned)**
  - View customer orders (planned)
  - Filter and sort orders (planned)
  - Track order status (planned)

### 📱 **User Experience**
- **Responsive design** (mobile, tablet, desktop)
- **Premium branding** (luxury colors, typography)
- **Smooth animations** and transitions
- **Loading states** for all async operations
- **Error handling** with user-friendly messages
- **Auto-scroll to forms** when editing

---

## 🛠️ Tech Stack

### Frontend
- **React** (Vite)
- **Tailwind CSS** (styling)
- **Firebase Auth** (Google, Facebook login)
- **React Router** (client-side routing)
- **React Context API** (state management)
- **Formspree** (contact form email delivery)

### Backend
- **Node.js/Express** (Backend API server)
- **Supabase** (PostgreSQL database with RLS)
- **Firebase Admin SDK** (authentication verification)
- **RESTful API** design

### Database
- **Supabase** (PostgreSQL)
- **Row Level Security** (RLS) for data protection
- **User-specific data isolation**

### Deployment & Services
- **Formspree** (contact form emails - 50 free/month)
- **Firebase** (authentication & hosting ready)
- **Vercel/Netlify** ready for deployment

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (backend requires >= 18)
- Firebase project
- Supabase project
- Formspree account (for contact form)

### Environment Variables
Create `.env` file:
```bash
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Installation
```bash
npm install
npm run dev
```

### Contact Form Setup
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form
3. Copy your form endpoint ID
4. Update `FORMSPREE_URL` in `/src/pages/Contact.jsx`

---

## 📁 Project Structure

```
src/
├── components/
│   ├── AuthContext.jsx        # Firebase auth context
│   ├── CartContext.jsx        # Shopping cart state
│   ├── ProductsContext.jsx    # Product management
│   ├── EventsContext.jsx      # Event management
│   └── ...
├── pages/
│   ├── Home.jsx              # Landing page
│   ├── Catalog.jsx           # Product catalog
│   ├── Contact.jsx           # Authentication-restricted contact
│   ├── Admin.jsx             # Admin dashboard
│   ├── AdminProducts.jsx     # Product management
│   ├── AdminEvents.jsx       # Event management
│   └── ...
├── data/                     # Sample data
└── ...
```
 
---

## 📘 Simple Guide to Our Components

This short, non-technical guide explains the main components so contributors and admins can quickly find where to look when something needs fixing.

### Main Parts (Components)

**Auth Stuff (`AuthContext.jsx`)**
- Think of this as the bouncer at a club — it checks whether you're logged in.
- Remembers who you are (regular user or admin).
- Handles social login (Google/Facebook) and reports login errors.

**Shopping Cart (`CartContext.jsx` & `Cart.jsx`)**
- A digital shopping cart that remembers what wines you want to buy.
- Persists the cart across sessions (localStorage + Supabase sync).
- Shows total price and quantity; lets you add/remove items and change quantities.

**Product Display (`ProductsContext.jsx` & `Catalog.jsx`)**
- The wine shelf of our store — shows wines, prices, and images.
- Admins can add or edit products here.
- Handles searching, sorting, and filtering.

**Events Management (`EventsContext.jsx` & `Events.jsx`)**
- The calendar for wine tastings and special events.
- Shows upcoming events with dates and details; admins can create/edit events.

**Contact Form (`Contact.jsx`)**
- A suggestion box that only works for logged-in users.
- Auto-fills the user's email and sends messages via Formspree.

**Admin Dashboard (`Admin.jsx`, `AdminProducts.jsx`, `AdminEvents.jsx`)**
- Control center for store managers: change prices, add wines, create events, manage orders.
- If you can't access these pages, check that your email is configured as an admin.

**Shopping Process (`Checkout.jsx`)**
- The cashier — shows the final bill and handles payment (Stripe integration when configured).

### Common Problems & Where to Look

- Can't log in? Check `AuthContext.jsx` and your Firebase config.
- Cart not persisting or wrong totals? Check `CartContext.jsx` and Supabase sync logic.
- Products not showing? Inspect `ProductsContext.jsx` and `data/products.json`.
- Events missing or wrong dates? Check `EventsContext.jsx` and `data/events.json`.
- Admin pages not visible? Verify the admin email(s) in `server` config or environment variables.

### Implementation notes

- This section is intentionally non-technical — it points contributors to the files to check first.
- Add screenshots or short GIFs where helpful (screenshots can live in `/public/images/docs/`).
- Link to this section from any top-level table-of-contents if you add one.

---
---

## 🎯 Admin Features

### Product Management
- **Add Products**: Create new wine listings with full details
- **Edit Products**: Update descriptions, prices, images
- **Delete Products**: Remove products from catalog
- **Featured Toggle**: Mark products as featured

### Event Management
- **Add Events**: Create exclusive wine events
- **Edit Events**: Update dates, descriptions, images
- **Delete Events**: Remove events from listings

### Order Management (planned)
- **View All Orders**: Complete order overview
- **Filter & Sort**: Advanced order filtering
- **Customer Details**: Full order information

---

## 🔒 Security Features

### Authentication
- **Firebase Auth** integration
- **Social login** (Google, Facebook)
- **Admin email verification**
- **Route protection** for admin pages

### Data Protection
- **Supabase RLS** (Row Level Security)
- **User-specific data isolation**
- **Secure API endpoints**
- **Input validation & sanitization**

---

## 📞 Contact Features

### Authentication-Required Contact
- **Logged-in users only** can send messages
- **Email auto-filled** from user account
- **Non-editable email field**
- **Formspree integration** for reliable email delivery
- **Professional error handling**
- **Success confirmation** with retry option

### Alternative Contact Methods
- **Email**: info@elmirabel.com
- **Phone**: +234 800 123 4567
- **Address**: Lagos, Nigeria

---

## 🎨 Design System

### Colors
- **Primary**: `#bfa76a` (luxury gold)
- **Secondary**: `#2d1a09` (deep brown)
- **Accent**: `#f5e9c8` (warm cream)

### Typography
- **Serif fonts** for luxury feel
- **Responsive typography** scales
- **Premium spacing** and layouts

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration/login (Google/Facebook)
- [ ] Cart functionality across sessions
- [ ] Product browsing and filtering
- [ ] Contact form submission
- [ ] Admin product management
- [ ] Admin event management
- [ ] Order placement and viewing
- [ ] Responsive design on mobile/tablet

### Contact Form Testing
- [ ] Form submission with logged-in user
- [ ] Email delivery confirmation
- [ ] Error handling scenarios
- [ ] Success message display
- [ ] Non-logged-in user restriction

---

## 🚀 Deployment Ready

### Ready for Production
- **Environment variables** configured
- **Build optimization** complete
- **Error handling** implemented
- **Performance optimized**
- **Security best practices** applied

### Deployment Options
- **Vercel**: One-click deployment
- **Netlify**: Static hosting with functions
- **Firebase Hosting**: Full Firebase ecosystem
- **Custom server**: Express backend ready

---

## 🆘 Support

### Common Issues
- **Contact form not working**: Check Formspree form ID
- **Authentication errors**: Verify Firebase config
- **Database issues**: Check Supabase connection
- **Build failures**: Verify environment variables

### Contact for Help
- **Email**: info@elmirabel.com
- **GitHub Issues**: Create issue in repository
- **Documentation**: Check inline code comments

---

**Built with ❤️ for premium wine enthusiasts**

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
- **@stripe/stripe-js** (for Stripe Checkout integration; wiring pending)
- **Formspree** (live contact form delivery)

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

**Carts Table:**
```sql
CREATE TABLE carts (
  user_id TEXT PRIMARY KEY,
  cart JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Optional RLS (backend uses Service Role for admin ops)
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated read own cart" ON carts
  FOR SELECT USING (auth.email() = user_id);
CREATE POLICY "Allow authenticated upsert own cart" ON carts
  FOR INSERT WITH CHECK (auth.email() = user_id);
CREATE POLICY "Allow authenticated update own cart" ON carts
  FOR UPDATE USING (auth.email() = user_id);
```

Utilities in this repo:
- `POPULATE_EVENTS.sql` to seed example events
- `ADD_FEATURED_COLUMN_EVENTS.sql` to add featured flag
- `SUPABASE_UPDATE_EVENTS.sql` example updates
- `update-events.js` script to update event images via Supabase JS client

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

 The frontend will be available at `http://localhost:5173` and the backend API at `http://localhost:3001`.

 Note on local API calls: the frontend calls the backend using relative paths like `/api/...`. In development, either run the backend on the same origin (via a reverse proxy) or configure a Vite dev proxy:

 ```js
 // vite.config.js
 import { defineConfig } from 'vite'
 import react from '@vitejs/plugin-react'
 
 export default defineConfig({
   plugins: [react()],
   server: {
     proxy: {
       '/api': {
         target: 'http://localhost:3001',
         changeOrigin: true,
       },
     },
   },
 })
 ```

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

1. Supabase direct OIDC: We bridge Firebase→Supabase via the backend (Firebase Admin + Supabase Service Role). Direct OIDC isn’t used here.
2. Admin email source: Backend checks `ADMIN_EMAIL` in `server/.env`. Frontend may also gate UI in `AuthContext.jsx`; keep both in sync.
3. Orders & Stripe: Order management and Stripe checkout are planned but not yet completed.

---

## 📈 Next Steps

1. Order Management: Build orders schema and admin dashboard.
2. Stripe Integration: Implement server checkout session + client flow.
3. Tests: Add unit/integration tests for backend routes and contexts.
4. Docs: Expand API and environment setup guides.
5. Performance: Add caching and tune queries.

---

## 📞 Support

For questions or issues, please contact the development team or refer to the Firebase and Supabase documentation for integration details.
- Admin functionality is restricted to email addresses specified in `ADMIN_EMAIL`
- All admin operations go through the secure backend API
- Firebase ID tokens are verified server-side for every request
- Supabase operations use Service Role key with proper access control

---
## 🧰 Beginner Glossary (Plain English)

- React: A way to build web pages using small reusable pieces called components.
- Vite: A fast tool that runs and builds the React app while you code.
- Tailwind CSS: Ready‑made CSS classes so you can style pages without writing lots of custom CSS.
- Firebase Authentication: Lets users sign in (e.g., Google). After login, you get a secure token.
- Firebase ID Token: A signed "proof of login" string your app sends to the backend to prove who you are.
- Express (Node.js): The backend server that receives requests from the website.
- Supabase: A hosted PostgreSQL database with helpful tooling and a JS client.
- Service Role Key: A powerful secret key for the backend only; it can bypass security rules. Never expose it to the frontend.
- Row Level Security (RLS): Database rules that decide which rows a user can read or change.
- REST API: A standard way for the frontend to talk to the backend using HTTP routes like GET/POST/PUT/DELETE.
- Proxy (/api): During development, Vite forwards calls like /api/... to the backend on port 3001.
- CORS: Browser safety rules about which websites can call your server.
- CRUD: Create, Read, Update, Delete – add, view, edit, and remove data.
- Context API: A React feature to share data (like events or cart) across many components.
- .env file: A file that stores your keys/secrets locally (not checked into GitHub).
- JSON: A simple text format for data like { "name": "value" }.

---

## ✅ Setup Summary (Step‑by‑step)

1) Install Node.js 18+.
2) Install dependencies
   - Frontend (root): `npm install`
   - Backend (`server/`): `npm install`
3) Environment variables
   - Frontend `.env`: Firebase + Supabase anon keys (see sections above)
   - Backend `server/.env`: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `FIREBASE_PROJECT_ID`, `ADMIN_EMAIL`, `PORT=3001`
4) Database
   - Create `events` and `carts` tables (see examples above)
5) Run
   - Backend: `cd server && npm run dev` (or `npm start`)
   - Frontend: from project root `npm run dev`
   - Open http://localhost:5173
6) Admin access
   - Log in with the email set in `ADMIN_EMAIL` to use admin pages
7) Contact form
   - Replace `FORMSPREE_URL` in `src/pages/Contact.jsx` with your Formspree endpoint

---

## 🧩 Troubleshooting

- Frontend can’t reach API: Ensure backend runs on port 3001. Check `vite.config.js` proxy for `/api`.
- 401/403 errors: Make sure you’re logged in and your email matches `ADMIN_EMAIL` in `server/.env`.
- 500 errors: Inspect backend logs in the terminal where `server` runs. Verify all backend env vars.
- Invalid JSON errors: We added checks in `EventsContext.jsx` and `CartSupabaseSync.jsx`; if seen, review server responses.
- Contact form fails: Update your Formspree endpoint and verify your Formspree project.

---

## 📈 Notes
- Admin changes to products/events are persisted to Supabase
- Social login works out of the box with your Firebase config
- Stripe integration is planned
- The design is fully responsive and optimized for a luxury experience
- Add-to-cart feedback and live cart badge for a modern, user-friendly experience
- Homepage and events always in sync for a lively, up-to-date feel

---

## 💡 Contributing
Pull requests and suggestions are welcome!
---

## © 2025 El-Mirabel Wine Shop
