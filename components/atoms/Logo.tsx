'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export const Logo = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className='h-[50px] w-[50px]' /> // Placeholder to maintain layout during hydration
    );
  }

  return (
    <Link href={'/'}>
      {theme === 'light' ? (
        <Image
          width={500}
          height={50}
          src={'/logo.svg'}
          alt='logo'
          priority
          className='h-[40px] w-[40px] md:h-[50px] md:w-[50px] object-contain'
        />
      ) : (
        <Image
          width={500}
          height={50}
          src={'/logoWhite.svg'}
          alt='logo'
          priority
          className='h-[40px] w-[40px] md:h-[50px] md:w-[50px] object-contain'
        />
      )}
    </Link>
  );
};
