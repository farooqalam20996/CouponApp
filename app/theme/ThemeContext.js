import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(false);

  const theme = {
    background: dark ? '#000' : '#fff',
    text: dark ? '#fff' : '#000',
    button: dark? '#fff' : 'dodgerblue'
  };

  return (
    <ThemeContext.Provider value={{ dark, setDark, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
