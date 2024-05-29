'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';
type CoinPair = {
  symbol: string;
  pair: string;
};

export const PairSelect = ({
  setValue,
  value,
  loading,
  tradingPair,
}: {
  baseCurrency: string;
  loading: boolean;
  value: string;
  tradingPair: CoinPair[];
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className='md:w-[270px] w-full py-2 px-0  border-none rounded-none  focus:ring-0'>
        <SelectValue
          placeholder='Select pair'
          aria-label={value}
          className=' items-center !text-3xl'
        >
          <p className='md:!text-3xl !text-2xl uppercase'>
            {' '}
            {loading ? 'Loading...' : value}
          </p>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {tradingPair.map((pair) => (
          <SelectItem key={pair.symbol} value={pair.pair}>
            {pair.pair}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
