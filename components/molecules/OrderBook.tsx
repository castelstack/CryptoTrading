'use client';

import { useGetOrderBooks } from '@/hooks/useGetOrderBooks';
import { OrderBookList } from './OrderBookList';
import { OrderBooksTabs } from './OrderBooksTabs';

export const OrderBook = () => {
  const { filter, setFilter, filteredOrders, currentPair, loading,error } = useGetOrderBooks();
  return (
    <>
      <OrderBooksTabs filter={filter} setFilter={setFilter} />
      <section className='overflow-x-auto'>
        <div className='min-w-full bg-white dark:bg-transparent '>
          <div className='flex items-center justify-between h-[28px]'>
            <p className='text-xs text-slate-700 dark:text-slate-400'>
              Price({currentPair.pair.split('/')[0]})
            </p>
            <p className='text-xs text-slate-700 dark:text-slate-400'>
              Quantity({currentPair.pair.split('/')[1]})
            </p>
          </div>
          <OrderBookList filteredOrders={filteredOrders()} loading={loading} error={error}/>
        </div>
      </section>
    </>
  );
};
