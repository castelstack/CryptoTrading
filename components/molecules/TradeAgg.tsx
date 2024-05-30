'use client'
import { useGetTradingAgg } from '@/hooks/useGetTradingAgg';

export const TradeAgg = () => {
  const { depthData, currentPair } = useGetTradingAgg();

  return (
    <section className='overflow-x-auto mt-2'>
      <div className='min-w-full bg-white dark:bg-transparent '>
        <div className='flex gap-3 items-center justify-between h-[28px]'>
          <p className='text-xs dark:text-slate-400'>
            Price({currentPair.pair.split('/')[0]})
          </p>
          <p className='text-xs dark:text-slate-400'>
            Quantity({currentPair.pair.split('/')[1]})
          </p>
          <p className='text-xs dark:text-slate-400'>Time</p>
        </div>
        <div className='flex flex-col overflow-y-auto max-h-[476px]'>
          {depthData.map((order: any, index) => (
            <div
              key={index}
              className='relative h-[28px] flex justify-between gap-3 justify-items-start items-center '
            >
              <p className='text-xs z-[1] text-slate-700 dark:text-slate-200 text-left'>
                {order.price.toFixed(2)}
              </p>
              <p className='text-xs z-[1] text-slate-700 dark:text-slate-200 text-left'>
                {order.quantity.toFixed(2)}
              </p>
              <p className='text-xs z-[1] text-slate-700 dark:text-slate-200 text-left'>
                {order.time}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
