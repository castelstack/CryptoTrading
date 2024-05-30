'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Ticker {
  priceChange: string;
  lowPrice: string;
  highPrice: string;
  volume: string;
  lastPrice: string;
}

export const useGetDailyTicker = ({ pair }: { pair: string }) => {
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
  
  return (
    {dailyTicker,usdValue}
  )
}
