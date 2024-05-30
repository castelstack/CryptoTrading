'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function PairChart({
  isDarkTheme,
  series,
  type,
}: {
  series: any;
  isDarkTheme: boolean;
  type: 'line' | 'candlestick' | 'area';
}) {
  const candlestickOptions = useMemo(() => {
    const data = {
      chart: {
        type: type,
        height: 350,
        // background: isDarkTheme ? '#1f1f1f' : '#ffffff',
        toolbar: {
          show: false,
        },
      },

      grid: {
        show: true,
        borderColor: isDarkTheme ? '#020617' : '#f3f4f6',
        strokeDashArray: 0,
      },

      xaxis: {
        type: 'datetime',
        position: 'right',
        labels: {
          style: {
            colors: isDarkTheme ? '#475569' : '#94a3b8',
            fontWeight: 500,
          },
        },
        axisBorder: {
          show: true,
          color: isDarkTheme ? '#475569' : '#94a3b8',
          offsetX: 0,
          offsetY: 0,
        },
        axisTicks: {
          show: true,
          borderType: isDarkTheme ? '#475569' : '#94a3b8',
          color: isDarkTheme ? '#475569' : '#94a3b8',
        },
      },
      yaxis: {
        // floating: true,
        tooltip: {
          enabled: true,
        },
        labels: {
          style: {
            colors: isDarkTheme ? '#475569' : '#94a3b8',
            fontWeight: 500,
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
      dataLabels: {
        enabled: false,
      },
    };
    return data;
  }, [type, isDarkTheme]);

  const areaOptions = useMemo(() => {
    const data = {
      chart: {
        type: type,
        height: 350,
        // background: isDarkTheme ? '#1f1f1f' : '#ffffff',
        toolbar: {
          show: false,
        },
      },

      grid: {
        show: true,
        borderColor: isDarkTheme ? '#020617' : '#f3f4f6',
        strokeDashArray: 0,
      },

      xaxis: {
        type: 'datetime',
        position: 'right',
        labels: {
          style: {
            colors: isDarkTheme ? '#475569' : '#94a3b8',
            fontWeight: 500,
          },
        },
        axisBorder: {
          show: true,
          color: isDarkTheme ? '#475569' : '#94a3b8',
          offsetX: 0,
          offsetY: 0,
        },
        axisTicks: {
          show: true,
          borderType: isDarkTheme ? '#475569' : '#94a3b8',
          color: isDarkTheme ? '#475569' : '#94a3b8',
        },
      },
      yaxis: {
        // floating: true,
        tooltip: {
          enabled: true,
        },
        labels: {
          style: {
            colors: isDarkTheme ? '#475569' : '#94a3b8',
            fontWeight: 500,
          },
        },
      },
      stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'butt',
        colors: '#2563eb',
        width: 4,
      },
      plotOptions: {
        area: {
          fillTo: 'origin',
          colors: {
            upward: isDarkTheme ? '#00C076' : '#00A000',
            downward: isDarkTheme ? '#FF3333' : '#FF0000',
          },
        },
      },
      tooltip: {
        theme: isDarkTheme ? 'dark' : 'light',
      },
      dataLabels: {
        enabled: false,
      },
    };
    return data;
  }, [type, isDarkTheme]);

  const lineOptions = useMemo(() => {
    const data = {
      chart: {
        type: type,
        height: 350,
        // background: isDarkTheme ? '#1f1f1f' : '#ffffff',
        toolbar: {
          show: false,
        },
      },

      grid: {
        show: true,
        borderColor: isDarkTheme ? '#020617' : '#f3f4f6',
        strokeDashArray: 0,
      },

      xaxis: {
        type: 'datetime',
        position: 'right',
        labels: {
          style: {
            colors: isDarkTheme ? '#475569' : '#94a3b8',
            fontWeight: 500,
          },
        },
        axisBorder: {
          show: true,
          color: isDarkTheme ? '#475569' : '#94a3b8',
          offsetX: 0,
          offsetY: 0,
        },
        axisTicks: {
          show: true,
          borderType: isDarkTheme ? '#475569' : '#94a3b8',
          color: isDarkTheme ? '#475569' : '#94a3b8',
        },
      },
      yaxis: {
        // floating: true,
        tooltip: {
          enabled: true,
        },
        labels: {
          style: {
            colors: isDarkTheme ? '#475569' : '#94a3b8',
            fontWeight: 500,
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
      dataLabels: {
        enabled: false,
      },
    };
    return data;
  }, [type, isDarkTheme]);

  const options =
    type === 'candlestick'
      ? candlestickOptions
      : type === 'line'
      ? lineOptions
      : type === 'area'
      ? areaOptions
      : candlestickOptions;

  return (
    <>
      {series && (
        <Chart
          options={options as any}
          series={series}
          type={type}
          height={350}
          width={'100%'}
        />
      )}
    </>
  );
}
