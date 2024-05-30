'use client';

import { useState } from 'react';
import { Button } from '../ui/button';

export const TradingOrders = () => {
  const [tab, setTab] = useState(true);
  return (
    <section className=' w-full bg-slate-50 dark:bg-slate-900 dark:border-slate-800 border p-2'>
      <div className='dark:bg-slate-900 border dark:border-none p-1 flex items-center gap-2 w-max'>
        <Button
          type='button'
          onClick={() => setTab((prev) => !prev)}
          variant={tab ? 'default' : 'ghost'}
          className={`h-6 text-xs animate rounded-none ${tab && 'shadow'}`}
        >
          Open orders
        </Button>
        <Button
          type='button'
          onClick={() => setTab((prev) => !prev)}
          variant={!tab ? 'default' : 'ghost'}
          className={`h-6 text-xs animate rounded-none ${!tab && 'shadow'}`}
        >
          Orders history
        </Button>
      </div>

      <div
        className={`h-[400px] text-center px-2 w-full bg-slate-50 dark:bg-slate-900 grid place-content-center`}
      >
        <h4>No orders yet</h4>
        <p>
          You have not placed any trading orders yet. Once you create a buy or
          sell order, it will appear here.
        </p>
      </div>
    </section>
  );
};
