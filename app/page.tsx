import { DispayOrdersAndTrades } from '@/components/organisms/DispayOrdersAndTrades';
import { Header } from '@/components/organisms/Header';
import { PairFullDetails } from '@/components/organisms/PairFullDetails';
import { TradingView } from '@/components/organisms/TradingView';
import ChartView from '../components/organisms/charts/ChartView';

export default function Home() {
  return (
    <div>
      <Header />
      <div className='wrapper my-12'>
        <PairFullDetails />
        <div className='grid lg:grid-cols-[1fr_max-content] gap-4 mt-4'>
          <div className='border dark:border-slate-800 p-2 w-full'>
            <ChartView />
          </div>
          <div className='grid xl:grid-cols-[257px_257px] lg:grid-cols-[200px_200px] md:grid-cols-2 gap-4'>
            <DispayOrdersAndTrades />
            <TradingView/>
          </div>
        </div>
      </div>
    </div>
  );
}
