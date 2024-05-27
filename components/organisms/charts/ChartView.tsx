'use client';

import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import 'tailwindcss/tailwind.css';
import { useTheme } from 'next-themes';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function ChartView() {
  const { setTheme, theme } = useTheme();
  const [series, setSeries] = useState([{ data: [] }]);
  const [volumeSeries, setVolumeSeries] = useState([{ data: [] }]);

  const isDarkTheme = useMemo(
    () => (theme === 'light' ? false : true),
    [theme]
  );

  useEffect(() => {
    const fetchInitialData = async () => {
      const response = await fetch(
        'https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=100'
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
    };

    fetchInitialData();

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

        const volume = {
          x: new Date(message.k.t),
          y: parseFloat(message.k.v),
          color:
            parseFloat(message.k.c) >= parseFloat(message.k.o)
              ? isDarkTheme
                ? '#00C076'
                : '#00A000'
              : isDarkTheme
              ? '#FF3333'
              : '#FF0000', // Binance green and red
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
  }, [isDarkTheme]);

  const candlestickOptions = {
    chart: {
      type: 'candlestick',
      height: 350,
      // background: isDarkTheme ? '#1f1f1f' : '#ffffff',
      toolbar: {
        show: false,
      },
    },

    xaxis: {
      type: 'datetime',
      position: 'right',
      labels: {
        style: {
          colors: isDarkTheme ? '#ffffff' : '#000000',
        },
      },
    },
    yaxis: {
      // floating: true,
      tooltip: {
        enabled: true,
      },
      labels: {
        style: {
          colors: isDarkTheme ? '#ffffff' : '#000000',
        },
      },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: isDarkTheme ? '#00C076' : '#00A000',
          downward: isDarkTheme ? '#FF3333' : '#FF0000',
        },
      },
    },
    tooltip: {
      theme: isDarkTheme ? 'dark' : 'light',
    },
  };

  const volumeOptions = {
    chart: {
      type: 'bar',
      height: 150,
      // background: isDarkTheme ? '#1f1f1f' : '#ffffff',
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },

    xaxis: {
      type: 'datetime',

      labels: {
        show: false,
        style: {
          colors: isDarkTheme ? '#ffffff' : '#000000',
        },
      },
    },
    yaxis: {
      position: 'right',
      tooltip: {
        enabled: true,
      },
      labels: {
        offsetX: 0,
        style: {
          colors: isDarkTheme ? '#ffffff' : '#000000',
        },
      },
    },
    plotOptions: {
      bar: {
        colors: {
          ranges: [
            {
              from: -Infinity,
              to: 0,
              color: isDarkTheme ? '#FF3333' : '#FF0000',
            },
            {
              from: 0,
              to: Infinity,
              color: isDarkTheme ? '#00C076' : '#00A000',
            },
          ],
        },
        columnWidth: '80%',
      },
    },
    fill: {
      type: 'solid',
    },
    tooltip: {
      theme: isDarkTheme ? 'dark' : 'light',
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <>
      <Chart
        options={candlestickOptions as any}
        series={series}
        type='candlestick'
        height={350}
      />
      <Chart
        options={volumeOptions as any}
        series={volumeSeries}
        type='bar'
        height={150}
      />
    </>
  );
}
