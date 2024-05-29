import React from 'react';
import { Button } from '../ui/button';
import { timeIntervals } from '@/constants/timeIntervals';

interface timerSelectProps {
  currTimeInterval: string;
  setTimer: React.Dispatch<React.SetStateAction<string>>;
}

export const TimeIntervalSelect = ({
  currTimeInterval,
  setTimer,
}: timerSelectProps) => {
  const handleTimeClick = (time: string) => {
    setTimer(time);
  };

  return (
    <div className='hideScrollbar overflow-x-auto flex items-center gap-3 md: w-[350px]'>
      {timeIntervals.map((time) => (
        <Button
          key={time}
          type={'button'}
          variant={currTimeInterval === time ? 'default' : 'outline'}
          className={`h-4 py-3 px-4 rounded-none text-xs font-normal animate ${
            currTimeInterval === time
              ? ''
              : 'text-slate-500 dark:text-slate-500'
          }`}
          onClick={() => handleTimeClick(time)}
        >
          {time}
        </Button>
      ))}
    </div>
  );
};
