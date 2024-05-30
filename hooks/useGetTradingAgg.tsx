'use client';

import { useAppStore } from '@/store/store';
import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';

interface Order {
  price: number;
  quantity: number;
  time: string;
}
export const useGetTradingAgg = () => {
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
              limit: 16, // Limit to the top 16 orders
            },
          }
        );
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
  return { depthData, currentPair };
};
