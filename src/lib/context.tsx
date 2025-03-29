'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of our context
interface AppContextType {
  // User state
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  
  // Cart state
  ticketCount: number;
  setTicketCount: (count: number) => void;
  
  // Current pricing phase
  currentPhase: {
    id: string;
    name: string;
    price: number;
  };
}

// Create context with default values
const AppContext = createContext<AppContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  ticketCount: 1,
  setTicketCount: () => {},
  currentPhase: {
    id: 'early-bird',
    name: 'Early Bird',
    price: 10
  }
});

// Provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);
  const [currentPhase] = useState({
    id: 'early-bird',
    name: 'Early Bird',
    price: 10
  });

  return (
    <AppContext.Provider value={{
      isLoggedIn,
      setIsLoggedIn,
      ticketCount,
      setTicketCount,
      currentPhase
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);
