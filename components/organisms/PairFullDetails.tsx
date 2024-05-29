'use client';

import { useAppStore } from '@/store/store';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BaseCurrencySelect } from '../molecules/BaseCurrencySelect';
import { PairDailyTicker } from '../molecules/PairDailyTicker';
import { PairSelect } from '../molecules/PairSelect';

type Coin = {
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
};
type CoinPair = {
  symbol: string;
  pair: string;
};
export const PairFullDetails = () => {
  const { setCurrentPair, tradingPair } = useAppStore((state) => state);
  const [baseCurrency, setBaseCurrency] = useState('USDT');
  const [baseCoins, setBaseCoins] = useState([
    'USDT',
    'BTC',
    'ETH',
    'BNB',
    'ADA',
    'XRP',
    'DOGE',
    'SOL',
    'DOT',
    'LTC',
  ]);
  // const [tradingPair, ] = useState<CoinPair[]>([]);
  const [tradingPairData, setTradingPairData] = useState<CoinPair[]>([]);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [dailyTicker, setDailyTicker] = useState(null);

  useEffect(() => {
    const fetchTradingPairs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'https://api.binance.com/api/v3/exchangeInfo'
        );
        const data = response.data;

        // Filter and map trading pairs based on baseCurrency
        const filteredPairs = data.symbols
          .filter(
            (symbol: Coin) =>
              symbol.baseAsset === baseCurrency ||
              symbol.quoteAsset === baseCurrency
          )
          .map((symbol: Coin) => ({
            symbol: symbol.symbol,
            pair: `${symbol.baseAsset}/${symbol.quoteAsset}`,
          }));

        // Set trading pairs (limit to first 10 for display)
        const pairsToShow = filteredPairs.slice(0, 10);
        setTradingPairData(pairsToShow);

        // Set initial selected value
        if (pairsToShow.length > 0) {
          setValue(pairsToShow[0].pair);
          setCurrentPair({
            symbol: pairsToShow[0].symbol,
            pair: pairsToShow[0].pair,
          });
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTradingPairs();
  }, [baseCurrency, setCurrentPair]);

  return (
    <div className='flex flex-col gap-2'>
      <BaseCurrencySelect
        baseCoins={baseCoins}
        setBaseCurrency={setBaseCurrency}
        baseCurrency={baseCurrency}
        setBaseCoins={setBaseCoins}
      />
      <div className='flex gap-6 items-center max-md:grid grid-cols-[1fr_max-content] w-full'>
        <PairSelect
          baseCurrency={baseCurrency}
          setValue={setValue}
          value={value}
          loading={loading}
          tradingPair={tradingPairData}
        />
        {value && <PairDailyTicker pair={tradingPair.symbol} />}
      </div>
    </div>
  );
};
