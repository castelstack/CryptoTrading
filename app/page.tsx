import { DispayOrdersAndTrades } from '@/components/organisms/DispayOrdersAndTrades';
import { Header } from '@/components/organisms/Header';
import { PairFullDetails } from '@/components/organisms/PairFullDetails';
import ChartView from '../components/organisms/charts/ChartView';


export default function Home() {
  return (
    <div>
      <Header />
      <div className='wrapper my-12'>
        <PairFullDetails />
        <div className='grid md:grid-cols-[1fr_max-content] gap-4 mt-4'>
          <div className='border dark:border-slate-700 p-2 '>
            <ChartView/>
          </div>
          <div className='grid grid-cols-[257px_257px] gap-4'>
            <DispayOrdersAndTrades />
          </div>
          {/* <ChartNow/> */}
        </div>
      </div>
    </div>
  );
}
