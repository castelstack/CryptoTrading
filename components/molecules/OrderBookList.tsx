import { Order } from '@/hooks/useGetOrderBooks';
import React from 'react';
type OrderWithPercent = Order & {
  percentage: number;
};
export const OrderBookList = ({
  filteredOrders,
  loading,
  error,
}: {
  error: Error | null;
  loading: boolean;
  filteredOrders: OrderWithPercent[] | any;
}) => {

  if (filteredOrders.length<=0) {
    return (
      <div className='h-[392px] w-full bg-slate-200 dark:bg-slate-900 animate-pulse' />
    );
  }

//   if (error) {
//     return (
//       <div className='h-[392px] bg-red-600/10 w-full text-red-500 grid place-content-center '>
//         {error.message}
//       </div>
//     );
//   }

  return (
    <div className='flex flex-col gap-1 overflow-y-auto max-h-[392px]'>
      {filteredOrders.map((order: OrderWithPercent, index: number) => (
        <div
          key={index}
          className='relative h-[28px] flex justify-between items-center content-center'
        >
          <p className='text-xs z-[1] text-slate-700 dark:text-slate-200'>
            {order.price.toFixed(2)}
          </p>
          <p className='text-xs z-[1] text-slate-700 dark:text-slate-200'>
            {order.quantity.toFixed(2)}
          </p>
          <div
            style={{ width: `${order.percentage}%` }}
            className={`absolute top-0 bottom-0 w-full z-[0] h-[28px] right-0 ${
              order.side === 'BUY'
                ? 'bg-green-50 dark:bg-green-800 '
                : 'bg-red-50 dark:bg-red-800'
            }`}
          />
        </div>
      ))}
    </div>
  );
};
