'use client';

import { DispayOrdersAndTrades } from '@/components/organisms/DispayOrdersAndTrades';
import { Header } from '@/components/organisms/Header';
import { PairFullDetails } from '@/components/organisms/PairFullDetails';
import { TradingView } from '@/components/organisms/TradingView';
// import ChartView from '../components/organisms/charts/ChartView';
import { AppBar } from '@/components/organisms/AppBar';
import dynamic from 'next/dynamic';
const ChartView = dynamic(
  () => import('../components/organisms/charts/ChartView'),
  { ssr: false }
);
export default function Home() {
  return (
    <div className='relative'>
      <Header />
      <div className='wrapper my-12'>
        <PairFullDetails />
        <div className='grid lg:grid-cols-[1fr_max-content] gap-4 mt-4'>
          <div className='border dark:border-slate-800 p-2 w-full'>
            <ChartView />
          </div>
          <div className='grid xl:grid-cols-[257px_257px] lg:grid-cols-[220px_220px] md:grid-cols-2 gap-4'>
            <DispayOrdersAndTrades />
            <TradingView />
          </div>
        </div>
      </div>
      <AppBar />
    </div>
  );
}
