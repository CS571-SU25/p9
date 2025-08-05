import React, { createContext, useContext, useState, useEffect } from 'react';

const StorageContext = createContext();

export const useStorage = (key, defaultValue) => {
  const context = useContext(StorageContext);
  if (!context) {
    throw new Error('useStorage must be used within a StorageProvider');
  }
  return context.useStorageItem(key, defaultValue);
};

export const StorageProvider = ({ children }) => {
  const [storage, setStorage] = useState(new Map());

  useEffect(() => {
    const initialStorage = new Map();
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key) {
        try {
          initialStorage.set(key, JSON.parse(sessionStorage.getItem(key)));
        } catch (error) {
          console.warn(`Failed to parse: ${key}`);
        }
      }
    }
    setStorage(initialStorage);
  }, []);

  const useStorageItem = (key, defaultValue) => {
    const currentValue = storage.has(key) ? storage.get(key) : defaultValue;

    const setValue = (newValue) => {
      setStorage(prev => {
        const updated = new Map(prev);
        updated.set(key, newValue);
        sessionStorage.setItem(key, JSON.stringify(newValue));
        return updated;
      });
    };

    return [currentValue, setValue];
  };

  return (
    <StorageContext.Provider value={{ useStorageItem }}>
      {children}
    </StorageContext.Provider>
  );
};