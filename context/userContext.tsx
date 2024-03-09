// userContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface UserGlobalData {
  // Define your user data interface here
  // For example:
  userid: string,
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  role: string;
  display_name: string;
  // Add other fields as needed
}

interface UserContextType {
  userGlobalData: UserGlobalData | null;
  setUserGlobalData: (userGlobalData: UserGlobalData | null) => void;
}

const UserContext = createContext<UserContextType>({
  userGlobalData: null,
  setUserGlobalData: () => {}
});

interface UserProviderProps {
  children: ReactNode;
  value: UserGlobalData | null; // Define the value prop
}

export const UserProvider: React.FC<UserProviderProps> = ({ children, value }) => {
  const [userGlobalData, setUserGlobalData] = useState<UserGlobalData | null>(value);

  return (
    <UserContext.Provider value={{ userGlobalData, setUserGlobalData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserGlobal = (): UserContextType => useContext(UserContext);


