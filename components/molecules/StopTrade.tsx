import { ReactNode } from 'react';
import { InputExtra } from './InputExtra';

export const StopTrade = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <div className='flex flex-col gap-4 my-2'>
      <InputExtra label='Stop' />
      <InputExtra label='Limit' />
      <InputExtra label='Amount' />
  
      {children}
      <InputExtra label='Total' end={'BTC'} />
    </div>
  );
};
