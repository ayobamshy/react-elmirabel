const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin (you'll need to add your service account key)
// For now, we'll use the project ID method
admin.initializeApp({
  projectId: process.env.FIREBASE_PROJECT_ID,
});

// Initialize Supabase with Service Role key
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Middleware to verify Firebase token and check admin access
const verifyFirebaseToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No valid authorization header' });
    }

    const idToken = authHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    // Check if user is admin
    if (decodedToken.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Events CRUD endpoints

// GET all events
app.get('/api/events', verifyFirebaseToken, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;
    res.json({ data, error: null });
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ data: null, error: error.message });
  }
});

// POST new event
app.post('/api/events', verifyFirebaseToken, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('events')
      .insert([req.body])
      .select();

    if (error) throw error;
    res.json({ data, error: null });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ data: null, error: error.message });
  }
});

// PUT update event
app.put('/api/events/:id', verifyFirebaseToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { id: _id, created_at, ...eventPayload } = req.body;

    const { data, error } = await supabase
      .from('events')
      .update(eventPayload)
      .eq('id', id)
      .select();

    if (error) throw error;
    res.json({ data, error: null });
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({ data: null, error: error.message });
  }
});

// DELETE event
app.delete('/api/events/:id', verifyFirebaseToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('events')
      .delete()
      .eq('id', id)
      .select();

    if (error) throw error;
    res.json({ data, error: null });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({ data: null, error: error.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // Admin email logging removed for security
});
