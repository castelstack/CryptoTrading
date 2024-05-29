'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '../ui/button';
import { TradingForm } from './TradingForm';
import { useWindowWidth } from '@react-hook/window-size';

export const AppBar = () => {
  const onlyWidth = useWindowWidth();
  const isMobile = onlyWidth < 768;
  if (onlyWidth&&!isMobile) {
    return <div></div>;
  }
  return (
    <div className='md:hidden fixed bottom-0 left-0 w-full px-2 bg-white dark:bg-slate-900 flex items-center gap-2 py-2 z-10'>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            type='button'
            variant={'default'}
            className='rounded-none w-full bg-green-600 dark:bg-green-800 hover:bg-green-400'
          >
            {'Buy'}
          </Button>
        </SheetTrigger>
        <SheetContent side={'bottom'}>
          <SheetHeader>
            <SheetTitle>Buy</SheetTitle>
          </SheetHeader>
          <TradingForm tabType />
        </SheetContent>
      </Sheet>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            type='button'
            variant={'destructive'}
            className='rounded-none w-full'
          >
            {'Sell'}
          </Button>
        </SheetTrigger>
        <SheetContent side={'bottom'}>
          <SheetHeader>
            <SheetTitle>Sell</SheetTitle>
          </SheetHeader>
          <TradingForm />
        </SheetContent>
      </Sheet>
    </div>
  );
};
