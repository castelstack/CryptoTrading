'use client';

import React, { useEffect, useState } from 'react';
import { SciChartReact } from "scichart-react";
import {
  SweepAnimation,
  SciChartJsNavyTheme,
  NumberRange,
  EAxisType,
  EChart2DModifierType,
  ESeriesType,
  EPointMarkerType,
} from "scichart";

// Fetch candlestick data from RESTful API and update with WebSocket stream
const fetchCandlestickData = async () => {
  const response = await fetch(
    'https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=100'
  );
  const initialData = await response.json();
  return initialData.map((item: any) => ({
    date: new Date(item[0]),
    open: parseFloat(item[1]),
    high: parseFloat(item[2]),
    low: parseFloat(item[3]),
    close: parseFloat(item[4]),
    volume: parseFloat(item[5]),
  }));
};

const NewChart: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      const initialData = await fetchCandlestickData();
      setData(initialData);
    };

    fetchInitialData();

    const ws = new WebSocket(
      'wss://stream.binance.com:9443/ws/btcusdt@kline_1m'
    );

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.k) {
        const candlestick = {
          date: new Date(message.k.t),
          open: parseFloat(message.k.o),
          high: parseFloat(message.k.h),
          low: parseFloat(message.k.l),
          close: parseFloat(message.k.c),
          volume: parseFloat(message.k.v),
        };

        setData((prevData) => {
          const newData = [...prevData];
          const lastCandle = newData[newData.length - 1];

          if (
            lastCandle &&
            lastCandle.date.getTime() === candlestick.date.getTime()
          ) {
            newData[newData.length - 1] = candlestick;
          } else {
            newData.push(candlestick);
          }

          return newData.slice(-100); // Limit to the last 100 data points
        });
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  console.log(data, 'opo');

  const chartConfig: any = {
    surface: {
      theme: new SciChartJsNavyTheme(),
      titleStyle: { fontSize: 22 },
    },
    xAxes: [
      {
        type: EAxisType.NumericAxis,
        options: {
          axisTitle: 'Time',
          growBy: new NumberRange(0.1, 0.1),
        },
      },
    ],
    yAxes: [
      {
        type: EAxisType.NumericAxis,
        options: {
          axisTitle: 'Price',
          growBy: new NumberRange(0.1, 0.1),
        },
      },
    ],
    series: [
      {
        type: ESeriesType.CandlestickSeries,
        xyData: {
          xValues: data.map((d) => d.date.getTime()),
          openValues: data.map((d) => d.open),
          highValues: data.map((d) => d.high),
          lowValues: data.map((d) => d.low),
          closeValues: data.map((d) => d.close),
        },
        options: {
          strokeUp: '#4CAF50',
          strokeDown: '#F44336',
          fillUp: '#4CAF50',
          fillDown: '#F44336',
          animation: new SweepAnimation({ duration: 300, fadeEffect: true }),
        },
      },
    ],
    modifiers: [],
  };

  return (
    <div className=''>
      <SciChartReact config={chartConfig} style={{ maxWidth: 900 }} />
    </div>
  );
};

export default NewChart;
