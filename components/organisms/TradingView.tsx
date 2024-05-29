'use client';

import React, { useState } from 'react';
import { TradeAgg } from '../molecules/TradeAgg';
import { OrderBook } from '../molecules/OrderBook';
import { Button } from '../ui/button';
import { LimitTrade } from '../molecules/LimitTrade';
import { TradeSize } from '../molecules/TradeSize';
import { MarketTrade } from '../molecules/MarketTrade';
import { StopTrade } from '../molecules/StopTrade';

type MarketType = 'limit' | 'market' | 'stop';

const renderComponent = (
  componentType: any,
  setTradingSize: any,
  tradingSize: any,
  formik: any
) => {
  switch (componentType) {
    case 'limit':
      return (
        <LimitTrade>
          <TradeSize setSize={setTradingSize} tradingSize={tradingSize} />
        </LimitTrade>
      );
    case 'market':
      return (
        <MarketTrade>
          <TradeSize setSize={setTradingSize} tradingSize={tradingSize} />
        </MarketTrade>
      );
    case 'stop':
      return (
        <StopTrade>
          <TradeSize setSize={setTradingSize} tradingSize={tradingSize} />
        </StopTrade>
      );
    default:
      return <div>No trading type yet!!</div>;
  }
};
export const TradingView = () => {
  const [tab, setTab] = useState(true);
  const [type, setType] = useState<MarketType>('limit');
  const [tradingSize, setTradingSize] = useState('');

  const marketType: MarketType[] = ['limit', 'market', 'stop'];
  return (
    <section className=' w-full border dark:border-slate-800 p-2 flex flex-col'>
      <div className='dark:bg-slate-900 border dark:border-none p-1  grid grid-cols-2 gap-2'>
        <Button
          type='button'
          onClick={() => setTab(true)}
          variant={tab ? 'secondary' : 'ghost'}
          className='h-6 text-xs animate rounded-none'
        >
          Buy
        </Button>
        <Button
          type='button'
          onClick={() => setTab(false)}
          variant={!tab ? 'secondary' : 'ghost'}
          className='h-6 text-xs animate rounded-none'
        >
          Sell
        </Button>
      </div>
      <div className='flex items-center gap-3 my-4'>
        {marketType.map((marketType) => (
          <Button
            key={marketType}
            type={'button'}
            variant={marketType === type ? 'default' : 'ghost'}
            className='h-4 py-3 px-4 text-xs rounded-none'
            onClick={() => setType(marketType)}
          >
            {marketType}
          </Button>
        ))}
      </div>
      <div>{renderComponent(type, setTradingSize, tradingSize, '')}</div>
      <div className='my-4 flex flex-col gap-2 mt-auto'>
        <div className='flex items-center justify-between gap-2'>
          <p className='dark:text-slate-500 text-xs'>Max pay</p>
          <p className='dark:text-slate-300 text-xs'>12</p>
        </div>
        <div className='flex items-center justify-between gap-2'>
          <p className='dark:text-slate-500 text-xs'>Est pay</p>
          <p className='dark:text-slate-300 text-xs'>30</p>
        </div>
      </div>
      <Button
        type='button'
        onClick={() => setTab((prev) => !prev)}
        variant={tab ? 'default' : 'destructive'}
        className='rounded-none w-full'
      >
        Buy
      </Button>
    </section>
  );
};
