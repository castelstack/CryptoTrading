'use client';

import React, { useState } from 'react';
import { TradeAgg } from '../molecules/TradeAgg';
import { OrderBook } from '../molecules/OrderBook';
import { Button } from '../ui/button';

export const DispayOrdersAndTrades = () => {
  const [tab, setTab] = useState(true);
  return (
    <section className=' w-full border dark:border-slate-700 p-2'>
      <div className='dark:bg-slate-700 p-1  grid grid-cols-2 gap-2'>
        <Button
          type='button'
          onClick={() => setTab((prev) => !prev)}
          variant={tab ? 'secondary' : 'ghost'}
          className='h-6 text-xs animate rounded-none'
        >
          Orders
        </Button>
        <Button
          type='button'
          onClick={() => setTab((prev) => !prev)}
          variant={!tab ? 'secondary' : 'ghost'}
          className='h-6 text-xs animate rounded-none'
        >
          Trades
        </Button>
      </div>

      <div className={`${tab ? 'grid' : 'hidden'}`}>
        <OrderBook />
      </div>

      <div className={`${!tab ? 'grid' : 'hidden'}`}>
        <TradeAgg />
      </div>
    </section>
  );
};
