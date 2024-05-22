'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';
type CoinPairs = {
  symbol: string;
  pairs: string;
};

export const PairSelect = ({
  baseCurrency,
  setValue,
  value,
  loading,
  tradingPairs,
}: {
  baseCurrency: string;
  loading: boolean;
  value: string;
  tradingPairs: CoinPairs[];
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className='md:w-[270px] py-2  border-none  focus:ring-none active:ring-none  focus:outline-none active:outline-none'>
        <SelectValue
          placeholder='Select pair'
          aria-label={value}
          className=' items-center !text-3xl'
        >
          <p className='!text-3xl uppercase'>
            {' '}
            {loading ? 'Loading...' : value}
          </p>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {tradingPairs.map((pair) => (
          <SelectItem key={pair.symbol} value={pair.pairs}>
            {pair.pairs}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
