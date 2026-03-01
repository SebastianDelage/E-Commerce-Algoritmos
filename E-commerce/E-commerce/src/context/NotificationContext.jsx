// src/context/NotificationContext.jsx
import { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type, id: Date.now() }); // id único para remontar
  };

  const hideNotification = () => setNotification(null);

  return (
    <NotificationContext.Provider 
      value={{ showNotification, hideNotification, notification }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotification = () => useContext(NotificationContext);