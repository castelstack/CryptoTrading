'use client';

import { ChartTypeSelect } from '@/components/molecules/ChartTypeSelect';
import { TimeIntervalSelect } from '@/components/molecules/TimeIntervalSelect';
import useGetSeries from '@/hooks/useGetSeries';
import dynamic from 'next/dynamic';

const PairChart = dynamic(() => import('./PairChart'), { ssr: false });
const VolumeChart = dynamic(() => import('./VolumeChart'), { ssr: false });

export default function ChartView() {
  const {
    series,
    isDarkTheme,
    volumeSeries,
    setChartType,
    chartType,
    setChartTimeInterval,
    chartTimeInterval,
    error,
    loading,
  } = useGetSeries();

  if (loading) {
    return (
      <div>
        <div className='h-[282px] w-full bg-slate-200 dark:bg-slate-900 animate-pulse' />
        <div className='h-[202px] mt-4 w-full bg-slate-200 dark:bg-slate-900 animate-pulse' />
      </div>
    );
  }
  if (error) {
    return (
      <div className='h-[392px] w-full bg-red-600/10 text-red-500 grid place-content-center'>
        {error.message}
      </div>
    );
  }

  return (
    <>
      <div className='flex gap-4 max-md:justify-between max-md:grid grid-cols-2 '>
        <TimeIntervalSelect
          setTimer={setChartTimeInterval}
          currTimeInterval={chartTimeInterval}
        />
        <ChartTypeSelect setChartType={setChartType} chartType={chartType} />
      </div>
      <PairChart isDarkTheme={isDarkTheme} series={series} type={chartType} />
      <VolumeChart volumeSeries={volumeSeries} isDarkTheme={isDarkTheme} />
    </>
  );
}
