'use client';

import { useAppStore } from '@/store/store';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import moment from 'moment';

interface Order {
  price: number;
  quantity: number;
  time: string;
}

export const TradeAgg = () => {
  const currentPair = useAppStore((state) => state.tradingPair);
  const [depthData, setDepthData] = useState<Order[]>([
    {
      price: 0,
      quantity: 0,
      time: '',
    },
  ]);

  useEffect(() => {
    if (!currentPair) return;
    const fetchOrderBook = async () => {
      try {
        const response = await axios.get(
          'https://api.binance.com/api/v1/trades',
          {
            params: {
              symbol: currentPair.symbol.toUpperCase(),
              limit: 12, // Limit to the top 10 orders
            },
          }
        );

        console.log(response.data, 'res');
        const newTrades = response.data.map(
          ({
            price,
            qty,
            time,
          }: {
            price: string;
            qty: string;
            time: string;
          }) => ({
            price: parseFloat(price),
            quantity: parseFloat(qty),
            time: moment(time).format('HH:mm:ss'),
          })
        );

        setDepthData(newTrades);
      } catch (error) {
        console.error('Error fetching initial order book:', error);
      }
    };

    fetchOrderBook();
  }, [currentPair]);

  return (
    <section className='overflow-x-auto mt-2'>
      <div className='min-w-full bg-white dark:bg-transparent '>
        <div className='grid grid-cols-3  gap-2 justify-items-start items-center justify-between h-[28px]'>
          <p className='text-xs dark:text-slate-400'>
            Price({currentPair.pair.split('/')[0]})
          </p>
          <p className='text-xs dark:text-slate-400'>
            Quantity({currentPair.pair.split('/')[1]})
          </p>
          <p className='text-xs dark:text-slate-400'>Time</p>
        </div>
        <div className='flex flex-col '>
          {depthData.map((order: any, index) => (
            <div
              key={index}
              className='relative h-[28px] grid-cols-3 justify-between gap-2 justify-items-start items-center '
            >
              <p className='text-xs z-[1] text-slate-700 dark:text-slate-200'>
                {order.price.toFixed(2)}
              </p>
              <p className='text-xs z-[1] text-slate-700 dark:text-slate-200'>
                {order.quantity.toFixed(2)}
              </p>
              <p className='text-xs z-[1] text-slate-700 dark:text-slate-200'>
                {order.time}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
