import { ReactNode } from 'react';
import { InputExtra } from './InputExtra';

export const StopTrade = ({
  children,
  base,
  qoute,
}: {
  children: ReactNode;
  base: string;
  qoute: string;
}) => {
  return (
    <div className='flex flex-col gap-4 my-2'>
      <InputExtra
        label='Stop'
        end={base}
        tip='Enter the stop price for your order. When the market reaches this price, your stop order will be triggered and converted into a market or limit order based on your selection.'
      />
      <InputExtra
        label='Limit'
        end={base}
        tip='Enter the limit price for your order. This is the maximum price you are willing to pay when buying, or the minimum price you are willing to accept when selling.'
      />
      <InputExtra
        label='Amount'
        end={qoute}
        tip={
          'Enter the quantity of the asset you want to trade. This is the total number of units you wish to buy or sell.'
        }
      />

      {children}
      <InputExtra
        label='Total'
        end={base}
        tip={
          'This field shows the total value of the trade, calculated as the price multiplied by the amount. Ensure you have sufficient funds to complete the transaction.'
        }
      />
    </div>
  );
};
