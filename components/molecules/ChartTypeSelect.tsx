'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AreaChart, CandlestickChart, LineChart } from 'lucide-react';
import React from 'react';

export const ChartTypeSelect = ({
  setChartType,
  chartType,
}: {
  chartType: string;
  setChartType: any;
}) => {
  return (
    <Select value={chartType} onValueChange={setChartType}>
      <SelectTrigger className='text-xs max-w-[150px] h-4 py-3 px-2  border rounded-none  focus:ring-0'>
        <SelectValue
          placeholder='Select pair'
          aria-label={chartType}
          className=' items-center !text-xs'
        >
          <div className='text-xs capitalize flex gap-2 items-center text-slate-500 dark:text-slate-500 px-2'>
            {chartType === 'candlestick' ? (
              <CandlestickChart size={15} />
            ) : chartType === 'line' ? (
              <LineChart size={15} />
            ) : chartType === 'area' ? (
              <AreaChart size={15} />
            ) : null}{' '}
            {chartType}
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={'candlestick'}>Candlestick</SelectItem>
        <SelectItem value={'area'}>Area</SelectItem>
        <SelectItem value={'line'}>Line</SelectItem>
      </SelectContent>
    </Select>
  );
};
