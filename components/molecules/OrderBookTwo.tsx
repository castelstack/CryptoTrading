'use client';

import { useAppStore } from '@/store/store';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { TradeAgg } from './TradeAgg';

interface Order {
  price: number;
  quantity: number;
  side: 'BUY' | 'SELL';
}

interface DepthData {
  lastUpdateId: number;
  E: number; // Message output time
  T: number; // Transaction time
  bids: Order[];
  asks: Order[];
}

export const LiquidationOrderTwo = () => {
  const currentPair = useAppStore((state) => state.tradingPair);
  const [depthData, setDepthData] = useState<DepthData>({
    lastUpdateId: 0,
    E: 0,
    T: 0,
    bids: [],
    asks: [],
  });
  const [filter, setFilter] = useState<'all' | 'bids' | 'asks'>('all');

  useEffect(() => {
    if (!currentPair) return;

    // Fetch initial order book
    const fetchOrderBook = async () => {
      try {
        const response = await axios.post(
          'https://api.binance.com/eapi/v1/depth',
          {
            id: '51e2affb-0aba-4821-ba75-f2625006eb43',
            method: 'depth',
            params: {
              symbol: currentPair.symbol.toUpperCase(),
              limit: 5, // Limit to the top 10 orders
            },
          }
        );

        const { bids, asks, lastUpdateId } = response.data.result;

        const formattedBids = bids.map(
          ([price, quantity]: [string, string]) => ({
            price: parseFloat(price),
            quantity: parseFloat(quantity),
            side: 'BUY' as 'BUY',
          })
        );
        const formattedAsks = asks.map(
          ([price, quantity]: [string, string]) => ({
            price: parseFloat(price),
            quantity: parseFloat(quantity),
            side: 'SELL' as 'SELL',
          })
        );

        setDepthData({
          lastUpdateId,
          E: Date.now(), // Set the initial message output time
          T: Date.now(), // Set the initial transaction time
          bids: calculatePercentages(formattedBids),
          asks: calculatePercentages(formattedAsks),
        });
      } catch (error) {
        console.error('Error fetching initial order book:', error);
      }
    };

    fetchOrderBook();

    // Connect to WebSocket for continuous updates
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${currentPair.symbol.toLowerCase()}@depth`
    );

   

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
     

      if (message.e === 'depthUpdate') {
        const newBids = message.b.map(
          ([price, quantity]: [string, string]) => ({
            price: parseFloat(price),
            quantity: parseFloat(quantity),
            side: 'BUY' as 'BUY',
          })
        );
        const newAsks = message.a.map(
          ([price, quantity]: [string, string]) => ({
            price: parseFloat(price),
            quantity: parseFloat(quantity),
            side: 'SELL' as 'SELL',
          })
        );

        setDepthData((prevData) => ({
          lastUpdateId: message.u,
          E: message.E,
          T: message.T,
          bids: calculatePercentages(
            [...newBids, ...prevData.bids].slice(0, 5)
          ),
          asks: calculatePercentages(
            [...newAsks, ...prevData.asks].slice(0, 5)
          ),
        }));
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, [currentPair]);

  const calculatePercentages = (orders: Order[]) => {
    const totalQuantity = orders.reduce(
      (total, order) => total + order.quantity,
      0
    );
    return orders.map((order) => ({
      ...order,
      percentage: (order.quantity / totalQuantity) * 100,
    }));
  };

  const filteredOrders = () => {
    if (filter === 'all') {
      return [...depthData.bids, ...depthData.asks];
    }
    if (filter === 'bids') {
      return depthData.bids;
    }
    if (filter === 'asks') {
      return depthData.asks;
    }
    return [];
  };

  return (
    <div className=' w-full border p-2'>
      <p className='font-bold text-xs pb-2'>Order book</p>
      <div className='flex items-center mb-4'>
        <button
          className={`h-8 w-8 grid place-content-center rounded-md ${
            filter === 'all' ? 'bg-slate-100 ' : ''
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
          className={`h-8 w-8 grid place-content-center rounded-md ${
            filter === 'bids' ? 'bg-slate-100 ' : ''
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
          className={`h-8 w-8 grid place-content-center rounded-md ${
            filter === 'asks' ? 'bg-slate-100 ' : ''
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
        {/* <button
          className={`rounded ${
            filter === 'bids' ? 'bg-green-500 text-white' : 'bg-gray-100'
          }`}
          onClick={() => setFilter('bids')}
        >
          Bids
        </button>
        <button
          className={`rounded ${
            filter === 'asks' ? 'bg-red-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setFilter('asks')}
        >
          Asks
        </button> */}
      </div>

      <section className='overflow-x-auto'>
        <div className='min-w-full bg-white '>
          <div className='flex items-center justify-between h-[28px]'>
            <p className='text-xs'>Price({currentPair.pair.split('/')[0]})</p>
            <p className='text-xs'>
              Quantity({currentPair.pair.split('/')[1]})
            </p>
          </div>
          <div className='flex flex-col '>
            {filteredOrders().map((order: any, index) => (
              
              <div
                key={index}
                className='relative h-[28px] flex justify-between items-center'
              >
                <p className='text-xs z-[1] text-slate-700'>
                  {order.price.toFixed(2)}
                </p>
                <p className='text-xs z-[1] text-slate-700'>
                  {order.quantity.toFixed(2)}
                </p>
                <div
                  style={{ width: `${order.percentage}%` }}
                  className={`absolute top-0 w-full z-[0] h-[28px] right-0 ${
                    order.side === 'BUY' ? 'bg-green-50 ' : 'bg-red-50 '
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <TradeAgg/>
    </div>
  );
};
