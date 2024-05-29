import React from 'react';
import { Button } from '../ui/button';

interface SizerSelectProps {
  tradingSize: string;
  setSize: React.Dispatch<React.SetStateAction<string>>;
}

export const TradeSize = ({ tradingSize, setSize }: SizerSelectProps) => {
  const handleSizeClick = (size: string) => {
    setSize(size);
  };

  return (
    <div className='flex items-center gap-2'>
      {['10', '25', '50', '100'].map((size) => (
        <Button
          key={size}
          type={'button'}
          variant={tradingSize === size ? 'default' : 'outline'}
          className={`h-4 py-3 px-2 w-full rounded-none text-xs font-normal animate ${
            tradingSize === size
              ? ''
              : 'text-slate-500 dark:text-slate-500'
          }`}
          onClick={() => handleSizeClick(size)}
        >
          {size}%
        </Button>
      ))}
    </div>
  );
};
