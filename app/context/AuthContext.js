// import { createContext, useState } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // null = guest

//   const login = (userData) => setUser(userData);
//   const logout = () => setUser(null);

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


import { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../Utils/storageKeys';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (userData) => setUser(userData);
  const logout = async () => {
    await AsyncStorage.removeItem(STORAGE_KEYS.AUTH);
    setUser(null);
  };

  useEffect(() => {
    const loadUser = async () => {
      const storedAuth = await AsyncStorage.getItem(STORAGE_KEYS.AUTH);
      if (storedAuth) {
        setUser(JSON.parse(storedAuth));
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  if (loading) return null; // splash screen later

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
