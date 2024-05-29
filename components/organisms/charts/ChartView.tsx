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
  } = useGetSeries();
  return (
    <>
      <div className='flex gap-4 '>
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
