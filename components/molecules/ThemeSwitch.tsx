'use client';
import { useTheme } from 'next-themes';
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '../ui/button';

export const ThemeSwitch = () => {
  const { setTheme, theme } = useTheme();
  return (
    <>
      <Button
        type='button'
        variant={'secondary'}
        className='rounded-full w-10 h-10 p-2'
        onClick={() => {
          const newTheme = theme === 'light' ? 'dark' : 'light';
          setTheme(newTheme);
        }}
      >
        {theme === 'light' ? <Moon size={50} /> : <Sun size={50} />}
      </Button>
    </>
  );
};
