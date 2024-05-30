'use client';
import { useGetDailyTicker } from '@/hooks/useGetDailyTicker';
import { ArrowDown, ArrowUp, BarChart2, Mountain } from 'lucide-react';

export const PairDailyTicker = ({ pair }: { pair: string }) => {
  const { usdValue, dailyTicker, loading, error } = useGetDailyTicker({ pair });
  const priceChangeColor =
    dailyTicker && parseFloat(dailyTicker.priceChange) >= 0
      ? 'text-green-600 dark:text-green-600'
      : 'text-red-600 dark:text-red-600';

  if (loading) {
    return (
      <div className='hideScrollbar flex gap-2 overflow-x-auto max-md:col-span-full'>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className='h-[52px] w-[150px] bg-slate-200 dark:bg-slate-900 animate-pulse'
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className='h-[52px] w-full bg-red-600/10 text-red-500 grid place-content-center'>
        {error.message}
      </div>
    );
  }

  return (
    <>
      <div className='flex flex-col gap-1 px-3 py-1 '>
        <p className='text-sm text-slate-800 flex items-center gap-2'>
          {dailyTicker?.lastPrice}
        </p>
        <p className={`text-sm ${priceChangeColor}`}>${usdValue}</p>
      </div>
      <section className='hideScrollbar flex divide-x dark:divide-slate-700 overflow-x-auto max-md:col-span-full'>
        <div className='flex flex-col gap-1 px-3 py-1 min-w-[120px] md:min-w-[150px]'>
          <p className='text-xs text-slate-500 dark:text-slate-500 flex items-center gap-2 whitespace-nowrap'>
            <BarChart2
              size={20}
              className='border border-slate-400 dark:border-slate-600 p-[2px]'
            />
            24h Change
          </p>
          <p className={`text-sm ${priceChangeColor}`}>
            {dailyTicker?.priceChange}
          </p>
        </div>
        <div className='flex flex-col gap-1 px-3 py-1 min-w-[120px] md:min-w-[150px]'>
          <p className='text-xs text-slate-500 dark:text-slate-500 flex items-center gap-2 whitespace-nowrap'>
            <ArrowDown
              size={20}
              className='border border-slate-400 dark:border-slate-600 p-[2px]'
            />
            24h Low
          </p>
          <p className='text-sm text-red-600'>{dailyTicker?.lowPrice}</p>
        </div>
        <div className='flex flex-col gap-1 px-3 py-1 min-w-[120px] md:min-w-[150px]'>
          <p className='text-xs text-slate-500 dark:text-slate-500 flex items-center gap-2 whitespace-nowrap'>
            <ArrowUp
              size={20}
              className='border border-slate-400 dark:border-slate-600 p-[2px]'
            />
            24h High
          </p>
          <p className='text-sm text-green-600'>{dailyTicker?.highPrice}</p>
        </div>
        <div className='flex flex-col gap-1 px-3 py-1 min-w-[120px] md:min-w-[150px]'>
          <p className='text-xs text-slate-500 dark:text-slate-500 flex items-center gap-2 whitespace-nowrap'>
            <Mountain
              size={20}
              className='border border-slate-400 dark:border-slate-600 p-[2px]'
            />
            24h Volume
          </p>
          <p className='text-sm text-green-600'>{dailyTicker?.volume}</p>
        </div>
      </section>
    </>
  );
};
