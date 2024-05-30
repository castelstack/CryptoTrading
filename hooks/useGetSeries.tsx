'use client';

import { useAppStore } from '@/store/store';
import { useTheme } from 'next-themes';
import { useEffect, useMemo, useState } from 'react';

const useGetSeries = () => {
  const { symbol } = useAppStore((state) => state.tradingPair);
  const { theme } = useTheme();
  const [series, setSeries] = useState([{ data: [] }]);
  const [volumeSeries, setVolumeSeries] = useState([{ data: [] }]);
  const [chartType, setChartType] = useState<'line' | 'candlestick' | 'area'>(
    'candlestick'
  );
  const [chartTimeInterval, setChartTimeInterval] = useState('1h');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const isDarkTheme = useMemo(
    () => (theme === 'light' ? false : true),
    [theme]
  );

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await fetch(
          `https://api.binance.com/api/v3/klines?symbol=${symbol.toUpperCase()}&interval=${chartTimeInterval}&limit=100`
        );
        const initialData = await response.json();
        const formattedData = initialData.map((item: any) => ({
          x: new Date(item[0]),
          y: [
            parseFloat(item[1]),
            parseFloat(item[2]),
            parseFloat(item[3]),
            parseFloat(item[4]),
          ],
        }));
        setSeries([{ data: formattedData }]);
        const formattedVolumeData = initialData.map((item: any) => ({
          x: new Date(item[0]),
          y: parseFloat(item[5]),
        }));
        setVolumeSeries([{ data: formattedVolumeData }]);
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

    fetchInitialData();

    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${chartTimeInterval}`
    );

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.k) {
        const candlestick = {
          x: new Date(message.k.t),
          y: [
            parseFloat(message.k.o),
            parseFloat(message.k.h),
            parseFloat(message.k.l),
            parseFloat(message.k.c),
          ],
        };

        const volume = {
          x: new Date(message.k.t),
          y: parseFloat(message.k.v),
        };

        setSeries((prevSeries) => {
          const newData: any = [...prevSeries[0].data];
          const lastCandle: any = newData[newData.length - 1];

          if (
            lastCandle &&
            lastCandle.x.getTime() === candlestick.x.getTime()
          ) {
            newData[newData.length - 1] = candlestick;
          } else {
            newData.push(candlestick);
          }

          return [{ data: newData }];
        });

        setVolumeSeries((prevSeries) => {
          const newData: any = [...prevSeries[0].data];
          const lastVolume = newData[newData.length - 1];

          if (lastVolume && lastVolume.x.getTime() === volume.x.getTime()) {
            newData[newData.length - 1] = volume;
          } else {
            newData.push(volume);
          }

          return [{ data: newData }];
        });
      }
    };

    return () => {
      ws.close();
    };
  }, [symbol, chartTimeInterval]);

  return {
    series,
    isDarkTheme,
    volumeSeries,
    setChartType,
    chartType,
    setChartTimeInterval,
    chartTimeInterval,
    loading,
    error,
  };
};

export default useGetSeries;
