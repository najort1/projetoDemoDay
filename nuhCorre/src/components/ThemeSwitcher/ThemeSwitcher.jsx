import { useEffect, useState } from 'react';
import boxicons from 'boxicons';

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ?  <box-icon name='moon' ></box-icon> : <box-icon name='sun' type='solid' color='#ffffff' ></box-icon>}
    </button>
  );
};

export default ThemeSwitcher;