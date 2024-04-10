import React, { ReactNode, createContext, useState } from 'react';

interface SearchContextProps {
  children: ReactNode;
}

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined
);

export const SearchProvider = ({ children }: SearchContextProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};
