import { ReactNode, useState } from 'react';
import { InputExtra } from './InputExtra';

export const LimitTrade = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex flex-col gap-4 my-2'>
      <InputExtra label='Price' />
      <InputExtra label='Amount' />
      {children}
      <InputExtra label='Total' end={'BTC'} />
    </div>
  );
};
