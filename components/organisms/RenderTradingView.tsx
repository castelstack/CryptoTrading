import { LimitTrade } from '../molecules/LimitTrade';
import { MarketTrade } from '../molecules/MarketTrade';
import { StopTrade } from '../molecules/StopTrade';
import { TradeSize } from '../molecules/TradeSize';

export const renderComponent = (
  componentType: any,
  setTradingSize: any,
  tradingSize: any,
  quote: string,
  base: string
) => {
  switch (componentType) {
    case 'limit':
      return (
        <LimitTrade base={base} qoute={quote}>
          <TradeSize setSize={setTradingSize} tradingSize={tradingSize} />
        </LimitTrade>
      );
    case 'market':
      return (
        <MarketTrade base={base} qoute={quote}>
          <TradeSize setSize={setTradingSize} tradingSize={tradingSize} />
        </MarketTrade>
      );
    case 'stop':
      return (
        <StopTrade base={base} qoute={quote}>
          <TradeSize setSize={setTradingSize} tradingSize={tradingSize} />
        </StopTrade>
      );
    default:
      return <div>No trading type yet!!</div>;
  }
};
