import { LiquidationOrder } from '@/components/molecules/OrderBook';
import { Header } from '@/components/organisms/Header';
import { PairFullDetails } from '@/components/organisms/PairFullDetails';
import ChartNow from './page_old';
import { LiquidationOrderTwo } from '@/components/molecules/OrderBookTwo';

export default function Home() {
  return (
    <div>
      <Header />
      <div className='wrapper my-12'>
        <PairFullDetails />
        <div className='grid md:grid-cols-[1fr_max-content] gap-4'>
          <div>chart</div>
          <div className='grid grid-cols-[257px_257px] gap-4'>
            {/* <LiquidationOrder /> */}
            <LiquidationOrderTwo />
          </div>
          {/* <ChartNow/> */}
        </div>
      </div>
    </div>
  );
}
