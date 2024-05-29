'use client';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function VolumeChart({
  isDarkTheme,
  volumeSeries,
}: {
  volumeSeries: any;
  isDarkTheme: boolean;
}) {
  const volumeOptions = {
    chart: {
      type: 'bar',
      height: 100,
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
        show: true,
        style: {
          colors: isDarkTheme ? '#020617' : '#ffffff',
        },
      },
      axisBorder: {
        show: false,
        color: isDarkTheme ? '#475569' : '#78909C',
        offsetX: 0,
        offsetY: 0,
      },
      axisTicks: {
        show: false,
        borderType: isDarkTheme ? '#475569' : '#78909C',
        color: isDarkTheme ? '#475569' : '#78909C',
      },
    },
    yaxis: {
      position: 'left',
      // logarithmic: true,
      tooltip: {
        enabled: true,
      },
      labels: {
        show: true,
        offsetX: 0,
        style: {
          colors: isDarkTheme ? '#020617' : '#ffffff',
        },
      },
      axisBorder: {
        show: false,
        colors: isDarkTheme ? '#020617' : '#ffffff',
        offsetX: 0,
        offsetY: 0,
      },
      axisTicks: {
        show: false,
      },
    },
    grid: {
      show: false,
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
        columnWidth: '90%',
      },
    },
    fill: {
      type: 'solid',
    },
    tooltip: {
      show: false,
      theme: isDarkTheme ? 'dark' : 'light',
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <>
      <Chart
        options={volumeOptions as any}
        series={volumeSeries}
        type='bar'
        height={100}
        width={'100%'}
      />
    </>
  );
}
