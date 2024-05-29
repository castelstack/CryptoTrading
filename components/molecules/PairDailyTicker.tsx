'use client';
import axios from 'axios';
import { ArrowDown, ArrowUp, Mountain, BarChart2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface Ticker {
  priceChange: string;
  lowPrice: string;
  highPrice: string;
  volume: string;
  lastPrice: string;
}

export const PairDailyTicker = ({ pair }: { pair: string }) => {
  const [dailyTicker, setDailyTicker] = useState<Ticker | null>(null);
  const [usdValue, setUsdValue] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://api.binance.com/api/v3/ticker/24hr?symbol=${pair}`
      );
      const data = await res.data;
      setDailyTicker({
        priceChange: parseFloat(data.priceChange).toFixed(2),
        lowPrice: parseFloat(data.lowPrice).toFixed(2),
        highPrice: parseFloat(data.highPrice).toFixed(2),
        volume: parseFloat(data.volume).toFixed(2),
        lastPrice: parseFloat(data.lastPrice).toFixed(2),
      });
    };
    if (pair) {
      fetchData();
    }

    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${pair}@ticker`);

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message) {
        setDailyTicker({
          priceChange: parseFloat(message.p).toFixed(2),
          lowPrice: parseFloat(message.l).toFixed(2),
          highPrice: parseFloat(message.h).toFixed(2),
          volume: parseFloat(message.v).toFixed(2),
          lastPrice: parseFloat(message.c).toFixed(2),
        });
      }
    };

    return () => {
      ws.close();
    };
  }, [pair]);

  useEffect(() => {
    if (dailyTicker && pair) {
      // Fetch the USD value of the pair if it's not already in USD
      fetch(
        `https://api.binance.com/api/v3/ticker/price?symbol=${pair.toUpperCase()}`
      )
        .then((response) => response.json())
        .then((data) => {
          setUsdValue(parseFloat(data.price).toFixed(2));
        });
    } else {
      setUsdValue(dailyTicker ? dailyTicker.lastPrice : null); // For TUSDUSDT, lastPrice is the USD value
    }
  }, [dailyTicker, pair]);

  const priceChangeColor =
    dailyTicker && parseFloat(dailyTicker.priceChange) >= 0
      ? 'text-green-600 dark:text-green-600'
      : 'text-red-600 dark:text-red-600';

  if (!dailyTicker) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='flex flex-col gap-1 px-3 py-1 '>
        <p className='text-sm text-slate-800 flex items-center gap-2'>
          {dailyTicker.lastPrice}
        </p>
        <p className={`text-sm ${priceChangeColor}`}>${usdValue}</p>
      </div>
      <section className='hideScrollbar flex divide-x dark:divide-slate-700 overflow-x-auto max-md:col-span-full'>
        <div className='flex flex-col gap-1 px-3 py-1 min-w-[120px] md:min-w-[150px]'>
          <p className='text-xs text-slate-500 dark:text-slate-500 flex items-center gap-2 whitespace-nowrap'>
            <BarChart2
              size={20}
              className='border border-slate-400 dark:border-slate-600 p-[2px]'
            />
            24h Change
          </p>
          <p className={`text-sm ${priceChangeColor}`}>
            {dailyTicker.priceChange}
          </p>
        </div>
        <div className='flex flex-col gap-1 px-3 py-1 min-w-[120px] md:min-w-[150px]'>
          <p className='text-xs text-slate-500 dark:text-slate-500 flex items-center gap-2 whitespace-nowrap'>
            <ArrowDown
              size={20}
              className='border border-slate-400 dark:border-slate-600 p-[2px]'
            />
            24h Low
          </p>
          <p className='text-sm text-red-600'>{dailyTicker.lowPrice}</p>
        </div>
        <div className='flex flex-col gap-1 px-3 py-1 min-w-[120px] md:min-w-[150px]'>
          <p className='text-xs text-slate-500 dark:text-slate-500 flex items-center gap-2 whitespace-nowrap'>
            <ArrowUp
              size={20}
              className='border border-slate-400 dark:border-slate-600 p-[2px]'
            />
            24h High
          </p>
          <p className='text-sm text-green-600'>{dailyTicker.highPrice}</p>
        </div>
        <div className='flex flex-col gap-1 px-3 py-1 min-w-[120px] md:min-w-[150px]'>
          <p className='text-xs text-slate-500 dark:text-slate-500 flex items-center gap-2 whitespace-nowrap'>
            <Mountain
              size={20}
              className='border border-slate-400 dark:border-slate-600 p-[2px]'
            />
            24h Volume
          </p>
          <p className='text-sm text-green-600'>{dailyTicker.volume}</p>
        </div>
      </section>
    </>
  );
};
