import { ArrowDown, ArrowUp, Scale3D } from 'lucide-react';
import React from 'react';

export const PairsDailyTicker = ({
  dailyTicker,
}: {
  dailyTicker: {
    priceChange: string;
    lowPrice: string;
    highPrice: string;
    volume: string;
  };
}) => {
  const priceChange = parseFloat(dailyTicker.priceChange).toFixed(2);
  const lowPrice = parseFloat(dailyTicker.lowPrice).toFixed(2);
  const highPrice = parseFloat(dailyTicker.highPrice).toFixed(2);
  const volume = parseFloat(dailyTicker.volume).toFixed(2);

  const priceChangeColor =
    parseFloat(dailyTicker.priceChange) >= 0
      ? 'text-green-600'
      : 'text-red-600';

  return (
    <section className='flex divide-x overflow-x-auto'>
      <div className='flex flex-col gap-1 px-3 hover:bg-slate-50 animate py-1 min-w-[150px]'>
        <p className='text-xs text-slate-600 flex items-center gap-2'>
          <ArrowUp size={15} className='border rounded-full border-slate-600' />
          24h Change
        </p>
        <p className={`text-sm ${priceChangeColor}`}>{priceChange}</p>
      </div>
      <div className='flex flex-col gap-1 px-3 hover:bg-slate-50 animate py-1 min-w-[150px]'>
        <p className='text-xs text-slate-600 flex items-center gap-2'>
          <ArrowDown
            size={15}
            className='border rounded-full border-slate-600'
          />
          24h Low
        </p>
        <p className='text-sm text-red-600'>{lowPrice}</p>
      </div>
      <div className='flex flex-col gap-1 px-3 hover:bg-slate-50 animate py-1 min-w-[150px]'>
        <p className='text-xs text-slate-600 flex items-center gap-2'>
          <ArrowUp size={15} className='border rounded-full border-slate-600' />
          24h High
        </p>
        <p className='text-sm text-green-600'>{highPrice}</p>
      </div>
      <div className='flex flex-col gap-1 px-3 hover:bg-slate-50 animate py-1 min-w-[150px]'>
        <p className='text-xs text-slate-600 flex items-center gap-2'>
          <Scale3D size={15} className='border rounded-full border-slate-600' />
          24h Volume
        </p>
        <p className='text-sm text-green-600'>{volume}</p>
      </div>
    </section>
  );
};
