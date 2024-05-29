'use client';

import { useAppStore } from '@/store/store';
import { useState } from 'react';
import { LimitTrade } from '../molecules/LimitTrade';
import { MarketTrade } from '../molecules/MarketTrade';
import { StopTrade } from '../molecules/StopTrade';
import { TradeSize } from '../molecules/TradeSize';
import { Button } from '../ui/button';

type MarketType = 'limit' | 'market' | 'stop';

const renderComponent = (
  componentType: any,
  setTradingSize: any,
  tradingSize: any,
  formik: any,
  quote: string,
  base: string
) => {
  switch (componentType) {
    case 'limit':
      return (
        <LimitTrade base={base} qoute={quote}>
          <TradeSize setSize={setTradingSize} tradingSize={tradingSize} />
        </LimitTrade>
      );
    case 'market':
      return (
        <MarketTrade base={base} qoute={quote}>
          <TradeSize setSize={setTradingSize} tradingSize={tradingSize} />
        </MarketTrade>
      );
    case 'stop':
      return (
        <StopTrade base={base} qoute={quote}>
          <TradeSize setSize={setTradingSize} tradingSize={tradingSize} />
        </StopTrade>
      );
    default:
      return <div>No trading type yet!!</div>;
  }
};
export const TradingForm = ({ tabType }: { tabType?: boolean }) => {
  const [tab, setTab] = useState(tabType);
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
          '',
          pair.split('/')[1],
          pair.split('/')[0]
        )}
      </div>
      <div className='mt-auto max-md:mt-8 flex flex-col gap-2'>
        <div className='my-4 flex flex-col gap-2 '>
          <div className='flex items-center justify-between gap-2'>
            <p className='dark:text-slate-500'>Max pay</p>
            <p className='dark:text-slate-300'>12{pair.split('/')[0]}</p>
          </div>
          <div className='flex items-center justify-between gap-2'>
            <p className='dark:text-slate-500'>Est pay</p>
            <p className='dark:text-slate-300'>30{pair.split('/')[0]}</p>
          </div>
        </div>
        <Button
          type='button'
          onClick={() => setTab((prev) => !prev)}
          variant={tab ? 'default' : 'destructive'}
          className={`rounded-none w-full ${
            tab && 'bg-green-600 dark:bg-green-800 hover:bg-green-400'
          }`}
        >
          {tab ? 'Buy' : 'Sell'}
        </Button>
      </div>
    </>
  );
};
