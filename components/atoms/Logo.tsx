'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const Logo = () => {
  const { theme } = useTheme();
  return (
    <Link href={'/'}>
      <Image
        width={500}
        height={50}
        src={theme === 'light' ? '/logo.svg' : '/logoWhite.svg'}
        alt='logo'
        priority
        className='h-[50px] w-[50px] object-contain'
      />
    </Link>
  );
};
