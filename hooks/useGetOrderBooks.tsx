
'use client';

import { useAppStore } from '@/store/store';
import axios from 'axios';
import { useEffect, useState } from 'react';

export interface Order {
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

export type OrderTab = "all" | "bids" | "asks"

export const useGetOrderBooks = () => {
    const currentPair = useAppStore((state) => state.tradingPair);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [depthData, setDepthData] = useState<DepthData>({
      lastUpdateId: 0,
      E: 0,
      T: 0,
      bids: [],
      asks: [],
    });
    const [filter, setFilter] = useState<OrderTab>('all');
    const limit = filter === 'all' ? 7 : 14;
  
    useEffect(() => {
      if (!currentPair) return;
  
      // Fetch initial order book
      const fetchOrderBook = async () => {
        setLoading(true);
        try {
          const response = await axios.post(
            'https://api.binance.com/eapi/v1/depth',
            {
              id: '51e2affb-0aba-4821-ba75-f2625006eb43',
              method: 'depth',
              params: {
                symbol: currentPair.symbol.toUpperCase(),
                limit: limit, // Limit to the top 10 orders
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
          setLoading(false);
        } catch (e) {
            setLoading(false);
            if (e instanceof Error) {
              setError(e);
            } else {
              setError(new Error('An unknown error occurred'));
            }
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
              [...newBids, ...prevData.bids].slice(0, limit)
            ),
            asks: calculatePercentages(
              [...newAsks, ...prevData.asks].slice(0, limit)
            ),
          }));
        }
      };
  
      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
  
      ws.onclose = (event) => {
        console.log('WebSocket connection closed:', event);
      };
  
      return () => {
        ws.close();
      };
    }, [currentPair, limit]);
  
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
    {filter, setFilter, filteredOrders, currentPair, loading, error}
  )
}
