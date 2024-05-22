import { Header } from '@/components/organisms/Header';
import { PairsFullDetails } from '@/components/organisms/PairsFullDetails';

export default function Home() {
  return (
    <div>
      <Header />
      <div className='wrapper my-12'>
        <PairsFullDetails />
      </div>
    </div>
  );
}
