'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'tailwindcss/tailwind.css';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function Home() {
  const [series, setSeries] = useState([
    {
      data: [],
    },
  ]);

  useEffect(() => {
    const ws = new WebSocket(
      'wss://stream.binance.com:9443/ws/btcusdt@kline_1m'
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

        setSeries((prevSeries) => {
          const newData = [...prevSeries[0].data];
          const lastCandle = newData[newData.length - 1];

          if (
            lastCandle &&
            lastCandle.x.getTime() === candlestick.x.getTime()
          ) {
            newData[newData.length - 1] = candlestick;
          } else {
            newData.push(candlestick);
          }

          return [
            {
              data: newData,
            },
          ];
        });
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  const options = {
    chart: {
      type: 'candlestick',
      height: 350,
    },
    title: {
      text: 'BTC/USDT Candlestick Chart',
      align: 'left',
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl'>
        <Chart
          options={options}
          series={series}
          type='candlestick'
          height={350}
        />
      </div>
    </div>
  );
}
