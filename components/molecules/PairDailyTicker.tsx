'use client';
import { ArrowDown, ArrowUp, Scale3D } from 'lucide-react';
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
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${pair}@ticker`
    );

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
      ? 'text-green-600'
      : 'text-red-600';

  if (!dailyTicker) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='flex flex-col gap-1 px-3 hover:bg-slate-50 animate py-1 '>
        <p className='text-sm text-slate-800 flex items-center gap-2'>
          {dailyTicker.lastPrice}
        </p>
        <p className={`text-sm ${priceChangeColor}`}>${usdValue}</p>
      </div>
      <section className='flex divide-x overflow-x-auto max-md:col-span-full'>
        <div className='flex flex-col gap-1 px-3 hover:bg-slate-50 animate py-1 min-w-[120px] md:min-w-[150px]'>
          <p className='text-xs text-slate-600 flex items-center gap-2'>
            <ArrowUp
              size={15}
              className='border rounded-full border-slate-600'
            />
            24h Change
          </p>
          <p className={`text-sm ${priceChangeColor}`}>
            {dailyTicker.priceChange}
          </p>
        </div>
        <div className='flex flex-col gap-1 px-3 hover:bg-slate-50 animate py-1 min-w-[120px] md:min-w-[150px]'>
          <p className='text-xs text-slate-600 flex items-center gap-2'>
            <ArrowDown
              size={15}
              className='border rounded-full border-slate-600'
            />
            24h Low
          </p>
          <p className='text-sm text-red-600'>{dailyTicker.lowPrice}</p>
        </div>
        <div className='flex flex-col gap-1 px-3 hover:bg-slate-50 animate py-1 min-w-[120px] md:min-w-[150px]'>
          <p className='text-xs text-slate-600 flex items-center gap-2'>
            <ArrowUp
              size={15}
              className='border rounded-full border-slate-600'
            />
            24h High
          </p>
          <p className='text-sm text-green-600'>{dailyTicker.highPrice}</p>
        </div>
        <div className='flex flex-col gap-1 px-3 hover:bg-slate-50 animate py-1 min-w-[120px] md:min-w-[150px]'>
          <p className='text-xs text-slate-600 flex items-center gap-2'>
            <Scale3D
              size={15}
              className='border rounded-full border-slate-600'
            />
            24h Volume
          </p>
          <p className='text-sm text-green-600'>{dailyTicker.volume}</p>
        </div>
      </section>
    </>
  );
};
