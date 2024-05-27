import React from 'react';
import { Button } from '../ui/button';

interface BaseCurrencySelectProps {
  baseCoins: string[];
  setBaseCurrency: (coin: string) => void;
  baseCurrency: string;
  setBaseCoins: React.Dispatch<React.SetStateAction<string[]>>;
}

export const BaseCurrencySelect = ({
  baseCoins,
  setBaseCurrency,
  baseCurrency,
  setBaseCoins,
}: BaseCurrencySelectProps) => {

  const handleCoinClick = (coin: string) => {
    setBaseCurrency(coin);
    setTimeout(() => {
      setBaseCoins((prevCoins) => {
        const updatedCoins = prevCoins.filter((c) => c !== coin);
        updatedCoins.unshift(coin);
        return updatedCoins;
      });
    }, 1000);
  };

  return (
    <div className=' overflow-x-auto flex items-center gap-3'>
      {baseCoins.map((coin) => (
        <Button
          key={coin}
          type={'button'}
          variant={coin === baseCurrency ? 'default' : 'secondary'}
          className='h-4 py-3 px-4 rounded-none text-xs'
          onClick={() => handleCoinClick(coin)}
        >
          {coin}
        </Button>
      ))}
    </div>
  );
};
