'use client';

import { useAppStore } from '@/store/store';
import { useState } from 'react';
import { Button } from '../ui/button';
import { renderComponent } from './RenderTradingView';

type MarketType = 'limit' | 'market' | 'stop';

export const TradingForm = ({ tabType }: { tabType?: boolean }) => {
  const [type, setType] = useState<MarketType>('limit');
  const [tradingSize, setTradingSize] = useState('');
  const { pair } = useAppStore((state) => state.tradingPair);
  const marketType: MarketType[] = ['limit', 'market', 'stop'];
  return (
    <>
      <div className='flex items-center gap-2 my-4'>
        {marketType.map((marketType) => (
          <Button
            key={marketType}
            type={'button'}
            variant={marketType === type ? 'default' : 'ghost'}
            className='h-4 py-3 xl:px-4 md:px-2 px-3 text-xs rounded-none capitalize'
            onClick={() => setType(marketType)}
          >
            {marketType}
          </Button>
        ))}
      </div>
      <div>
        {renderComponent(
          type,
          setTradingSize,
          tradingSize,
          pair.split('/')[1],
          pair.split('/')[0]
        )}
      </div>
      <div className='mt-auto max-md:mt-8 flex flex-col gap-2'>
        <div className='my-4 flex flex-col gap-2 '>
          <div className='flex items-center justify-between gap-2'>
            <p className='dark:text-slate-500'>Max pay</p>
            <p className='dark:text-slate-300'>0 {pair.split('/')[0]}</p>
          </div>
          <div className='flex items-center justify-between gap-2'>
            <p className='dark:text-slate-500'>Est pay</p>
            <p className='dark:text-slate-300'>0 {pair.split('/')[0]}</p>
          </div>
        </div>
        <Button
          type='button'
          // onClick={() => setTab((prev) => !prev)}
          variant={tabType ? 'default' : 'destructive'}
          className={`rounded-none w-full !text-slate-50 ${
            tabType && 'bg-green-600 dark:bg-green-800 hover:bg-green-400'
          }`}
        >
          {tabType ? 'Buy' : 'Sell'}
        </Button>
      </div>
    </>
  );
};
