import { useEffect, useState } from 'react';

export const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    // Update PrimeReact theme by modifying the existing link's href
    const themeLink = document.getElementById('theme-link');
    if (themeLink) {
      if (isDark) {
        themeLink.href = 'https://unpkg.com/primereact/resources/themes/lara-dark-blue/theme.css';
      } else {
        themeLink.href = 'https://unpkg.com/primereact/resources/themes/lara-light-blue/theme.css';
      }
    }
  }, [isDark]);

  return { isDark, setIsDark };
};
