'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { getUserById, createUser } from '../lib/firestore';

const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  async function signup(email, password, name) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create user document in Firestore
      await createUser(user.uid, email, name, 'customer');

      return { success: true };
    } catch (error) {
      console.error('[signup]', error);
      return { success: false, error: error.message };
    }
  }

  async function login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      console.error('[login]', error);
      return { success: false, error: error.message };
    }
  }

  async function logout() {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setUserRole(null);
    } catch (error) {
      console.error('[logout]', error);
      throw error;
    }
  }

  async function checkUserRole(userId) {
    try {
      const userData = await getUserById(userId);
      if (userData) {
        setUserRole(userData.role);
        return userData.role;
      }
      return null;
    } catch (error) {
      console.error('[checkUserRole]', error);
      return null;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await checkUserRole(user.uid);
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRole,
    signup,
    login,
    logout,
    checkUserRole,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
