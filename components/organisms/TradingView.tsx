'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { TradingForm } from './TradingForm';


export const TradingView = () => {
  const [tab, setTab] = useState(true);
  return (
    <section className=' w-full border dark:border-slate-800 p-2 flex flex-col max-md:hidden'>
      <div className='dark:bg-slate-900 border dark:border-none p-1  grid grid-cols-2 gap-2'>
        <Button
          type='button'
          onClick={() => setTab(true)}
          variant={tab ? 'secondary' : 'ghost'}
          className={`h-6 text-xs animate rounded-none ${tab && 'shadow'}`}
        >
          Buy
        </Button>
        <Button
          type='button'
          onClick={() => setTab(false)}
          variant={!tab ? 'secondary' : 'ghost'}
          className={`h-6 text-xs animate rounded-none ${!tab && 'shadow'}`}
        >
          Sell
        </Button>
      </div>
      <TradingForm tabType={tab}/>
    </section>
  );
};
