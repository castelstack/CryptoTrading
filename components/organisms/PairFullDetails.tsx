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
  } = useGetPairs();

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
