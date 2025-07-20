import { createContext, useContext, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, signOut } from 'firebase/auth';
import { createClient } from '@supabase/supabase-js';

// TODO: Replace with your Firebase config

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // Optionally, add a loading state:
  // const [loading, setLoading] = useState(false);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  const loginGoogle = async () => {
    // setLoading(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (err) {
      alert('Google login failed: ' + (err?.message || err));
    } finally {
      // setLoading(false);
    }
  };
  const loginFacebook = async () => {
    // setLoading(true);
    try {
      await signInWithPopup(auth, new FacebookAuthProvider());
    } catch (err) {
      alert('Facebook login failed: ' + (err?.message || err));
    } finally {
      // setLoading(false);
    }
  };
  const logout = () => signOut(auth);

  const admins = ['cryptoanonymouscrux@yahoo.com'];
  const isAdmin = user && admins.includes(user.email);

  return (
    <AuthContext.Provider value={{ user, loginGoogle, loginFacebook, logout, isAdmin, admins }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 