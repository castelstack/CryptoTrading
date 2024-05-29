'use client';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '../ui/button';

export const ThemeSwitch = () => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className='h-[40px] w-[40px]' /> 
    );
  }
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
