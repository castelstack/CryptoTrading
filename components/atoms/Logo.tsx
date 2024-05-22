import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const Logo = () => {
  return (
    <Link href={'/'}>
      <Image
        width={500}
        height={50}
        objectFit='contain'
        src={'/logo.svg'}
        alt='logo'
        className='h-[50px] w-[50px]'
      />
    </Link>
  );
};
