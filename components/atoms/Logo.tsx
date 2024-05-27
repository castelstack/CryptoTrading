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
        objectFit='contain'
        src={theme === 'light' ? '/logo.svg' : '/logoWhite.svg'}
        alt='logo'
        className='h-[50px] w-[50px]'
      />
    </Link>
  );
};
