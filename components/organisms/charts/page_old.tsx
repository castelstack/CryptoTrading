'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'tailwindcss/tailwind.css';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function ChartNow() {
  const [series, setSeries] = useState([
    {
      data: [],
    },
  ]);

  const [momentumSeries, setMomentumSeries] = useState([
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

        // Calculate momentum
        setMomentumSeries((prevSeries) => {
          const closePrices = prevSeries[0].data.map((d) => d.y);
          const timestamps = prevSeries[0].data.map((d) => d.x);
          closePrices.push(candlestick.y[3]);
          timestamps.push(candlestick.x);

          const newMomentumData = closePrices.map((price, index) => {
            if (index === 0) return { x: timestamps[index], y: 0 }; // Initial momentum is 0
            const momentum = price - closePrices[index - 1];
            return { x: timestamps[index], y: momentum };
          });

          return [
            {
              data: newMomentumData.slice(-100), // Limit to last 100 points
            },
          ];
        });
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  const candlestickOptions = {
    chart: {
      type: 'candlestick',
      height: 350,
      toolbar: {
        show: false,
      },
    },

    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      axisTicks: {
        width: 10,
      },
    },
  };

  const momentumOptions = {
    chart: {
      type: 'area',
      height: 400,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },

    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      logBase: 10,
      logarithmic: true,
      tooltip: {
        enabled: true,
      },
      labels: {
        show: false,
      },
      axisTicks: {
        width: 10,
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <div className='flex justify-center items-center bg-gray-100'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl'>
        <Chart
          options={candlestickOptions}
          series={series}
          type='candlestick'
          height={350}
        />
        <Chart
          options={momentumOptions}
          series={momentumSeries}
          type='area'
          height={400}
        />
      </div>
    </div>
  );
}
