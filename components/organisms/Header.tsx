import React from 'react';
import { Logo } from '../atoms/Logo';
import { AccountDropdown } from '../molecules/AccountDropdown';
import { ThemeSwitch } from '../molecules/ThemeSwitch';

export const Header = () => {
  return (
    <header className='py-3 px-4 flex justify-between gap-6 wrapper border-b'>
      <Logo />

      <div className='flex items-center gap-3'>
        <ThemeSwitch />
        <AccountDropdown />
      </div>
    </header>
  );
};
