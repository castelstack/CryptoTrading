'use client';

import { useGetPairs } from '@/hooks/useGetPairs';
import { BaseCurrencySelect } from '../molecules/BaseCurrencySelect';
import { PairDailyTicker } from '../molecules/PairDailyTicker';
import { PairSelect } from '../molecules/PairSelect';

export const PairFullDetails = () => {
  const {
    baseCoins,
    setBaseCurrency,
    baseCurrency,
    setBaseCoins,
    setValue,
    value,
    loading,
    tradingPairData,
    tradingPair,
    error,
  } = useGetPairs();

  if (loading) {
    return (
      <div className='flex flex-col gap-3'>
        <div className=' flex gap-2 overflow-x-auto max-md:col-span-full'>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className='h-6 w-[70px] bg-slate-200 dark:bg-slate-900 animate-pulse'
            />
          ))}
        </div>
        <div className='h-[52px] w-full bg-slate-200 dark:bg-slate-900 animate-pulse' />
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
    <div className='flex flex-col gap-2'>
      <BaseCurrencySelect
        baseCoins={baseCoins}
        setBaseCurrency={setBaseCurrency}
        baseCurrency={baseCurrency}
        setBaseCoins={setBaseCoins}
      />
      <div className='flex gap-6 items-center max-md:grid grid-cols-[1fr_max-content] w-full'>
        <PairSelect
          baseCurrency={baseCurrency}
          setValue={setValue}
          value={value}
          loading={loading}
          tradingPair={tradingPairData}
        />
        {value && <PairDailyTicker pair={tradingPair.symbol} />}
      </div>
    </div>
  );
};
