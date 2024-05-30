import { OrderTab } from '@/hooks/useGetOrderBooks';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

interface OrderTabs {
  filter: string;
  setFilter: Dispatch<SetStateAction<OrderTab>>;
}
export const OrderBooksTabs = ({ filter, setFilter }: OrderTabs) => {
  return (
    <div className='flex items-center mb-4 mt-2'>
      <button
        className={`h-8 w-8 grid place-content-center ${
          filter === 'all' ? 'bg-slate-100 dark:bg-slate-800 shadow-md' : ''
        } `}
        onClick={() => setFilter('all')}
      >
        <Image
          src='/all.svg'
          alt='all filter'
          width={12}
          height={12}
          className={`h-3 w-3`}
        />
      </button>
      <button
        className={`h-8 w-8 grid place-content-center ${
          filter === 'bids' ? 'bg-slate-100 dark:bg-slate-800 shadow-md' : ''
        } `}
        onClick={() => setFilter('bids')}
      >
        <Image
          src='/bid.svg'
          alt='bids filter'
          width={12}
          height={12}
          className={`h-3 w-3`}
        />
      </button>
      <button
        className={`h-8 w-8 grid place-content-center ${
          filter === 'asks' ? 'bg-slate-100 dark:bg-slate-800 shadow-md' : ''
        } `}
        onClick={() => setFilter('asks')}
      >
        <Image
          src='/sell.svg'
          alt='asks filter'
          width={12}
          height={12}
          className={`h-3 w-3`}
        />
      </button>
    </div>
  );
};
