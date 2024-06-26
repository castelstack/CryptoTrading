import React from 'react';
import { Logo } from '../atoms/Logo';
import { AccountDropdown } from '../molecules/AccountDropdown';
import { ThemeSwitch } from '../molecules/ThemeSwitch';

export const Header = () => {
  return (
    <header className='px-2'>
      <main className='shadow-sm border dark:border-slate-800 mt-4 py-2 px-2 flex justify-between gap-6 wrapper'>
        <Logo />

        <div className='flex items-center gap-3'>
          <ThemeSwitch />
          <AccountDropdown />
        </div>
      </main>
    </header>
  );
};
