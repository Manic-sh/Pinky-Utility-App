import React, { createContext, useContext, useState } from "react";

// Define the type for the context
interface HeaderVisibilityContextType {
  showHeader: boolean;
  setShowHeader: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderVisibilityContext = createContext<
  HeaderVisibilityContextType | undefined
>(undefined);

export const HeaderVisibilityProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [showHeader, setShowHeader] = useState<boolean>(true); // Default to true, change as needed

  return (
    <HeaderVisibilityContext.Provider value={{ showHeader, setShowHeader }}>
      {children}
    </HeaderVisibilityContext.Provider>
  );
};

export function useHeaderVisibility(): HeaderVisibilityContextType {
  const context = useContext(HeaderVisibilityContext);
  if (context === undefined) {
    throw new Error(
      "useHeaderVisibility must be used within a HeaderVisibilityProvider"
    );
  }
  return context;
}
