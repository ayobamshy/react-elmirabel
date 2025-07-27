import { createContext, useContext, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, signOut } from 'firebase/auth';

// TODO: Replace with your Firebase config

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Helper to delete cart from Supabase (module scope)
export async function deleteCartFromSupabase(userId) {
  // This function will need to be updated to use the backend API if needed
  console.log('Cart deletion not implemented in backend API yet');
}

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async u => {
      setUser(u);
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  const loginGoogle = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (err) {
      alert('Google login failed: ' + (err?.message || err));
    }
  };
  const loginFacebook = async () => {
    try {
      await signInWithPopup(auth, new FacebookAuthProvider());
    } catch (err) {
      alert('Facebook login failed: ' + (err?.message || err));
    }
  };
  const logout = async () => {
    signOut(auth);
  };

  const admins = ['cryptoanonymouscrux@yahoo.com'];
  const isAdmin = user && admins.includes(user.email);

  return (
    <AuthContext.Provider value={{ user, loginGoogle, loginFacebook, logout, isAdmin, admins, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 