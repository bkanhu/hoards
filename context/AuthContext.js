import React, { useState, useEffect, useContext, createContext } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/config/firebase';

// Create context
const AuthUserContext = createContext({
  authUser: null,
  loading: true,
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const authStateChange = async (user) => {
    setIsLoading(true);
    if (!user) {
      setAuthUser(null);
      setIsLoading(false);
      return;
    }
    setAuthUser({
      uid: user.uid,
      email: user.email,
      fullName: user.displayName,
    });
    setIsLoading(false);
  };

  const logOut = () => {
    signOut(auth).then(() => {
      setAuthUser(null);
      setIsLoading(false);
    });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChange);

    return () => unsubscribe();
  }, []);
  return {
    authUser,
    isLoading,
    setAuthUser,
    setIsLoading,
    logOut,
  };
}
export const AuthUserProvider = ({ children }) => {
  const auth = useFirebaseAuth();
  return (
    <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
  );
};

export const useAuth = () => useContext(AuthUserContext);
