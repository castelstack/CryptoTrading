import { ReactNode } from 'react';
import { InputExtra } from './InputExtra';

export const MarketTrade =  ({ children,base,qoute }: { children: ReactNode, base: string,qoute:string }) => {
  return (
    <div className='flex flex-col gap-4 my-2'>
      <InputExtra label='Market Price' end={base} tip='Enter the amount you wish to trade. Your order will be executed at the current market price, which may vary from the last traded price.' />
      <InputExtra label='Amount' end={qoute} tip={
          'Enter the quantity of the asset you want to trade. This is the total number of units you wish to buy or sell.'
        } />
      {children}
      <InputExtra label='Total' end={base} tip={
          'This field shows the total value of the trade, calculated as the price multiplied by the amount. Ensure you have sufficient funds to complete the transaction.'
        } />
    </div>
  );
};
